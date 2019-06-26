import React, { Component } from "react";
import {
  Container,
  Content,
  View,
  ListItem,
  Text,
  CheckBox,
  Left,
  Body,
  Right,
  Button,
  Icon,
  H2,
} from "native-base";

import withLoading from "../withLoading/withLoading";

import styles from "./styles";

class ShoppingList extends Component {
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

  renderListItem({ id, name }) {
    const selected = this.checkIfItemSelected(name);

    return (
      <ListItem key={id} selected={selected}>
        <Left>
          <Text>{name}</Text>
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
      <Container>
        <Content>{ingredients.map(this.renderListItem)}</Content>
      </Container>
    );
  }
}

export default withLoading(ShoppingList);
