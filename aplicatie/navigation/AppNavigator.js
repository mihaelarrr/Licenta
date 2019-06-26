import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import CameraScreen from "../components/Camera/Camera";
import IngredientsScreen from "../screens/IngredientsScreen/IngredientsScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Camera: CameraScreen,
      SelectIngredients: IngredientsScreen,
    },
    {
      initialRouteName: "Main",
      headerMode: "none",
    }
  )
);
