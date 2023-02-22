import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import mainTheme from "../../../styles/theme.style";
import { styles } from "./OrderList.styles";
import { stack } from "../../../utils/screenName";
import { OrderListItem, keyExtractor, emptyComponent } from "./OrderListItem";

export function OrderList({ orders }) {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    setSearchText("");
    setOrderList(orders);
  }, [orders]);

  const changeTextHandler = (text) => {
    setSearchText(text);

    if (text === "") {
      setOrderList(orders);
      return;
    }

    setOrderList(
      orders.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const addOrderHandler = () => {
    navigation.navigate(stack.orders.ordersSelectClient.name);
  };

  const orderDetailHandler = (item) => {
    navigation.navigate(stack.orders.orderDetail.name, { orderId: item.id });
  };

  return (
    <>
      <FlatList
        keyExtractor={keyExtractor}
        data={orderList}
        renderItem={({ item }) => (
          <OrderListItem item={item} onPress={orderDetailHandler} />
        )}
        ListEmptyComponent={emptyComponent}
        style={styles.listContainer}
      />
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
          onPress={addOrderHandler}
        />
      </View>
    </>
  );
}
