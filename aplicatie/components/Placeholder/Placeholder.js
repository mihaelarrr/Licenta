import React from "react";
import { View, Text } from "native-base";

import styles from "./styles";

const Placeholder = ({ text = "Add placeholder text" }) => {
  return (
    <View padder style={styles.view}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Placeholder;
