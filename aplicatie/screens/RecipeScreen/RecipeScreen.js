import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  View,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Fab,
  H2,
  Text,
} from "native-base";

import { StoreContext } from "../../store";
import { isFavouriteRecipe } from "../../utils";
import RecipeStepList from "../../components/RecipeStepList/RecipeStepList";
import RecipeBadgeList from "../../components/RecipeBadgeList/RecipeBadgeList";
import IngredientList from "./components/IngredientList/IngredientList";

import styles from "./styles";

class RecipeScreen extends Component {
  static contextType = StoreContext;
  static navigationOptions = {
    title: "RecipeScreen",
  };

  constructor(props) {
    super(props);

    this.state = {
      isFabActive: false,
    };

    this.goBack = this.goBack.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  addToShoppingList(ingredients) {
    this.props.navigation.navigate("ShoppingTab", { ingredients });
  }

  render() {
    const { navigation } = this.props;
    const { isFabActive } = this.state;
    const { recipesInfo, favouriteRecipes, onFavouritePress } = this.context;
    const recipe = navigation.getParam("recipe", {});

    const recipeInfo = recipesInfo[recipe.id];
    const isFavourite = isFavouriteRecipe(recipe, favouriteRecipes);

    const cookingSteps = recipeInfo.analyzedInstructions.length
      ? recipeInfo.analyzedInstructions[0].steps
      : [];

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Recipe</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => onFavouritePress(recipe)}>
              <Icon
                style={isFavourite ? styles.favourite : null}
                name={isFavourite ? "ios-heart" : "ios-heart-empty"}
              />
            </Button>
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <View padder style={styles.content}>
          <H2 style={styles.title}>{recipe.title}</H2>
          <Content>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <RecipeBadgeList
              vegan={recipeInfo.vegan}
              vegetarian={recipeInfo.vegetarian}
              glutenFree={recipeInfo.glutenFree}
            />
            <IngredientList ingredients={recipeInfo.extendedIngredients} />
            <RecipeStepList
              steps={cookingSteps}
              readyInMinutes={recipeInfo.readyInMinutes}
            />
            <Button
              block
              onPress={() => this.addToShoppingList(recipe.missedIngredients)}
            >
              <Icon name="ios-cart" />
              <Text>Create shopping list</Text>
            </Button>
          </Content>
          <Fab
            active={isFabActive}
            direction="up"
            containerStyle={{}}
            style={styles.fab}
            position="bottomRight"
            onPress={() =>
              this.setState(({ isFabActive }) => {
                return {
                  isFabActive: !isFabActive,
                };
              })
            }
          >
            <Icon name="ios-share-alt" />
            <Button style={styles.whatsappIcon}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={styles.facebookIcon}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={styles.gmailIcon}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

export default RecipeScreen;
