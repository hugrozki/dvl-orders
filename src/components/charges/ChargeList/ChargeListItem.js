import { ListItem, Text } from "@rneui/themed";

import { styles } from "./ChargeList.styles";

export const keyExtractor = (item) => item.id.toString();

export const ChargeListItem = ({ item, onPress }) => {
  const { name, chargeTotal, payApplied } = item;

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        onPress(item);
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>
          {payApplied ? "Cobrado:" : "Por cobrar:"} ${chargeTotal}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export const emptyComponent = () => (
  <Text style={styles.emptyComponentText}>No hay ordenes aún</Text>
);
