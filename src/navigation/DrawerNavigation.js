import { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import mainTheme from "../styles/theme.style";
import { stack } from "../utils/screenName";
import { OrdersSheetListScreen } from "../screens/OrdersSheetSelection/OrdersSheetListScreen";
import { OrdersSheetNavigation } from "./OrdersSheetNavigation";
import { SettingsNavigation } from "../navigation/SettingsNavigation";
import { GlobalContext } from "../contexts/GlobalState";

function FullDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={stack.ordersSheet.newOrdersSheet.title}
        onPress={() =>
          props.navigation.navigate(stack.ordersSheet.newOrdersSheet.name)
        }
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  const context = useContext(GlobalContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <FullDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: mainTheme.SECONDARY_COLOR,
      }}
    >
      <Drawer.Screen
        name={stack.ordersSheet.ordersSheet.name}
        component={OrdersSheetNavigation}
        options={{ title: context.currentOrdersSheet.name }}
      />
      <Drawer.Screen
        name={stack.ordersSheetSelection.ordersSheetList.name}
        component={OrdersSheetListScreen}
        options={{
          title: stack.ordersSheetSelection.ordersSheetList.title,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name={stack.settings.settingsNavigation.name}
        component={SettingsNavigation}
        options={{ title: stack.settings.settings.title }}
      />
    </Drawer.Navigator>
  );
}
