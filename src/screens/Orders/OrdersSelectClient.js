import { View } from "react-native";

import { containerStyles } from "../../styles/Containers.styles";
import { ClientList } from "../../components/orderslist";

export function OrdersSelectClient() {
  return (
    <View style={containerStyles.main}>
      <ClientList />
    </View>
  );
}
