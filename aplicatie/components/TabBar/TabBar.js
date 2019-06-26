import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text, Badge } from "native-base";

import { StoreContext } from "../../store";

import styles from "./styles";

class TabBar extends Component {
  static contextType = StoreContext;

  render() {
    const { recipes } = this.context;
    const { navigation } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={navigation.state.index === 0}
            onPress={() => navigation.navigate("HomeTab")}
          >
            <Icon name="ios-home" />
            <Text>Home</Text>
          </Button>
          <Button
            badge
            vertical
            active={navigation.state.index === 1}
            onPress={() => navigation.navigate("RecipesTab")}
          >
            <Badge>
              <Text>{recipes.length}</Text>
            </Badge>
            <Icon name="ios-list-box" />
            <Text>Recipes</Text>
          </Button>
          <Button
            vertical
            active={navigation.state.index === 2}
            onPress={() => navigation.navigate("FavouriteTab")}
          >
            <Icon name="ios-heart" />
            <Text>Favourites</Text>
          </Button>
          <Button
            vertical
            active={navigation.state.index === 3}
            onPress={() => navigation.navigate("ShoppingTab")}
          >
            <Icon name="ios-cart" />
            <Text>Shopping</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default TabBar;
