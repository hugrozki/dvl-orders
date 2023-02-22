import { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, Icon } from "@rneui/themed";

import mainTheme from "../../../styles/theme.style";
import { styles } from "./SpecialPriceRow.styles";
import { numberToString, stringToFloat } from "../../../utils/converters";

export function SpecialPriceRow(props) {
  const { quantity, unitPrice, index = null, disableDelete = false } = props;
  const [quantityState, setQuantityState] = useState("0");
  const [unitPriceState, setUnitPriceState] = useState("0");
  const [addDisabled, setAddDisabled] = useState(true);

  useEffect(() => {
    setQuantityState(numberToString(quantity));
    setUnitPriceState(numberToString(unitPrice));

    setAddDisabled(quantity === 0 || unitPrice === 0);
  }, [quantity, unitPrice]);

  const onChangeHandler = (key, value) => {
    const number = stringToFloat(value);
    const string = value;

    if (key === "quantity") {
      setQuantityState(string);
    } else {
      setUnitPriceState(string);
    }

    props.onChangeValues(key, number, index);
  };

  const addValuesHandler = () => {
    if (props.onAddValues) props.onAddValues();
  };

  const deleteValuesHandler = (index) => {
    if (props.onDelete) props.onDelete(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Input
          label="Cantidad"
          keyboardType="numeric"
          selectTextOnFocus={true}
          containerStyle={styles.input}
          value={quantityState}
          onChangeText={(text) => onChangeHandler("quantity", text)}
        />
      </View>
      <View style={styles.item}>
        <Input
          label="Precio Total"
          keyboardType="numeric"
          selectTextOnFocus={true}
          containerStyle={styles.input}
          value={unitPriceState}
          onChangeText={(text) => onChangeHandler("unitprice", text)}
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
            disabled={disableDelete}
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
