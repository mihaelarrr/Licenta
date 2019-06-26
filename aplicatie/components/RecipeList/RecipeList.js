import React, { Component } from "react";
import { Content, H2 } from "native-base";

import withLoading from "../withLoading/withLoading";
import RecipeCard from "../RecipeCard/RecipeCard";
import { isFavouriteRecipe } from "../../utils";

import styles from "./styles";

class RecipeList extends Component {
  render() {
    const {
      recipes,
      favouriteRecipes,
      onRecipePress,
      onFavouritePress,
    } = this.props;

    return (
      <Content>
        {recipes.map(recipe => {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRecipePress={onRecipePress}
              isFavourite={isFavouriteRecipe(recipe, favouriteRecipes)}
              onFavouritePress={onFavouritePress}
            />
          );
        })}
      </Content>
    );
  }
}

export default withLoading(RecipeList);
