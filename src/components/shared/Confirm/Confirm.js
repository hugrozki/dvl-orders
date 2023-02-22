import React from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";

import mainTheme from "../../../styles/theme.style";

export function Confirm({
  title = "Confirm title",
  text = "Confirm text",
  isVisible = false,
  acceptHandler,
  cancelHandler,
}) {
  return (
    <Dialog isVisible={isVisible}>
      <Dialog.Title title={title} />
      <Text>{text}</Text>
      <Dialog.Actions>
        <Dialog.Button
          titleStyle={{ color: mainTheme.SECONDARY_COLOR }}
          title="Aceptar"
          onPress={acceptHandler}
        />
        <Dialog.Button
          titleStyle={{ color: mainTheme.PRIMARY_COLOR }}
          title="Cancelar"
          onPress={cancelHandler}
        />
      </Dialog.Actions>
    </Dialog>
  );
}
