import { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text, Button } from "@rneui/themed";
import Toast from "react-native-root-toast";

import theme from "../../styles/theme.style";
import { getInitialData } from "../../services/datastorage";
import { GlobalDispatch } from "../../contexts/GlobalState";
import { styles } from "./NoOrdersSheetScreen.styles";
import { stack } from "../../utils/screenName";
import { alertSettings } from "../../components/shared/ToastAlert";

export function NoOrdersSheetScreen({ navigation }) {
  const { setState } = useContext(GlobalDispatch);
  const [loading, setLoading] = useState(true);

  const initializingGobalState = async () => {
    try {
      const initialDbData = await getInitialData();

      const initialState = {
        ordersSheets: initialDbData.orderSheets,
        settings: {
          prices: initialDbData.prices,
          types: initialDbData.types,
        },
      };

      if (initialDbData.currentOrdersSheet !== null) {
        initialState["currentOrdersSheet"] = initialDbData.currentOrdersSheet;
      }

      setState(initialState);

      if (initialDbData.currentOrdersSheet !== null) {
        navigation.replace(stack.ordersSheet.orderSheetNavigation.name);
      }

      setLoading(false);
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
    }
  };

  useEffect(() => {
    initializingGobalState();
  }, []);

  const newOrderSheet = () => {
    navigation.navigate(stack.ordersSheet.newOrdersSheet.name);
  };

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />
      ) : (
        <View style={styles.viewText}>
          <Text style={styles.text}>No se encontraron hojas de pedido</Text>
          <Button title="Crear nueva hoja" onPress={newOrderSheet} />
        </View>
      )}
    </View>
  );
}
