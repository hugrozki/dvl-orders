import { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { styles } from "./SettingsScreen.styles";
import { GlobalContext, GlobalDispatch } from "../../contexts/GlobalState";
import { containerStyles } from "../../styles/Containers.styles";
import { Types } from "../../components/settings/Types";
import {
  alertSettings,
  messageSettings,
} from "../../components/shared/ToastAlert";
import {
  updateTypes,
  addTypes,
  deleteTypes,
  getTypes,
} from "../../services/datastorage";

export function SettingsTypeScreen() {
  const { settings } = useContext(GlobalContext);
  const { setTypes } = useContext(GlobalDispatch);
  const [typeList, setTypeList] = useState(settings.types);
  const [deleteTypeList, setDeleteTypeList] = useState([]);
  const [savingData, setSavingData] = useState(true);

  const changeTypeHandler = (list, deletedItem = null) => {
    setTypeList(list);

    if (deletedItem !== null && deletedItem.id !== null) {
      setDeleteTypeList(deleteTypeList.concat([deletedItem.id]));
    }

    const findedElement = list.find((element) => element.description === "");
    setSavingData(typeof findedElement !== "undefined");
  };

  const saveData = async () => {
    try {
      const createTypeList = typeList.filter((element) => element.id === null);
      const updateTypeList = typeList.filter(
        (element) => element.updated && element.id !== null
      );

      if (updateTypeList.length > 0) {
        await updateTypes(updateTypeList);
      }

      if (createTypeList.length > 0) {
        await addTypes(createTypeList);
      }

      if (deleteTypeList.length > 0) {
        await deleteTypes(deleteTypeList);
      }

      const response = await getTypes();
      setTypes(response);

      Toast.show("Tipos guardados correctamente.", messageSettings);

      setSavingData(false);
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
      setSavingData(false);
    }
  };

  const saveSettings = () => {
    setSavingData(true);
    saveData();
  };
  return (
    <View style={[styles.mainContainer, containerStyles.main]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Types items={typeList} onChange={changeTypeHandler} />
          <Button
            title="Guardar"
            onPress={saveSettings}
            disabled={savingData}
          />
        </View>
      </ScrollView>
    </View>
  );
}
