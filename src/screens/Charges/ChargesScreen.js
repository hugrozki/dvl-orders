import { useContext } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";

import { GlobalContext, GlobalDispatch } from "../../contexts/GlobalState";
import { ChargeList } from "../../components/charges";
import { containerStyles } from "../../styles/Containers.styles";
import { styles } from "./ChargersScreen.styles";
import { updateOrderCharge } from "../../services/datastorage";
import { alertSettings } from "../../components/shared/ToastAlert";

export function ChargesScreen() {
  const { currentOrdersSheet } = useContext(GlobalContext);
  const { changeOrderCharge } = useContext(GlobalDispatch);

  const saveData = async (id, amount, applied) => {
    try {
      const response = await updateOrderCharge(
        id,
        amount,
        applied,
        currentOrdersSheet.id
      );

      if (response !== null) {
        changeOrderCharge(response.sheetChargedTotal, id, amount, applied);
      }
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
    }
  };

  const chargeHandler = (action, orderId, amount) => {
    const applied = action === "apply" ? 1 : 0;
    saveData(orderId, amount, applied);
  };

  return (
    <View style={[styles.container, containerStyles.main]}>
      <ChargeList
        orders={currentOrdersSheet.orders}
        chargeAction={chargeHandler}
      />
    </View>
  );
}
