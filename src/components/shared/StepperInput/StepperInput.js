import { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon, Input, Card } from "@rneui/themed";

import mainTheme from "../../../styles/theme.style";
import { styles } from "./StepperInput.styles";
import { stringToNumber } from "../../../utils/converters";

export function StepperInput({
  title = "Title",
  value = 0,
  disabled = false,
  onChange,
}) {
  const [valueState, setValueState] = useState(0);

  useEffect(() => {
    setValueState(value);
  }, []);

  const onChangeHandler = (operation) => {
    let value = valueState;
    if (operation === "decrease" && valueState > 0) {
      value = valueState - 1;
    } else if (operation === "add") {
      value = valueState + 1;
    }
    setValueState(value);
    onChange(value);
  };

  const onChangeInput = (text) => {
    const value = stringToNumber(text);
    setValueState(value);
    onChange(value);
  };

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <View style={styles.inputContainer}>
        <Icon
          type="material-community"
          name="minus"
          color={mainTheme.DELETE_COLOR}
          size={18}
          reverse
          disabled={disabled}
          onPress={() => onChangeHandler("decrease")}
        />
        <View style={{ width: 90 }}>
          <Input
            keyboardType="numeric"
            value={valueState.toString()}
            onChangeText={onChangeInput}
            inputStyle={{ textAlign: "center" }}
            selectTextOnFocus={true}
            disabled={disabled}
          />
        </View>
        <Icon
          type="material-community"
          name="plus"
          color={mainTheme.ADD_COLOR}
          size={18}
          reverse
          disabled={disabled}
          onPress={() => onChangeHandler("add")}
        />
      </View>
    </Card>
  );
}
