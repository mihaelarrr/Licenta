import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    marginBottom: 12,
  },
  image: {
    flex: 1,
    width: null,
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  favourite: {
    color: Colors.iosRed,
  },
  fab: {
    backgroundColor: Colors.iosBlue,
  },
  whatsappIcon: {
    backgroundColor: Colors.whatsapp,
  },
  facebookIcon: {
    backgroundColor: Colors.facebook,
  },
  gmailIcon: {
    backgroundColor: Colors.gmail,
  },
});

export default styles;
