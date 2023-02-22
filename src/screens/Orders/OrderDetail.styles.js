import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerTitle: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  innerContainer: {
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleArrowDisabled: {
    backgroundColor: "transparent",
    color: "red",
  },
  unitPrice: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  ordersContainer: {
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 25,
  },
  actionButton: {
    marginTop: 16,
    marginBottom: 5,
  },
});
