import React from "react";
import { View, Text, Badge } from "native-base";

import styles from "./styles";

const RecipeBadgeList = ({ vegan, vegetarian, glutenFree }) => {
  return (
    <View style={styles.view}>
      {vegan && (
        <Badge info style={styles.badge}>
          <Text>Vegetarian</Text>
        </Badge>
      )}
      {vegetarian && (
        <Badge success style={styles.badge}>
          <Text>Vegan</Text>
        </Badge>
      )}
      {glutenFree && (
        <Badge warning style={styles.badge}>
          <Text>Gluten Free</Text>
        </Badge>
      )}
    </View>
  );
};

export default RecipeBadgeList;
