import { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, Icon } from "@rneui/themed";

import mainTheme from "../../../styles/theme.style";
import { styles } from "./TypeRow.styles";

export function TypeRow({
  description,
  index = null,
  onChangeValues,
  onAddValues,
  onDelete,
}) {
  const [addDisabled, setAddDisabled] = useState(true);
  const [descriptionState, setDescriptionState] = useState("");

  useEffect(() => {
    setAddDisabled(description === "");
    setDescriptionState(description);
  }, [description]);

  const onChangeHandler = (value) => {
    setDescriptionState(value);
    onChangeValues(value, index);
  };

  const addValuesHandler = () => {
    if (onAddValues) onAddValues();
  };

  const deleteValuesHandler = (index) => {
    if (onDelete) onDelete(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Input
          target="1"
          keyboardType="default"
          selectTextOnFocus={true}
          containerStyle={styles.input}
          value={descriptionState}
          onChangeText={(text) => onChangeHandler(text)}
        />
      </View>
      {index != null ? (
        <View style={styles.delete}>
          <Icon
            type="material-community"
            name="delete-outline"
            color={mainTheme.DELETE_COLOR}
            size={18}
            reverse
            onPress={() => {
              deleteValuesHandler(index);
            }}
          />
        </View>
      ) : (
        <Icon
          type="material-community"
          name="plus"
          color={mainTheme.ADD_COLOR}
          size={18}
          reverse
          disabled={addDisabled}
          onPress={addValuesHandler}
        />
      )}
    </View>
  );
}
