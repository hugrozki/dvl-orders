import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stack } from "../utils/screenName";
import { OrdersListScreen } from "../screens/Orders/OrdersListScreen";
import { OrderDetail } from "../screens/Orders/OrderDetail";
import { DrawerButton } from "../components/shared";
import { GlobalContext } from "../contexts/GlobalState";

const Stack = createNativeStackNavigator();

export function OrdersNavigation() {
  const navigation = useNavigation();
  const context = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stack.orders.ordersList.name}
        component={OrdersListScreen}
        options={{
          title: context.currentOrdersSheet.name,
          headerShown: true,
          headerLeft: () => (
            <DrawerButton
              onPress={() => {
                navigation.toggleDrawer();
              }}
              style={{ marginRight: 30 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={stack.orders.orderDetail.name}
        component={OrderDetail}
        options={{ title: context.currentOrdersSheet.name, headerShown: true }}
      />
    </Stack.Navigator>
  );
}
