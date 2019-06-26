import React from "react";
import { Card, CardItem, ListItem, Text, Left, Right } from "native-base";

import styles from "./styles";

const renderIngredient = ({ name, amount, unit }, index) => {
  return (
    <ListItem key={index} style={styles.separator}>
      <Left>
        <Text>{name}</Text>
      </Left>
      <Right>
        <Text>
          {amount}
          {unit}
        </Text>
      </Right>
    </ListItem>
  );
};

const IngredientList = ({ ingredients }) => {
  return (
    <Card style={styles.view}>
      <CardItem header bordered>
        <Text>Ingredients</Text>
      </CardItem>
      {ingredients.map(renderIngredient)}
    </Card>
  );
};

export default IngredientList;
