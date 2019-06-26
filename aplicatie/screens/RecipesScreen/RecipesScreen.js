import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Title } from "native-base";
import axios from "axios";

import { SPOONACULAR } from "../../constants/Config";
import { StoreContext } from "../../store";
import Placeholder from "../../components/Placeholder/Placeholder";
import RecipeList from "../../components/RecipeList/RecipeList";

class RecipesScreen extends Component {
  static contextType = StoreContext;
  static navigationOptions = {
    title: "RecipesScreen",
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.getRecipes = this.getRecipes.bind(this);
    this.onRecipePress = this.onRecipePress.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    // TODO: Live API
    // const { setRecipes } = this.context;
    // const selectedIngredients = this.props.navigation.getParam(
    //   "selectedIngredients",
    //   []
    // );
    // axios({
    //   method: "GET",
    //   url: SPOONACULAR.URLS.FIND_BY_INGREDIENTS,
    //   params: {
    //     ingredients: selectedIngredients.join(),
    //   },
    //   headers: SPOONACULAR.HEADERS,
    // })
    //   .then(res => {
    //     setRecipes(res.data);
    //     this.setState({ loading: false });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  onRecipePress(recipe) {
    this.props.navigation.navigate("Recipe", { recipe });
  }

  render() {
    const { recipes, favouriteRecipes, onFavouritePress } = this.context;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Recipes</Title>
          </Body>
          <Right />
        </Header>
        {!recipes.length ? (
          <Placeholder text="Take a picture to get recipes." />
        ) : (
          <RecipeList
            loading={this.state.loading}
            recipes={recipes}
            favouriteRecipes={favouriteRecipes}
            onRecipePress={this.onRecipePress}
            onFavouritePress={onFavouritePress}
          />
        )}
      </Container>
    );
  }
}

export default RecipesScreen;
