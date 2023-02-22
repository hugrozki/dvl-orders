import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { styles } from "./NewOrdersSheetScreen.styles";
import { GlobalDispatch } from "../../contexts/GlobalState";
import { FormDatePicker } from "../../components/shared";
import { dateToString } from "../../utils/date";
import { getErrorMessage } from "../../utils/errorMesages";
import { stack } from "../../utils/screenName";
import { alertSettings } from "../../components/shared/ToastAlert";
import { containerStyles } from "../../styles/Containers.styles";
import { addOrdersSheet } from "../../services/datastorage";

export function NewOrdersSheetScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [savingData, setSavingData] = useState(false);
  const { createNewSheet } = useContext(GlobalDispatch);

  useEffect(() => {
    setFormatedDescription(date);
  }, [date]);

  const setFormatedDescription = (newDate) => {
    setDescription(`Pedido ${dateToString(newDate)}`);
  };

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
  };

  const saveDatabaseData = async () => {
    try {
      const response = await addOrdersSheet(description, date);

      if (response.success) {
        createNewSheet(response.data.id, description, date);
        navigation.replace(stack.ordersSheet.orderSheetNavigation.name);
      } else {
        Toast.show(`Ocurrió un error al intentar guardar.`, alertSettings);
        setSavingData(false);
      }
    } catch (error) {
      Toast.show(
        `Ocurrió un error : ${getErrorMessage(error.message)}`,
        alertSettings
      );
      setSavingData(false);
    }
  };

  const saveData = () => {
    setSavingData(true);
    saveDatabaseData();
  };

  return (
    <View style={[styles.container, containerStyles.main]}>
      <FormDatePicker initialDate={date} onChange={onChangeDate} />
      <Input
        label="Escriba una descripción"
        value={description}
        onChangeText={(value) => setDescription(value)}
      />
      <Button title="Guardar" onPress={saveData} disabled={savingData} />
    </View>
  );
}
