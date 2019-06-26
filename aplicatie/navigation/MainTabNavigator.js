import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import TabBar from "../components/TabBar/TabBar";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import FavouriteScreen from "../screens/FavouriteScreen/FavouriteScreen";
import ShoppingScreen from "../screens/ShoppingScreen/ShoppingScreen";
import RecipesStack from "./RecipesStackNavigator";

export default createBottomTabNavigator(
  {
    HomeTab: { screen: HomeScreen },
    RecipesTab: { screen: RecipesStack },
    FavouriteTab: { screen: FavouriteScreen },
    ShoppingTab: { screen: ShoppingScreen },
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => <TabBar {...props} />,
  }
);
