import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { stack } from "../utils/screenName";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";
import { SettingsListScreen } from "../screens/Settings/SettingsListScreen";
import { SettingsTypeScreen } from "../screens/Settings/SettingsTypeScreen";
import { DrawerButton } from "../components/shared";

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stack.settings.settings.name}
        component={SettingsListScreen}
        options={{
          title: stack.settings.settings.title,
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
        name={stack.settings.settingsPrice.name}
        component={SettingsScreen}
        options={{
          title: stack.settings.settingsPrice.title,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={stack.settings.settingsType.name}
        component={SettingsTypeScreen}
        options={{
          title: stack.settings.settingsType.title,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
