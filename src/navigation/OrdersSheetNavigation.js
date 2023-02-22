import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";

import mainTheme from "../styles/theme.style";
import { stack } from "../utils/screenName";
import { iconNames } from "../utils/tabIcons";
import { GlobalContext } from "../contexts/GlobalState";

import { OrdersNavigation } from "../navigation/OrdersNavigation";
import { ChargesScreen } from "../screens/Charges/ChargesScreen";
import { TotalsScreen } from "../screens/Totals/TotalsScreen";
import { DrawerButton } from "../components/shared";

const Tab = createBottomTabNavigator();

export function OrdersSheetNavigation() {
  const navigation = useNavigation();
  const context = useContext(GlobalContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => tabBarIcon(route, color, size),
        headerShown: true,
        headerLeft: () => (
          <DrawerButton
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{ marginLeft: 16, marginRight: 14 }}
          />
        ),
        tabBarActiveTintColor: mainTheme.SECONDARY_COLOR,
      })}
    >
      <Tab.Screen
        name={stack.orders.ordersNavigation.name}
        component={OrdersNavigation}
        options={{ title: stack.orders.ordersList.title, headerShown: false }}
      />
      <Tab.Screen
        name={stack.charges.charges.name}
        component={ChargesScreen}
        options={{
          title: stack.charges.charges.title,
          headerTitle: context.currentOrdersSheet.name,
        }}
      />
      <Tab.Screen
        name={stack.totals.totals.name}
        component={TotalsScreen}
        options={{
          title: stack.totals.totals.title,
          headerTitle: context.currentOrdersSheet.name,
        }}
      />
    </Tab.Navigator>
  );
}

function tabBarIcon(route, color, size) {
  return (
    <Icon
      type="material-community"
      name={iconNames.ordersSheet[route.name]}
      color={color}
      size={size}
    />
  );
}
