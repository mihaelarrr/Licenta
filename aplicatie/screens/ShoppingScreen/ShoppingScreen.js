import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Title } from "native-base";

import Placeholder from "../../components/Placeholder/Placeholder";
import ShoppingList from "../../components/ShoppingList/ShoppingList";

class ShoppingScreen extends Component {
  static navigationOptions = {
    title: "ShoppingScreen",
  };

  constructor(props) {
    super(props);
  }

  render() {
    const ingredients = this.props.navigation.getParam("ingredients", []);

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Shopping List</Title>
          </Body>
          <Right />
        </Header>
        {!ingredients.length ? (
          <Placeholder text="There are no ingredients added to this list." />
        ) : (
          <ShoppingList loading={false} ingredients={ingredients} />
        )}
      </Container>
    );
  }
}

export default ShoppingScreen;
