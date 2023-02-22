import { useContext } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";

import { OrdersSheetList } from "../../components/orderssheets/OrdersSheetList";
import { GlobalContext, GlobalDispatch } from "../../contexts/GlobalState";
import { alertSettings } from "../../components/shared/ToastAlert";
import { getOrdersSheet } from "../../services/datastorage";
import { stack } from "../../utils/screenName";
import { getErrorMessage } from "../../utils/errorMesages";
import { styles } from "./OrdersSheetListScreen.styles";
import { containerStyles } from "../../styles/Containers.styles";

export function OrdersSheetListScreen({ navigation }) {
  const context = useContext(GlobalContext);
  const { setCurrentSheet } = useContext(GlobalDispatch);

  const setCurrentOrderSheet = async (id) => {
    try {
      const response = await getOrdersSheet(id);

      if (response === null)
        throw new Error("No se encontró la hoja de pedido seleccionada.");

      setCurrentSheet(response);

      navigation.replace(stack.ordersSheet.orderSheetNavigation.name);
    } catch (error) {
      Toast.show(
        `Ocurrió un error : ${getErrorMessage(error.message)}`,
        alertSettings
      );
    }
  };

  const onPressHandler = (item) => {
    setCurrentOrderSheet(item.id);
  };

  return (
    <View style={[styles.container, containerStyles.main]}>
      <OrdersSheetList list={context.ordersSheets} onPress={onPressHandler} />
    </View>
  );
}
