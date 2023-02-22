import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBarContainer: {
    width: "85%",
  },
  searchBar: { height: 50, borderColor: "#F2F3F4", borderWidth: 2 },
  searchBarInput: { height: 35 },
  emptyComponentText: {
    padding: 10,
    textAlign: "center",
  },
});
