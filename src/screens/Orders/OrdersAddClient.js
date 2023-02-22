import { useState, useContext } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { containerStyles } from "../../styles/Containers.styles";
import { GlobalDispatch } from "../../contexts/GlobalState";
import { alertSettings } from "../../components/shared/ToastAlert";
import { stack } from "../../utils/screenName";
import { addClient as addClientDB } from "../../services/datastorage";

export function OrdersAddClient() {
  const navigation = useNavigation();
  const { addClient } = useContext(GlobalDispatch);
  const [name, setName] = useState("");
  const [savingData, setSavingData] = useState(false);

  const saveData = async () => {
    try {
      response = await addClientDB(name);

      if (response.rowsAffected === 1) {
        addClient(name);
        navigation.navigate(stack.orders.ordersSelectClient.name, {
          newClientAdded: true,
        });
      }
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
      setSavingData(false);
    }
  };

  const saveClient = () => {
    setSavingData(true);
    saveData();
  };

  return (
    <View style={[containerStyles.main, containerStyles.formContainer]}>
      <Input
        label="Escriba un nombre"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <Button
        title="Guardar"
        onPress={saveClient}
        disabled={savingData || name === ""}
      />
    </View>
  );
}
