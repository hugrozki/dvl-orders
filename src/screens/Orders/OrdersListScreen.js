import { useContext, useEffect } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";

import { GlobalContext } from "../../contexts/GlobalState";
import { OrderList } from "../../components/orderslist";
import { CounterBox } from "../../components/shared";
import { containerStyles } from "../../styles/Containers.styles";
import { styles } from "./OrdersListScreen.styles";

export function OrdersListScreen() {
  const { currentOrdersSheet } = useContext(GlobalContext);

  return (
    <View style={[styles.container, containerStyles.main]}>
      <CounterBox
        box1Title="Total Órdenes"
        box1Value={currentOrdersSheet.orderTotal.toString()}
        box2Title="Total Piezas"
        box2Value={currentOrdersSheet.pieceTotal.toString()}
        containerStyles={{
          marginBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
      <OrderList orders={currentOrdersSheet.orders} />
    </View>
  );
}
