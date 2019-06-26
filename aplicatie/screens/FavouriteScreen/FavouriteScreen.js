import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Title } from "native-base";

import { StoreContext } from "../../store";
import Placeholder from "../../components/Placeholder/Placeholder";
import RecipeList from "../../components/RecipeList/RecipeList";

class FavouriteScreen extends Component {
  static contextType = StoreContext;
  static navigationOptions = {
    title: "FavouriteScreen",
  };

  constructor(props) {
    super(props);

    this.onRecipePress = this.onRecipePress.bind(this);
  }

  onRecipePress(recipe) {
    this.props.navigation.navigate("Recipe", { recipe });
  }

  render() {
    const { favouriteRecipes, onFavouritePress } = this.context;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Favourite</Title>
          </Body>
          <Right />
        </Header>
        {!favouriteRecipes.length ? (
          <Placeholder text="Mark recipes as favourite to see them here." />
        ) : (
          <RecipeList
            recipes={favouriteRecipes}
            favouriteRecipes={favouriteRecipes}
            onRecipePress={this.onRecipePress}
            onFavouritePress={onFavouritePress}
          />
        )}
      </Container>
    );
  }
}

export default FavouriteScreen;
