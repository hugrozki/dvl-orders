import { FlatList } from "react-native";
import { ListItem } from "@rneui/themed";

import { styles } from "./OrdersSheetList.styles";

export function OrdersSheetList({ list, onPress }) {
  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => {
    const { name, date, current } = item;

    return current ? (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.currentItemTitle}>
            {name}
          </ListItem.Title>
          <ListItem.Subtitle>{date}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ) : (
      <ListItem
        bottomDivider
        onPress={() => {
          onPress(item);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle>{date}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
  );
}
