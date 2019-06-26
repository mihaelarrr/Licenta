import { createStackNavigator } from "react-navigation";

import RecipesScreen from "../screens/RecipesScreen/RecipesScreen";
import RecipeScreen from "../screens/RecipeScreen/RecipeScreen";

const RecipesStack = createStackNavigator(
  {
    Recipes: { screen: RecipesScreen },
    Recipe: { screen: RecipeScreen },
  },
  {
    initialRouteName: "Recipes",
    headerMode: "none",
  }
);

export default RecipesStack;
