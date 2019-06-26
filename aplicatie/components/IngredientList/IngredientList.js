import React, { Component } from "react";
import {
  Container,
  Content,
  ListItem,
  Text,
  CheckBox,
  Left,
  Body,
  Right,
  Button,
  Icon,
} from "native-base";

import withLoading from "../withLoading/withLoading";

import styles from "./styles";

class IngredientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIngredients: [],
    };

    this.onCheckBoxPress = this.onCheckBoxPress.bind(this);
    this.checkIfItemSelected = this.checkIfItemSelected.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  checkIfItemSelected(pressedItemId) {
    return this.state.selectedIngredients.includes(pressedItemId);
  }

  onCheckBoxPress(pressedItemId) {
    this.setState(({ selectedIngredients }) => {
      if (this.checkIfItemSelected(pressedItemId)) {
        return {
          selectedIngredients: selectedIngredients.filter(
            itemId => itemId !== pressedItemId
          ),
        };
      }

      return { selectedIngredients: selectedIngredients.concat(pressedItemId) };
    });
  }

  renderListItem({ id, name, value }) {
    const selected = this.checkIfItemSelected(name);

    return (
      <ListItem key={id} selected={selected}>
        <Left>
          <Text>
            {name} ({Math.round(value * 100)}%)
          </Text>
        </Left>
        <Right>
          <CheckBox
            checked={selected}
            onPress={() => this.onCheckBoxPress(name)}
          >
            <Body>
              <Text>{name}</Text>
            </Body>
          </CheckBox>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { ingredients } = this.props;

    return (
      <Container style={styles.container}>
        <Content>{ingredients.map(this.renderListItem)}</Content>
        <Button
          primary
          full
          iconLeft
          disabled={!this.state.selectedIngredients.length}
          onPress={() =>
            this.props.onGetRecipesPress(this.state.selectedIngredients)
          }
        >
          <Icon name="ios-list-box" />
          <Text>Get Recipes</Text>
        </Button>
      </Container>
    );
  }
}

export default withLoading(IngredientList);
