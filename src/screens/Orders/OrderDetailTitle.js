import { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { Icon, Text } from "@rneui/themed";

import { styles } from "./OrderDetail.styles";
import { GlobalContext } from "../../contexts/GlobalState";

export function OrderDetailTitle({ item, onPressNavigation }) {
  const { id: orderId, name: orderName } = item;
  const { currentOrdersSheet } = useContext(GlobalContext);
  const [pagination, setPagination] = useState([null, null]);

  useEffect(() => {
    const { orders } = currentOrdersSheet;

    const currentIndex = orders.findIndex((element) => element.id === orderId);

    if (currentIndex === 0 && orders.length > 1) {
      setPagination([null, orders[currentIndex + 1].id]);
    } else if (currentIndex > 0 && currentIndex === orders.length - 1) {
      setPagination([orders[currentIndex - 1].id, null]);
    } else if (currentIndex > 0) {
      setPagination([orders[currentIndex - 1].id, orders[currentIndex + 1].id]);
    }
  }, []);

  const navigateToOrder = (action) => {
    const [prevId, nextId] = pagination;
    const orderId = action === "back" ? prevId : nextId;
    onPressNavigation(orderId);
  };
  return (
    <View style={styles.containerTitle}>
      <Icon
        disabledStyle={styles.titleArrowDisabled}
        type="material-community"
        name="chevron-left"
        size={22}
        onPress={() => navigateToOrder("back")}
        color={pagination[0] === null ? "#FBFCFC" : "#909497"}
        disabled={pagination[0] === null}
      />
      <Text style={styles.title} numberOfLines={1}>
        {orderName}
      </Text>
      <Icon
        disabledStyle={styles.titleArrowDisabled}
        type="material-community"
        name="chevron-right"
        size={22}
        onPress={() => navigateToOrder("next")}
        color={pagination[1] === null ? "#FBFCFC" : "#909497"}
        disabled={pagination[1] === null}
      />
    </View>
  );
}
