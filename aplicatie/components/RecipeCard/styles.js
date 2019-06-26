import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

export default StyleSheet.create({
  section: {
    flex: 1,
  },
  icon: {
    fontSize: 32,
  },
  favourite: {
    color: Colors.iosRed,
  },
  shareButton: {
    alignSelf: "center",
  },
  favouriteButton: {
    alignSelf: "flex-end",
  },
});
