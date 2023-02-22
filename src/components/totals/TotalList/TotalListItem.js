import { ListItem, Text } from "@rneui/themed";

import { styles } from "./TotalList.styles";

export const keyExtractor = (item) => item.key;

export const TotalListItem = ({ item, index, selected, setSelected }) => {
  const { key, name, quantity } = item;
  const evenStyle = index % 2 == 0 ? styles.stripedColor : {};
  const backgroundColor = selected === key ? styles.selectedColor : evenStyle;

  return (
    <ListItem
      containerStyle={[styles.listItemContainer, backgroundColor]}
      onPress={() => {
        setSelected(key);
      }}
    >
      <Text style={[styles.listItemCol, styles.colSeparator]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.listItemCol}>{quantity}</Text>
    </ListItem>
  );
};

export const emptyComponent = () => (
  <Text style={styles.emptyComponentText}>No se encontraron datos</Text>
);
