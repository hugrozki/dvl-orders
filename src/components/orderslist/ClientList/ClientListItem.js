import { ListItem, Text } from "@rneui/themed";

import { styles } from "./ClientList.style";

export const keyExtractor = (item, index) => index.toString();

export const RenderItem = ({ item, onPress }) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        onPress(item);
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export const emptyComponent = () => (
  <Text style={styles.emptyComponentText}>No hay clientes aún</Text>
);
