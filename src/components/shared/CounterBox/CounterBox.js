import React from "react";
import { View } from "react-native";
import { Card, Text } from "@rneui/themed";

import { styles } from "./CounterBox.styles";

export function CounterBox({
  box1Title = "Box 1",
  box1Value = "0",
  box2Title = "",
  box2Value = "0",
  box3Title = "",
  box3Value = "0",
  containerStyles = {},
  cardStyles = {},
}) {
  return (
    <View style={[containerStyles, styles.container]}>
      <Card containerStyle={[styles.card, cardStyles]}>
        <Card.Title>{box1Title}</Card.Title>
        <Text style={styles.text}>{box1Value}</Text>
      </Card>
      {box2Title !== "" && (
        <Card containerStyle={[styles.card, cardStyles]}>
          <Card.Title>{box2Title}</Card.Title>
          <Text style={styles.text}>{box2Value}</Text>
        </Card>
      )}

      {box3Title !== "" && (
        <Card containerStyle={[styles.card, cardStyles]}>
          <Card.Title>{box3Title}</Card.Title>
          <Text style={styles.text}>{box3Value}</Text>
        </Card>
      )}
    </View>
  );
}
