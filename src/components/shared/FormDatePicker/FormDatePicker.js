import { useState } from "react";
import PropTypes from "prop-types";
import { Pressable } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Input, Icon } from "@rneui/themed";

import { styles } from "./FormDatePicker.styles";
import { dateToString } from "../../../utils/date";

export function FormDatePicker(props) {
  const { initialDate = new Date(), onChange } = props;
  const [date, setDate] = useState(initialDate);

  const calendarInputIcon = () => (
    <Icon type="material-community" name="calendar" />
  );

  const onChangeDate = (event, date) => {
    setDate(date);
    onChange(date);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      accentColor: "#ffce00",
      textColor: "#ffce00",
    });
  };

  return (
    <Pressable style={styles.container} onPress={showDatePicker}>
      <Input
        label="Seleccione una fecha"
        editable={false}
        rightIcon={calendarInputIcon}
        value={dateToString(date)}
      />
    </Pressable>
  );
}

FormDatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};
