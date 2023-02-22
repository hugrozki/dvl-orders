import { Icon } from "@rneui/themed";

export function DrawerButton({ onPress, style }) {
  return (
    <Icon
      type="material-community"
      name="menu"
      style={style}
      onPress={onPress}
    />
  );
}
