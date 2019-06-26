import React from "react";
import { Icon, Card, CardItem, Text } from "native-base";

import styles from "./styles";

const renderRecipeStep = ({ number, step }) => {
  return (
    <CardItem key={number} bordered>
      <Text>{step}</Text>
    </CardItem>
  );
};

const RecipeStepList = ({ steps, readyInMinutes }) => {
  return (
    <Card style={styles.card}>
      <CardItem header bordered>
        <Text>Cooking Steps</Text>
      </CardItem>
      {steps.map(renderRecipeStep)}
      <CardItem header bordered>
        <Icon name="ios-clock" />
        <Text>Cooking time: {readyInMinutes} minutes</Text>
      </CardItem>
    </Card>
  );
};

export default RecipeStepList;
