import { useContext, useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { GlobalContext } from "../../contexts/GlobalState";
import { containerStyles } from "../../styles/Containers.styles";
import { CounterBox } from "../../components/shared";
import { TotalList } from "../../components/totals";
import { getQuantityByType } from "../../services/datastorage";
import { slugify } from "../../utils/converters";

export function TotalsScreen() {
  const { currentOrdersSheet } = useContext(GlobalContext);
  const [types, setTypes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        const response = await getQuantityByType(currentOrdersSheet.id);
        if (isActive) {
          setTypes(
            response.map((item) => {
              return {
                key: slugify(item.type),
                quantity: item.quantity,
                name: item.type,
              };
            })
          );
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [currentOrdersSheet.pieceTotal])
  );

  return (
    <View style={[containerStyles.main, containerStyles.screenContainer]}>
      <CounterBox
        box1Title="Total Órdenes"
        box1Value={currentOrdersSheet.orderTotal}
        box2Title="Total Piezas"
        box2Value={currentOrdersSheet.pieceTotal}
        cardStyles={{ width: "50%" }}
      />
      <CounterBox
        box1Title="Total Cobrado"
        box1Value={`$${currentOrdersSheet.chargedTotal.toString()}`}
        box2Title="Total Monto"
        box2Value={`$${currentOrdersSheet.chargeTotal.toString()}`}
        containerStyles={{
          marginBottom: 10,
        }}
        cardStyles={{ width: "50%" }}
      />
      <TotalList dataset={types} />
    </View>
  );
}
