import "react-native-gesture-handler";

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@rneui/themed";

import { View, ActivityIndicator } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";

import mainTheme from "./src/styles/theme.style";
import { dbInitialize, dropDatabase } from "./src/services/datastorage";
import { GlobalState } from "./src/contexts/GlobalState";
import { MainNavigation } from "./src/navigation/MainNavigation";
import { containerStyles } from "./src/styles/Containers.styles";
import { alertSettings } from "./src/components/shared/ToastAlert";

const rneuiTheme = createTheme({
  lightColors: {
    primary: mainTheme.PRIMARY_COLOR,
    error: mainTheme.DELETE_COLOR,
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    try {
      // await dropDatabase();
      await dbInitialize();
      setLoading(false);
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      {loading ? (
        <View style={containerStyles.loadingContainer}>
          <ActivityIndicator size="large" color={mainTheme.SECONDARY_COLOR} />
        </View>
      ) : (
        <GlobalState>
          <RootSiblingParent>
            <ThemeProvider theme={rneuiTheme}>
              <MainNavigation />
            </ThemeProvider>
          </RootSiblingParent>
        </GlobalState>
      )}
    </>
  );
}
