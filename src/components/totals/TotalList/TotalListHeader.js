import React from "react";
import { View } from "react-native";
import { ListItem, Text } from "@rneui/themed";

import { styles } from "./TotalList.styles";

export function TotalListHeader() {
  return (
    <View>
      <ListItem containerStyle={styles.listHeaderContainer}>
        <Text style={[styles.listHeaderCol, styles.colSeparator]}>Tipo</Text>
        <Text style={styles.listHeaderCol}>Total</Text>
      </ListItem>
    </View>
  );
}
