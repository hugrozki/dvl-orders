import { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { styles } from "./SettingsScreen.styles";
import { GlobalContext, GlobalDispatch } from "../../contexts/GlobalState";
import { SpecialPrices } from "../../components/settings/SpecialPrices";
import { containerStyles } from "../../styles/Containers.styles";
import {
  alertSettings,
  messageSettings,
} from "../../components/shared/ToastAlert";
import {
  updatePrices,
  addPrices,
  deletePrices,
  getPrices,
} from "../../services/datastorage";

export function SettingsScreen() {
  const { settings } = useContext(GlobalContext);
  const { setPrices } = useContext(GlobalDispatch);
  const [disabledSave, setDisabledSave] = useState(false);
  const [specialPrices, setSpecialPrices] = useState(settings.prices);
  const [deleteList, setDeleteList] = useState([]);

  const changeSpecialPricesHandler = (list, deletedItem = null) => {
    setSpecialPrices(list);

    if (deletedItem !== null && deletedItem.id !== null) {
      setDeleteList(deleteList.concat([deletedItem.id]));
    }
  };

  const saveData = async () => {
    const createList = specialPrices.filter((element) => element.id === null);
    const updateList = specialPrices.filter(
      (element) => element.updated && element.id !== null
    );

    try {
      if (updateList.length > 0) {
        await updatePrices(updateList);
      }

      if (createList.length > 0) {
        await addPrices(createList);
      }

      if (deleteList.length > 0) {
        await deletePrices(deleteList);
      }

      const response = await getPrices();
      setPrices(response);

      Toast.show("Precios guardados correctamente.", messageSettings);

      setDisabledSave(false);
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
      setDisabledSave(false);
    }
  };

  const saveSettings = async () => {
    setDisabledSave(true);
    saveData();
  };

  return (
    <View style={[styles.mainContainer, containerStyles.main]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <SpecialPrices
            pricesList={specialPrices}
            onChange={changeSpecialPricesHandler}
          />

          <Button
            title="Guardar"
            onPress={saveSettings}
            disabled={disabledSave}
          />
        </View>
      </ScrollView>
    </View>
  );
}
