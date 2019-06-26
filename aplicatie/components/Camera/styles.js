import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraactions: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    alignSelf: "flex-end",
  },
  icon: {
    color: "white",
    fontSize: 50,
  },
  cameraicon: {
    color: "white",
    fontSize: 100,
  },
});
