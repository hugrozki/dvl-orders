import { useState, useContext, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { GlobalContext, GlobalDispatch } from "../../../contexts/GlobalState";
import mainTheme from "../../../styles/theme.style";
import { styles } from "./ClientList.style";
import { stack } from "../../../utils/screenName";
import { keyExtractor, RenderItem, emptyComponent } from "./ClientListItem";
import {
  getClients,
  addOrder as addOrderDB,
} from "../../../services/datastorage";
import { alertSettings } from "../../shared/ToastAlert";

export function ClientList() {
  const navigation = useNavigation();
  const { clients, currentOrdersSheet } = useContext(GlobalContext);
  const { setClients, addOrder } = useContext(GlobalDispatch);
  const [searchText, setSearchText] = useState("");
  const [clientList, setClientList] = useState([]);

  const fetchData = async () => {
    const response = await getClients();
    const initialData = response.map((item) => item.name);
    setClients(initialData);
  };

  useEffect(() => {
    if (clients.length == 0) {
      fetchData();
    } else {
      setClientList(clients);
    }
  }, []);

  useEffect(() => {
    setSearchText("");
    setClientList(clients);
  }, [clients]);

  const changeTextHandler = (text) => {
    setSearchText(text);

    if (text === "") {
      setClientList(clients);
      return;
    }

    setClientList(
      clients.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const addClientHandler = () => {
    navigation.navigate(stack.orders.ordersAddClient.name);
  };

  const saveData = async (clientName) => {
    try {
      const response = await addOrderDB(currentOrdersSheet.id, clientName);

      if (response !== null) {
        const { id, name, totals } = response;
        addOrder(id, name, totals);
        navigation.navigate(stack.orders.ordersList.name, {
          orderName: id,
        });
      }
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
    }
  };

  const addOrderHandler = (name) => {
    saveData(name);
  };

  return (
    <>
      <View style={styles.barContainer}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.searchBarInput}
            onChangeText={changeTextHandler}
            value={searchText}
            platform="android"
          />
        </View>

        <Icon
          type="material-community"
          name="plus"
          color={mainTheme.PRIMARY_COLOR}
          size={21}
          reverse
          onPress={addClientHandler}
        />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={clientList}
        renderItem={({ item }) => (
          <RenderItem item={item} onPress={addOrderHandler} />
        )}
        ListEmptyComponent={emptyComponent}
        style={styles.listContainer}
      />
    </>
  );
}
