import React from "react";
import { View } from "react-native";
import { ListItem } from "@rneui/themed";

export function GenericList({ data, onPressItem }) {
  return (
    <View>
      {data.map((item, index) => (
        <ListItem
          key={`options-${index}`}
          onPress={() => {
            onPressItem(item);
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
}
