import React from "react";
import { View } from "react-native";

import { styles } from "./OrderDetail.styles";
import { StepperInput } from "../../components/shared";

export function OrderDetailStepper({ items, onChangeHandler, disabled = 0 }) {
  return (
    <View style={styles.ordersContainer}>
      {items.map((item, index) => {
        return (
          <StepperInput
            key={item.key}
            title={item.name}
            value={item.value}
            onChange={(value) => onChangeHandler(index, value)}
            disabled={disabled}
          />
        );
      })}
    </View>
  );
}
