import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stack } from "../utils/screenName";
import { NoOrdersSheetScreen } from "../screens/OrdersSheet/NoOrdersSheetScreen";
import { NewOrdersSheetScreen } from "../screens/OrdersSheet/NewOrdersSheetScreen";
import { DrawerNavigation } from "./DrawerNavigation";

import { OrdersSelectClient } from "../screens/Orders/OrdersSelectClient";
import { OrdersAddClient } from "../screens/Orders/OrdersAddClient";

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name={stack.ordersSheet.noOrdersSheet.name}
            component={NoOrdersSheetScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={stack.ordersSheet.orderSheetNavigation.name}
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name={stack.ordersSheet.newOrdersSheet.name}
            component={NewOrdersSheetScreen}
            options={{ title: stack.ordersSheet.newOrdersSheet.title }}
          />
          <Stack.Screen
            name={stack.orders.ordersSelectClient.name}
            component={OrdersSelectClient}
            options={{ title: stack.orders.ordersSelectClient.title }}
          />
          <Stack.Screen
            name={stack.orders.ordersAddClient.name}
            component={OrdersAddClient}
            options={{ title: stack.orders.ordersAddClient.title }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
