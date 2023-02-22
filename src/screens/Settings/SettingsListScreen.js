import React from "react";
import { View } from "react-native";

import { containerStyles } from "../../styles/Containers.styles";
import { stack } from "../../utils/screenName";
import { GenericList } from "../../components/shared";

export function SettingsListScreen({ navigation }) {
  const options = [
    { name: "Precios", route: stack.settings.settingsPrice.name },
    { name: "Tipos", route: stack.settings.settingsType.name },
  ];

  const onPressItemHandler = (data) => {
    navigation.navigate(data.route);
  };
  return (
    <View style={[containerStyles.main, containerStyles.screenListContainer]}>
      <GenericList data={options} onPressItem={onPressItemHandler} />
    </View>
  );
}
