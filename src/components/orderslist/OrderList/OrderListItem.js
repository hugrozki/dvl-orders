import { ListItem, Text } from "@rneui/themed";

import { styles } from "./OrderList.styles";

export const keyExtractor = (item) => item.id.toString();

export const OrderListItem = ({ item, onPress }) => {
  const { name, pieceTotal, id } = item;

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        onPress(item);
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>Cantidad {pieceTotal}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export const emptyComponent = () => (
  <Text style={styles.emptyComponentText}>No hay ordenes aún</Text>
);
