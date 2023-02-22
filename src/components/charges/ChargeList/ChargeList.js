import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar, Dialog, Text } from "@rneui/themed";

import { styles } from "./ChargeList.styles";
import { ChargeListItem, keyExtractor, emptyComponent } from "./ChargeListItem";
import { Confirm } from "../../../components/shared";

const ConfirmComponent = ({ item, actionHandler, closeModal }) => {
  let title = "Aplicar pago";
  let text = "Desea aplicar el pago ";
  let action = "apply";

  if (item.payApplied) {
    title = "Eliminar pago";
    text = "Desea eliminar el pago ";
    action = "delete";
  }

  return (
    <Confirm
      title={title}
      text={`${text} de $${item.chargeTotal} a ${item.name}`}
      isVisible={true}
      cancelHandler={closeModal}
      acceptHandler={() => {
        actionHandler(action);
      }}
    />
  );
};

export function ChargeList({ orders, chargeAction }) {
  const [searchText, setSearchText] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getSortList = (list) => {
    const fiteredList = list.filter((element) => element.chargeTotal > 0);

    return fiteredList.sort(
      (a, b) => Number(a.payApplied) - Number(b.payApplied)
    );
  };

  useEffect(() => {
    setSearchText("");
    setOrderList(getSortList(orders));
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

  const closeChargeModal = () => {
    setSelectedItem(null);
  };

  const chargeHandler = (item) => {
    setSelectedItem(item);
  };

  const chargeActionHandler = (action) => {
    chargeAction(
      action,
      selectedItem.id,
      action === "apply" ? selectedItem.chargeTotal : 0
    );
    setSelectedItem(null);
  };

  return (
    <>
      <FlatList
        keyExtractor={keyExtractor}
        data={orderList}
        renderItem={({ item }) => (
          <ChargeListItem item={item} onPress={chargeHandler} />
        )}
        ListEmptyComponent={emptyComponent}
        style={styles.listContainer}
      />
      <View style={styles.barContainer}>
        <SearchBar
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
          onChangeText={changeTextHandler}
          value={searchText}
          platform="android"
        />
      </View>
      {selectedItem && (
        <ConfirmComponent
          item={selectedItem}
          actionHandler={chargeActionHandler}
          closeModal={closeChargeModal}
        />
      )}
    </>
  );
}
