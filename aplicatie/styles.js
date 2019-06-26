import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
  },
});

export default styles;
