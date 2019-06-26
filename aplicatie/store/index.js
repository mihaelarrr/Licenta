import React, { Component } from "react";
import store from "react-native-simple-store";
import axios from "axios";

import { SPOONACULAR } from "../constants/Config";
import { isFavouriteRecipe, arrayToObject } from "../utils";

export const StoreContext = React.createContext({
  recipes: [],
  recipesInfo: null,
  favouriteRecipes: [],
  similarRecipes: [],
  setRecipes: () => {},
  onFavouritePress: () => {},
});

class StoreProvider extends Component {
  constructor(props) {
    super(props);

    this.setRecipes = this.setRecipes.bind(this);
    this.getSimilarRecipes = this.getSimilarRecipes.bind(this);
    this.getRecipeInformationBulk = this.getRecipeInformationBulk.bind(this);
    this.onFavouritePress = this.onFavouritePress.bind(this);

    // TODO: Live API
    // this.state = {
    //   recipes: [],
    //   recipesInfo: null,
    //   favouriteRecipes: [],
    //   similarRecipes: [],
    //   setRecipes: this.setRecipes,
    //   onFavouritePress: this.onFavouritePress,
    // };

    this.state = {
      recipes: mockRecipes,
      recipesInfo: mockRecipesInfo,
      favouriteRecipes: [],
      similarRecipes: [],
      setRecipes: this.setRecipes,
      onFavouritePress: this.onFavouritePress,
    };
  }

  componentDidMount() {
    store.get("favouriteRecipes").then(
      favouriteRecipes => {
        this.setState({ favouriteRecipes: favouriteRecipes || [] });
      },
      () => {
        const { similarRecipes, favouriteRecipes } = this.state;
        if (!similarRecipes.length && favouriteRecipes.length) {
          this.getSimilarRecipes();
        }
      }
    );
  }

  getSimilarRecipes() {
    const { favouriteRecipes } = this.state;

    // TODO: Live API
    // if (favouriteRecipes.length) {
    //   axios({
    //     method: "GET",
    //     url: `${SPOONACULAR.URLS.FIND_SIMILAR}/${
    //       favouriteRecipes[0].id
    //     }/similar`,
    //     headers: SPOONACULAR.HEADERS,
    //   })
    //     .then(res => {
    //       this.setSimilarRecipes(res.data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }

    this.setSimilarRecipes(mockSimilarRecipes);
  }

  getRecipeInformationBulk(recipeIds) {
    axios({
      method: "GET",
      url: SPOONACULAR.URLS.FIND_BULK,
      params: {
        ids: recipeIds.join(),
      },
      headers: SPOONACULAR.HEADERS,
    })
      .then(res => {
        this.setState(({ recipesInfo }) => {
          return {
            recipesInfo: {
              ...recipesInfo,
              ...arrayToObject(res.data, "id"),
            },
          };
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setSimilarRecipes(similarRecipes) {
    // TODO: Live API
    // if (similarRecipes.length) {
    //   const recipeIds = similarRecipes.map(({ id }) => id);

    //   this.getRecipeInformationBulk(recipeIds);
    // }

    this.setState({
      similarRecipes,
    });
  }

  setRecipes(recipes) {
    // TODO: Live API
    // if (recipes.length) {
    //   const recipeIds = recipes.map(({ id }) => id);

    //   this.getRecipeInformationBulk(recipeIds);
    // }

    this.setState({
      recipes,
    });
  }

  onFavouritePress(recipe) {
    this.setState(
      ({ favouriteRecipes }) => {
        if (isFavouriteRecipe(recipe, favouriteRecipes)) {
          return {
            favouriteRecipes: favouriteRecipes.filter(({ id }) => {
              return id !== recipe.id;
            }),
          };
        }

        return {
          favouriteRecipes: favouriteRecipes.concat(recipe),
        };
      },
      () => {
        const { similarRecipes, favouriteRecipes } = this.state;
        if (!similarRecipes.length && favouriteRecipes.length) {
          this.getSimilarRecipes();
        } else if (favouriteRecipes.length === 0) {
          this.setState({
            similarRecipes: [],
          });
        }
      }
    );
  }

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default StoreProvider;

const mockRecipesInfo = {
  "47732": {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 8,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    sourceUrl: "http://orangette.blogspot.com/2008/10/this-old-thing.html",
    spoonacularSourceUrl: "https://spoonacular.com/apple-tart-47732",
    aggregateLikes: 0,
    spoonacularScore: 9,
    healthScore: 1,
    pricePerServing: 82,
    extendedIngredients: [
      {
        id: 2048,
        aisle: "Oil, Vinegar, Salad Dressing",
        image: "apple-cider-vinegar.jpg",
        consitency: "liquid",
        name: "apple cider vinegar",
        original: "3/4 tsp apple cider vinegar",
        originalString: "3/4 tsp apple cider vinegar",
        originalName: "apple cider vinegar",
        amount: 0.75,
        unit: "tsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.75,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
          metric: {
            amount: 0.75,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
        },
      },
      {
        id: 1089003,
        aisle: "Produce",
        image: "grannysmith-apple.png",
        consitency: "solid",
        name: "granny smith apples",
        original: "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
        originalString: "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
        originalName: "- 7 medium Granny Smith apples (about",
        amount: 2.5,
        unit: "lbs",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2.5,
            unitShort: "lb",
            unitLong: "pounds",
          },
          metric: {
            amount: 1.134,
            unitShort: "kilogram",
            unitLong: "kilograms",
          },
        },
      },
      {
        id: 14412,
        aisle: "Beverages",
        image: "water.png",
        consitency: "liquid",
        name: "ice water",
        original: "4 tbsp ice water, plus more as needed",
        originalString: "4 tbsp ice water, plus more as needed",
        originalName: "ice water, plus more as needed",
        amount: 4,
        unit: "tbsp",
        meta: ["as needed", "plus more "],
        metaInformation: ["as needed", "plus more "],
        measures: {
          us: {
            amount: 4,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 4,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 2047,
        aisle: "Spices and Seasonings",
        image: "salt.jpg",
        consitency: "solid",
        name: "salt",
        original: "3/4 tsp salt",
        originalString: "3/4 tsp salt",
        originalName: "salt",
        amount: 0.75,
        unit: "tsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.75,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
          metric: {
            amount: 0.75,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
        },
      },
      {
        id: 19335,
        aisle: "Baking",
        image: "sugar-in-bowl.png",
        consitency: "solid",
        name: "sugar",
        original: "1 tbsp sugar",
        originalString: "1 tbsp sugar",
        originalName: "sugar",
        amount: 1,
        unit: "tbsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
      {
        id: 10020081,
        aisle: "Baking",
        image: "flour.png",
        consitency: "solid",
        name: "unbleached flour",
        original: "1 1/2 cup unbleached all-purpose flour",
        originalString: "1 1/2 cup unbleached all-purpose flour",
        originalName: "unbleached all-purpose flour",
        amount: 1.5,
        unit: "cup",
        meta: ["all-purpose"],
        metaInformation: ["all-purpose"],
        measures: {
          us: {
            amount: 1.5,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 354.882,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 1145,
        aisle: "Milk, Eggs, Other Dairy",
        image: "butter-sliced.jpg",
        consitency: "solid",
        name: "unsalted butter",
        original: "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
        originalString:
          "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
        originalName: "tbsp cold unsalted butter, cut into cubes",
        amount: 4.5,
        unit: "oz",
        meta: ["unsalted", "cold", "cut into cubes"],
        metaInformation: ["unsalted", "cold", "cut into cubes"],
        measures: {
          us: {
            amount: 4.5,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 127.573,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 14412,
        aisle: "Beverages",
        image: "water.png",
        consitency: "liquid",
        name: "water",
        original: "1 cup water",
        originalString: "1 cup water",
        originalName: "water",
        amount: 1,
        unit: "cup",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "cup",
            unitLong: "cup",
          },
          metric: {
            amount: 236.588,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
    ],
    id: 47732,
    title: "Apple Tart",
    readyInMinutes: 60,
    servings: 8,
    image: "https://spoonacular.com/recipeImages/47732-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["lacto ovo vegetarian"],
    occasions: [],
    winePairing: {},
    instructions: null,
    analyzedInstructions: [],
    sourceName: null,
    creditsText: null,
  },
  "47950": {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 13,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    preparationMinutes: 25,
    cookingMinutes: 20,
    sourceUrl: "http://www.landolakes.com/recipe/3168/cinnamon-apple-crisp",
    spoonacularSourceUrl: "https://spoonacular.com/cinnamon-apple-crisp-47950",
    aggregateLikes: 35,
    spoonacularScore: 31,
    healthScore: 3,
    pricePerServing: 83.17,
    extendedIngredients: [
      {
        id: 9003,
        aisle: "Produce",
        image: "apple.jpg",
        consitency: "solid",
        name: "apples",
        original: "6 medium (6 cups) apples, peeled, cored, sliced",
        originalString: "6 medium (6 cups) apples, peeled, cored, sliced",
        originalName: "medium apples, peeled, cored, sliced",
        amount: 6,
        unit: "cups",
        meta: ["cored", "peeled", "sliced"],
        metaInformation: ["cored", "peeled", "sliced"],
        measures: {
          us: {
            amount: 6,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 1.42,
            unitShort: "l",
            unitLong: "liters",
          },
        },
      },
      {
        id: 19334,
        aisle: "Baking",
        image: "dark-brown-sugar.png",
        consitency: "solid",
        name: "brown sugar",
        original: "3/4 cup firmly packed brown sugar",
        originalString: "3/4 cup firmly packed brown sugar",
        originalName: "firmly packed brown sugar",
        amount: 0.75,
        unit: "cup",
        meta: ["packed"],
        metaInformation: ["packed"],
        measures: {
          us: {
            amount: 0.75,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 177.441,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 93674,
        aisle: "Milk, Eggs, Other Dairy",
        image: "cinnamon-sugar-butter.png",
        consitency: "solid",
        name: "cinnamon sugar butter",
        original: "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread",
        originalString: "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread",
        originalName: "Land O Lakes® Cinnamon Sugar Butter Spread",
        amount: 0.5,
        unit: "cup",
        meta: ["lakes®"],
        metaInformation: ["lakes®"],
        measures: {
          us: {
            amount: 0.5,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 118.294,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 20081,
        aisle: "Baking",
        image: "flour.png",
        consitency: "solid",
        name: "flour",
        original: "1/2 cup all-purpose flour",
        originalString: "1/2 cup all-purpose flour",
        originalName: "all-purpose flour",
        amount: 0.5,
        unit: "cup",
        meta: ["all-purpose"],
        metaInformation: ["all-purpose"],
        measures: {
          us: {
            amount: 0.5,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 118.294,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 8120,
        aisle: "Cereal",
        image: "rolled-oats.jpg",
        consitency: "solid",
        name: "old-fashioned oats",
        original: "3/4 cup uncooked old-fashioned oats",
        originalString: "3/4 cup uncooked old-fashioned oats",
        originalName: "uncooked old-fashioned oats",
        amount: 0.75,
        unit: "cup",
        meta: ["uncooked"],
        metaInformation: ["uncooked"],
        measures: {
          us: {
            amount: 0.75,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 177.441,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
    ],
    id: 47950,
    title: "Cinnamon Apple Crisp",
    readyInMinutes: 45,
    servings: 6,
    image: "https://spoonacular.com/recipeImages/47950-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["lacto ovo vegetarian"],
    occasions: [],
    winePairing: {},
    instructions: null,
    analyzedInstructions: [],
    sourceName: null,
    creditsText: null,
  },
  "48191": {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: false,
    cheap: false,
    veryPopular: true,
    sustainable: false,
    weightWatcherSmartPoints: 6,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    sourceUrl: "http://www.jamieoliver.com/recipes/fruit-recipes/apple-crumble",
    spoonacularSourceUrl: "https://spoonacular.com/apple-crumble-recipe-48191",
    aggregateLikes: 965,
    spoonacularScore: 46,
    healthScore: 4,
    creditsText: "Jamie Oliver",
    sourceName: "Jamie Oliver",
    pricePerServing: 36.41,
    extendedIngredients: [
      {
        id: 9003,
        aisle: "Produce",
        image: "apple.jpg",
        consitency: "solid",
        name: "apples",
        original: "400 g cooking apples peeled cored and quartered",
        originalString: "400 g cooking apples peeled cored and quartered",
        originalName: "cooking apples peeled cored and quartered",
        amount: 400,
        unit: "g",
        meta: ["cored", "peeled", "quartered"],
        metaInformation: ["cored", "peeled", "quartered"],
        measures: {
          us: {
            amount: 14.11,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 400,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 4073,
        aisle: "Milk, Eggs, Other Dairy",
        image: "butter-sliced.jpg",
        consitency: "solid",
        name: "margarine",
        original: "35 g margarine or butter",
        originalString: "35 g margarine or butter",
        originalName: "margarine or butter",
        amount: 35,
        unit: "g",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1.235,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 35,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 8120,
        aisle: "Cereal",
        image: "rolled-oats.jpg",
        consitency: "solid",
        name: "rolled oats",
        original: "35 g rolled oats",
        originalString: "35 g rolled oats",
        originalName: "rolled oats",
        amount: 35,
        unit: "g",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1.235,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 35,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 19335,
        aisle: "Baking",
        image: "sugar-in-bowl.png",
        consitency: "solid",
        name: "sugar",
        original: "20 g caster sugar",
        originalString: "20 g caster sugar",
        originalName: "caster sugar",
        amount: 20,
        unit: "g",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.705,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 20,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 19335,
        aisle: "Baking",
        image: "sugar-in-bowl.png",
        consitency: "solid",
        name: "sugar",
        original: "50 g sugar to sweeten",
        originalString: "50 g sugar to sweeten",
        originalName: "sugar to sweeten",
        amount: 50,
        unit: "g",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1.764,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 50,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 14412,
        aisle: "Beverages",
        image: "water.png",
        consitency: "liquid",
        name: "water",
        original: "1 Tbsp water",
        originalString: "1 Tbsp water",
        originalName: "water",
        amount: 1,
        unit: "Tbsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
      {
        id: 20080,
        aisle: "Baking",
        image: "flour.png",
        consitency: "solid",
        name: "wholemeal flour",
        original: "35 g wholemeal flour",
        originalString: "35 g wholemeal flour",
        originalName: "wholemeal flour",
        amount: 35,
        unit: "g",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1.235,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 35,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
    ],
    id: 48191,
    title: "Apple Crumble Recipe",
    readyInMinutes: 45,
    servings: 5,
    image: "https://spoonacular.com/recipeImages/48191-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["dairy free"],
    occasions: [],
    winePairing: {},
    instructions: null,
    analyzedInstructions: [],
  },
  "534573": {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 11,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    sourceUrl:
      "http://sarahscucinabella.com/2010/10/06/brown-butter-apple-crumble/",
    spoonacularSourceUrl:
      "https://spoonacular.com/brown-butter-apple-crumble-534573",
    aggregateLikes: 7,
    spoonacularScore: 20,
    healthScore: 2,
    creditsText: "Sarahs Cucina Bella",
    sourceName: "Sarahs Cucina Bella",
    pricePerServing: 84.01,
    extendedIngredients: [
      {
        id: 9003,
        aisle: "Produce",
        image: "apple.jpg",
        consitency: "solid",
        name: "apples",
        original: "4 apples, peeled, cored and sliced",
        originalString: "4 apples, peeled, cored and sliced",
        originalName: "apples, peeled, cored and sliced",
        amount: 4,
        unit: "",
        meta: ["cored", "peeled", "sliced"],
        metaInformation: ["cored", "peeled", "sliced"],
        measures: {
          us: {
            amount: 4,
            unitShort: "",
            unitLong: "",
          },
          metric: {
            amount: 4,
            unitShort: "",
            unitLong: "",
          },
        },
      },
      {
        id: 2010,
        aisle: "Spices and Seasonings",
        image: "cinnamon.jpg",
        consitency: "solid",
        name: "cinnamon",
        original: "1/2 tsp cinnamon",
        originalString: "1/2 tsp cinnamon",
        originalName: "cinnamon",
        amount: 0.5,
        unit: "tsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 0.5,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
          metric: {
            amount: 0.5,
            unitShort: "tsps",
            unitLong: "teaspoons",
          },
        },
      },
      {
        id: 20081,
        aisle: "Baking",
        image: "flour.png",
        consitency: "solid",
        name: "flour",
        original: "1/4 cup all-purpose flour",
        originalString: "1/4 cup all-purpose flour",
        originalName: "all-purpose flour",
        amount: 0.25,
        unit: "cup",
        meta: ["all-purpose"],
        metaInformation: ["all-purpose"],
        measures: {
          us: {
            amount: 0.25,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 59.147,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 19334,
        aisle: "Baking",
        image: "dark-brown-sugar.png",
        consitency: "solid",
        name: "light brown sugar",
        original: "1/4 cup light brown sugar",
        originalString: "1/4 cup light brown sugar",
        originalName: "light brown sugar",
        amount: 0.25,
        unit: "cup",
        meta: ["light"],
        metaInformation: ["light"],
        measures: {
          us: {
            amount: 0.25,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 59.147,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 8120,
        aisle: "Cereal",
        image: "rolled-oats.jpg",
        consitency: "solid",
        name: "oats",
        original: "1/2 cup uncooked oats (not instant)",
        originalString: "1/2 cup uncooked oats (not instant)",
        originalName: "uncooked oats (not instant)",
        amount: 0.5,
        unit: "cup",
        meta: ["uncooked", "(not instant)"],
        metaInformation: ["uncooked", "(not instant)"],
        measures: {
          us: {
            amount: 0.5,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 118.294,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 2047,
        aisle: "Spices and Seasonings",
        image: "salt.jpg",
        consitency: "solid",
        name: "salt",
        original: "pinch salt",
        originalString: "pinch salt",
        originalName: "pinch salt",
        amount: 1,
        unit: "pinch",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "pinch",
            unitLong: "pinch",
          },
          metric: {
            amount: 1,
            unitShort: "pinch",
            unitLong: "pinch",
          },
        },
      },
      {
        id: 1001001,
        aisle: "Milk, Eggs, Other Dairy",
        image: "butter.jpg",
        consitency: "solid",
        name: "salted butter",
        original: "1/4 cup salted butter",
        originalString: "1/4 cup salted butter",
        originalName: "salted butter",
        amount: 0.25,
        unit: "cup",
        meta: ["salted"],
        metaInformation: ["salted"],
        measures: {
          us: {
            amount: 0.25,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 59.147,
            unitShort: "ml",
            unitLong: "milliliters",
          },
        },
      },
      {
        id: 19335,
        aisle: "Baking",
        image: "sugar-in-bowl.png",
        consitency: "solid",
        name: "sugar",
        original: "2 tbsp sugar",
        originalString: "2 tbsp sugar",
        originalName: "sugar",
        amount: 2,
        unit: "tbsp",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
    ],
    id: 534573,
    title: "Brown Butter Apple Crumble",
    readyInMinutes: 45,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/534573-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["lacto ovo vegetarian"],
    occasions: [],
    winePairing: {},
    instructions:
      "Preheat oven to 350 degrees.In a medium bowl, combine the apples, sugar, cinnamon, cloves and salt. Toss until well-combined.Add the apples to a deep oval baking dish. Spread out into an even layer.In a small bowl, stir together the oats, flour and brown sugar. Set aside.Heat the butter in a small pan until melted. Continue swirling over a medium flame until the butter turns a golden brown color. Remove from heat and stir into the oats mixture until well combined.Sprinkle the oats mixture over the apples.Slide the baking dish into the oven and cook for 45 minutes, until golden on top and bubbling at the sides. Remove from the oven and let cool slightly before serving.",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step:
              "Preheat oven to 350 degrees.In a medium bowl, combine the apples, sugar, cinnamon, cloves and salt. Toss until well-combined.",
            ingredients: [
              {
                id: 2010,
                name: "cinnamon",
                image: "cinnamon.jpg",
              },
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
              {
                id: 19335,
                name: "sugar",
                image: "sugar-in-bowl.png",
              },
              {
                id: 2047,
                name: "salt",
                image: "salt.jpg",
              },
            ],
            equipment: [
              {
                id: 404783,
                name: "bowl",
                image: "bowl.jpg",
              },
              {
                id: 404784,
                name: "oven",
                image: "oven.jpg",
              },
            ],
          },
          {
            number: 2,
            step: "Add the apples to a deep oval baking dish.",
            ingredients: [
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
            ],
            equipment: [
              {
                id: 404646,
                name: "baking pan",
                image: "roasting-pan.jpg",
              },
            ],
          },
          {
            number: 3,
            step:
              "Spread out into an even layer.In a small bowl, stir together the oats, flour and brown sugar. Set aside.",
            ingredients: [
              {
                id: 19334,
                name: "brown sugar",
                image: "dark-brown-sugar.png",
              },
              {
                id: 20081,
                name: "all purpose flour",
                image: "flour.png",
              },
              {
                id: 8120,
                name: "oats",
                image: "rolled-oats.jpg",
              },
            ],
            equipment: [
              {
                id: 404783,
                name: "bowl",
                image: "bowl.jpg",
              },
            ],
          },
          {
            number: 4,
            step:
              "Heat the butter in a small pan until melted. Continue swirling over a medium flame until the butter turns a golden brown color.",
            ingredients: [
              {
                id: 1001,
                name: "butter",
                image: "butter-sliced.jpg",
              },
            ],
            equipment: [
              {
                id: 404645,
                name: "frying pan",
                image: "pan.png",
              },
            ],
          },
          {
            number: 5,
            step:
              "Remove from heat and stir into the oats mixture until well combined.Sprinkle the oats mixture over the apples.Slide the baking dish into the oven and cook for 45 minutes, until golden on top and bubbling at the sides.",
            ingredients: [
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
              {
                id: 8120,
                name: "oats",
                image: "rolled-oats.jpg",
              },
            ],
            equipment: [
              {
                id: 404646,
                name: "baking pan",
                image: "roasting-pan.jpg",
              },
              {
                id: 404784,
                name: "oven",
                image: "oven.jpg",
              },
            ],
            length: {
              number: 45,
              unit: "minutes",
            },
          },
          {
            number: 6,
            step: "Remove from the oven and let cool slightly before serving.",
            ingredients: [],
            equipment: [
              {
                id: 404784,
                name: "oven",
                image: "oven.jpg",
              },
            ],
          },
        ],
      },
    ],
  },
  "556470": {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 7,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    preparationMinutes: 5,
    cookingMinutes: 0,
    sourceUrl: "http://en.julskitchen.com/other/life/apple-fritters",
    spoonacularSourceUrl: "https://spoonacular.com/apple-fritters-556470",
    aggregateLikes: 243,
    spoonacularScore: 33,
    healthScore: 2,
    creditsText: "Jul's Kitchen",
    sourceName: "Jul's Kitchen",
    pricePerServing: 122.5,
    extendedIngredients: [
      {
        id: 14003,
        aisle: "Alcoholic Beverages",
        image: "beer.jpg",
        consitency: "liquid",
        name: "beer",
        original: "2 tablespoons of lager beer",
        originalString: "2 tablespoons of lager beer",
        originalName: "lager beer",
        amount: 2,
        unit: "tablespoons",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 1123,
        aisle: "Milk, Eggs, Other Dairy",
        image: "egg.png",
        consitency: "solid",
        name: "egg",
        original: "1 egg",
        originalString: "1 egg",
        originalName: "egg",
        amount: 1,
        unit: "",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "",
            unitLong: "",
          },
          metric: {
            amount: 1,
            unitShort: "",
            unitLong: "",
          },
        },
      },
      {
        id: 1034053,
        aisle: "Oil, Vinegar, Salad Dressing",
        image: "olive-oil.jpg",
        consitency: "liquid",
        name: "extra virgin olive oil",
        original: "1 tablespoon of extra virgin olive oil",
        originalString: "1 tablespoon of extra virgin olive oil",
        originalName: "extra virgin olive oil",
        amount: 1,
        unit: "tablespoon",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
      {
        id: 20081,
        aisle: "Baking",
        image: "flour.png",
        consitency: "solid",
        name: "flour",
        original: "2 tablespoons of flour",
        originalString: "2 tablespoons of flour",
        originalName: "flour",
        amount: 2,
        unit: "tablespoons",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 4042,
        aisle: "Oil, Vinegar, Salad Dressing",
        image: "peanut-oil.jpg",
        consitency: "liquid",
        name: "peanut oil",
        original: "peanut oil for frying",
        originalString: "peanut oil for frying",
        originalName: "peanut oil for frying",
        amount: 2,
        unit: "servings",
        meta: ["for frying"],
        metaInformation: ["for frying"],
        measures: {
          us: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
          metric: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
        },
      },
      {
        id: 1059003,
        aisle: "Produce",
        image: "red-delicious-apples.png",
        consitency: "solid",
        name: "red delicious apples",
        original: "2 Golden Delicious apples",
        originalString: "2 Golden Delicious apples",
        originalName: "Golden Delicious apples",
        amount: 2,
        unit: "",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "",
            unitLong: "",
          },
          metric: {
            amount: 2,
            unitShort: "",
            unitLong: "",
          },
        },
      },
      {
        id: 2047,
        aisle: "Spices and Seasonings",
        image: "salt.jpg",
        consitency: "solid",
        name: "salt",
        original: "1 pinch of salt",
        originalString: "1 pinch of salt",
        originalName: "salt",
        amount: 1,
        unit: "pinch",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "pinch",
            unitLong: "pinch",
          },
          metric: {
            amount: 1,
            unitShort: "pinch",
            unitLong: "pinch",
          },
        },
      },
      {
        id: 19335,
        aisle: "Baking",
        image: "sugar-in-bowl.png",
        consitency: "solid",
        name: "sugar",
        original: "sugar to decorate",
        originalString: "sugar to decorate",
        originalName: "sugar to decorate",
        amount: 2,
        unit: "servings",
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
          metric: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
        },
      },
    ],
    id: 556470,
    title: "Apple fritters",
    readyInMinutes: 5,
    servings: 2,
    image: "https://spoonacular.com/recipeImages/556470-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["dairy free", "lacto ovo vegetarian"],
    occasions: [],
    winePairing: {},
    instructions:
      "Beat the egg in a bowl, add a pinch of salt and the flour and pour in the extra virgin olive oil and the beer: if needed, add a tablespoon of water to make a smooth but not too liquid batter. It is supposed to cover the apples, not to slide off!Peel the apples, core them paying attention not to break them and cut the apples into horizontal slices, 1 cm thick.Heat the olive oil in a large frying pan. The right moment to fry the apples is when the oil starts to smoke, as grandma says. Dip the apple slices into the batter and deep fry them until cooked through and golden on both sides.Transfer the apples into a plate lined with a paper towel. Sprinkle the fritters with icing sugar and serve them warm.",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step:
              "Beat the egg in a bowl, add a pinch of salt and the flour and pour in the extra virgin olive oil and the beer: if needed, add a tablespoon of water to make a smooth but not too liquid batter. It is supposed to cover the apples, not to slide off!Peel the apples, core them paying attention not to break them and cut the apples into horizontal slices, 1 cm thick.",
            ingredients: [
              {
                id: 1034053,
                name: "extra virgin olive oil",
                image: "olive-oil.jpg",
              },
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
              {
                id: 20081,
                name: "all purpose flour",
                image: "flour.png",
              },
              {
                id: 14003,
                name: "beer",
                image: "beer.jpg",
              },
              {
                id: 2047,
                name: "salt",
                image: "salt.jpg",
              },
              {
                id: 1123,
                name: "egg",
                image: "egg.png",
              },
            ],
            equipment: [
              {
                id: 404783,
                name: "bowl",
                image: "bowl.jpg",
              },
            ],
          },
          {
            number: 2,
            step:
              "Heat the olive oil in a large frying pan. The right moment to fry the apples is when the oil starts to smoke, as grandma says. Dip the apple slices into the batter and deep fry them until cooked through and golden on both sides.",
            ingredients: [
              {
                id: 4053,
                name: "olive oil",
                image: "olive-oil.jpg",
              },
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
            ],
            equipment: [
              {
                id: 404645,
                name: "frying pan",
                image: "pan.png",
              },
            ],
          },
          {
            number: 3,
            step:
              "Transfer the apples into a plate lined with a paper towel. Sprinkle the fritters with icing sugar and serve them warm.",
            ingredients: [
              {
                id: 9003,
                name: "apple",
                image: "apple.jpg",
              },
            ],
            equipment: [
              {
                id: 405895,
                name: "paper towels",
                image: "paper-towels.jpg",
              },
            ],
          },
        ],
      },
    ],
  },
};

const mockRecipes = [
  {
    id: 48191,
    title: "Apple Crumble Recipe",
    image: "https://spoonacular.com/recipeImages/48191-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 4,
    missedIngredients: [
      {
        id: 4073,
        amount: 35,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Milk, Eggs, Other Dairy",
        name: "margarine",
        original: "35 g margarine or butter",
        originalString: "35 g margarine or butter",
        originalName: "margarine or butter",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg",
      },
      {
        id: 8120,
        amount: 35,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Cereal",
        name: "rolled oats",
        original: "35 g rolled oats",
        originalString: "35 g rolled oats",
        originalName: "rolled oats",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg",
      },
      {
        id: 14412,
        amount: 1,
        unit: "Tbsp",
        unitLong: "Tbsp",
        unitShort: "Tbsp",
        aisle: "Beverages",
        name: "water",
        original: "1 Tbsp water",
        originalString: "1 Tbsp water",
        originalName: "water",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/water.png",
      },
      {
        id: 20080,
        amount: 35,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Baking",
        name: "wholemeal flour",
        original: "35 g wholemeal flour",
        originalString: "35 g wholemeal flour",
        originalName: "wholemeal flour",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
    ],
    usedIngredients: [
      {
        id: 9003,
        amount: 400,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Produce",
        name: "apples",
        original: "400 g cooking apples peeled cored and quartered",
        originalString: "400 g cooking apples peeled cored and quartered",
        originalName: "cooking apples peeled cored and quartered",
        metaInformation: ["cored", "peeled", "quartered"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      },
      {
        id: 19335,
        amount: 20,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Baking",
        name: "sugar",
        original: "20 g caster sugar",
        originalString: "20 g caster sugar",
        originalName: "caster sugar",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
      {
        id: 19335,
        amount: 50,
        unit: "g",
        unitLong: "grams",
        unitShort: "g",
        aisle: "Baking",
        name: "sugar",
        original: "50 g sugar to sweeten",
        originalString: "50 g sugar to sweeten",
        originalName: "sugar to sweeten",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
    ],
    unusedIngredients: [
      {
        id: 20081,
        amount: 1,
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
        aisle: "Baking",
        name: "flour",
        original: "flour",
        originalString: "flour",
        originalName: "flour",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
    ],
    likes: 965,
  },
  {
    id: 534573,
    title: "Brown Butter Apple Crumble",
    image: "https://spoonacular.com/recipeImages/534573-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 5,
    missedIngredients: [
      {
        id: 2010,
        amount: 0.5,
        unit: "tsp",
        unitLong: "teaspoons",
        unitShort: "tsp",
        aisle: "Spices and Seasonings",
        name: "cinnamon",
        original: "1/2 tsp cinnamon",
        originalString: "1/2 tsp cinnamon",
        originalName: "cinnamon",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
      },
      {
        id: 19334,
        amount: 0.25,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Baking",
        name: "light brown sugar",
        original: "1/4 cup light brown sugar",
        originalString: "1/4 cup light brown sugar",
        originalName: "light brown sugar",
        metaInformation: ["light"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/dark-brown-sugar.png",
      },
      {
        id: 8120,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Cereal",
        name: "oats",
        original: "1/2 cup uncooked oats (not instant)",
        originalString: "1/2 cup uncooked oats (not instant)",
        originalName: "uncooked oats (not instant)",
        metaInformation: ["uncooked", "(not instant)"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg",
      },
      {
        id: 2047,
        amount: 1,
        unit: "pinch",
        unitLong: "pinch",
        unitShort: "pinch",
        aisle: "Spices and Seasonings",
        name: "salt",
        original: "pinch salt",
        originalString: "pinch salt",
        originalName: "pinch salt",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
      },
      {
        id: 1001001,
        amount: 0.25,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Milk, Eggs, Other Dairy",
        name: "salted butter",
        original: "1/4 cup salted butter",
        originalString: "1/4 cup salted butter",
        originalName: "salted butter",
        metaInformation: ["salted"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/butter.jpg",
      },
    ],
    usedIngredients: [
      {
        id: 9003,
        amount: 4,
        unit: "",
        unitLong: "",
        unitShort: "",
        aisle: "Produce",
        name: "apples",
        original: "4 apples, peeled, cored and sliced",
        originalString: "4 apples, peeled, cored and sliced",
        originalName: "apples, peeled, cored and sliced",
        metaInformation: ["cored", "peeled", "sliced"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      },
      {
        id: 20081,
        amount: 0.25,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Baking",
        name: "flour",
        original: "1/4 cup all-purpose flour",
        originalString: "1/4 cup all-purpose flour",
        originalName: "all-purpose flour",
        metaInformation: ["all-purpose"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
      {
        id: 19335,
        amount: 2,
        unit: "tbsp",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
        aisle: "Baking",
        name: "sugar",
        original: "2 tbsp sugar",
        originalString: "2 tbsp sugar",
        originalName: "sugar",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
    ],
    unusedIngredients: [],
    likes: 7,
  },
];

const mockSimilarRecipes = [
  {
    id: 47950,
    title: "Cinnamon Apple Crisp",
    image: "https://spoonacular.com/recipeImages/47950-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 3,
    missedIngredients: [
      {
        id: 19334,
        amount: 0.75,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Baking",
        name: "brown sugar",
        original: "3/4 cup firmly packed brown sugar",
        originalString: "3/4 cup firmly packed brown sugar",
        originalName: "firmly packed brown sugar",
        metaInformation: ["packed"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/dark-brown-sugar.png",
      },
      {
        id: 93674,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Milk, Eggs, Other Dairy",
        name: "cinnamon sugar butter",
        original: "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread",
        originalString: "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread",
        originalName: "Land O Lakes® Cinnamon Sugar Butter Spread",
        metaInformation: ["lakes®"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/cinnamon-sugar-butter.png",
      },
      {
        id: 8120,
        amount: 0.75,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Cereal",
        name: "old-fashioned oats",
        original: "3/4 cup uncooked old-fashioned oats",
        originalString: "3/4 cup uncooked old-fashioned oats",
        originalName: "uncooked old-fashioned oats",
        metaInformation: ["uncooked"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg",
      },
    ],
    usedIngredients: [
      {
        id: 9003,
        amount: 6,
        unit: "cups",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Produce",
        name: "apples",
        original: "6 medium (6 cups) apples, peeled, cored, sliced",
        originalString: "6 medium (6 cups) apples, peeled, cored, sliced",
        originalName: "medium apples, peeled, cored, sliced",
        metaInformation: ["cored", "peeled", "sliced"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      },
      {
        id: 20081,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Baking",
        name: "flour",
        original: "1/2 cup all-purpose flour",
        originalString: "1/2 cup all-purpose flour",
        originalName: "all-purpose flour",
        metaInformation: ["all-purpose"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
    ],
    unusedIngredients: [
      {
        id: 19335,
        amount: 1,
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
        aisle: "Baking",
        name: "sugar",
        original: "sugar",
        originalString: "sugar",
        originalName: "sugar",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
    ],
    likes: 35,
  },
  {
    id: 556470,
    title: "Apple fritters",
    image: "https://spoonacular.com/recipeImages/556470-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 6,
    missedIngredients: [
      {
        id: 14003,
        amount: 2,
        unit: "tablespoons",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
        aisle: "Alcoholic Beverages",
        name: "beer",
        original: "2 tablespoons of lager beer",
        originalString: "2 tablespoons of lager beer",
        originalName: "lager beer",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/beer.jpg",
      },
      {
        id: 1123,
        amount: 1,
        unit: "",
        unitLong: "",
        unitShort: "",
        aisle: "Milk, Eggs, Other Dairy",
        name: "egg",
        original: "1 egg",
        originalString: "1 egg",
        originalName: "egg",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png",
      },
      {
        id: 1034053,
        amount: 1,
        unit: "tablespoon",
        unitLong: "tablespoon",
        unitShort: "Tbsp",
        aisle: "Oil, Vinegar, Salad Dressing",
        name: "extra virgin olive oil",
        original: "1 tablespoon of extra virgin olive oil",
        originalString: "1 tablespoon of extra virgin olive oil",
        originalName: "extra virgin olive oil",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
      },
      {
        id: 4042,
        amount: 2,
        unit: "servings",
        unitLong: "servings",
        unitShort: "servings",
        aisle: "Oil, Vinegar, Salad Dressing",
        name: "peanut oil",
        original: "peanut oil for frying",
        originalString: "peanut oil for frying",
        originalName: "peanut oil for frying",
        metaInformation: ["for frying"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/peanut-oil.jpg",
      },
      {
        id: 1059003,
        amount: 2,
        unit: "",
        unitLong: "",
        unitShort: "",
        aisle: "Produce",
        name: "red delicious apples",
        original: "2 Golden Delicious apples",
        originalString: "2 Golden Delicious apples",
        originalName: "Golden Delicious apples",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png",
      },
      {
        id: 2047,
        amount: 1,
        unit: "pinch",
        unitLong: "pinch",
        unitShort: "pinch",
        aisle: "Spices and Seasonings",
        name: "salt",
        original: "1 pinch of salt",
        originalString: "1 pinch of salt",
        originalName: "salt",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
      },
    ],
    usedIngredients: [
      {
        id: 20081,
        amount: 2,
        unit: "tablespoons",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
        aisle: "Baking",
        name: "flour",
        original: "2 tablespoons of flour",
        originalString: "2 tablespoons of flour",
        originalName: "flour",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
      {
        id: 19335,
        amount: 2,
        unit: "servings",
        unitLong: "servings",
        unitShort: "servings",
        aisle: "Baking",
        name: "sugar",
        original: "sugar to decorate",
        originalString: "sugar to decorate",
        originalName: "sugar to decorate",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
    ],
    unusedIngredients: [
      {
        id: 9003,
        amount: 1,
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
        aisle: "Produce",
        name: "apples",
        original: "apples",
        originalString: "apples",
        originalName: "apples",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      },
    ],
    likes: 243,
  },
  {
    id: 47732,
    title: "Apple Tart",
    image: "https://spoonacular.com/recipeImages/47732-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 1,
    missedIngredientCount: 7,
    missedIngredients: [
      {
        id: 2048,
        amount: 0.75,
        unit: "tsp",
        unitLong: "teaspoons",
        unitShort: "tsp",
        aisle: "Oil, Vinegar, Salad Dressing",
        name: "apple cider vinegar",
        original: "3/4 tsp apple cider vinegar",
        originalString: "3/4 tsp apple cider vinegar",
        originalName: "apple cider vinegar",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/apple-cider-vinegar.jpg",
      },
      {
        id: 1089003,
        amount: 2.5,
        unit: "lbs",
        unitLong: "pounds",
        unitShort: "lb",
        aisle: "Produce",
        name: "granny smith apples",
        original: "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
        originalString: "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)",
        originalName: "- 7 medium Granny Smith apples (about",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png",
      },
      {
        id: 14412,
        amount: 4,
        unit: "tbsp",
        unitLong: "tablespoons",
        unitShort: "Tbsp",
        aisle: "Beverages",
        name: "ice water",
        original: "4 tbsp ice water, plus more as needed",
        originalString: "4 tbsp ice water, plus more as needed",
        originalName: "ice water, plus more as needed",
        metaInformation: ["as needed", "plus more "],
        image: "https://spoonacular.com/cdn/ingredients_100x100/water.png",
      },
      {
        id: 2047,
        amount: 0.75,
        unit: "tsp",
        unitLong: "teaspoons",
        unitShort: "tsp",
        aisle: "Spices and Seasonings",
        name: "salt",
        original: "3/4 tsp salt",
        originalString: "3/4 tsp salt",
        originalName: "salt",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
      },
      {
        id: 10020081,
        amount: 1.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Baking",
        name: "unbleached flour",
        original: "1 1/2 cup unbleached all-purpose flour",
        originalString: "1 1/2 cup unbleached all-purpose flour",
        originalName: "unbleached all-purpose flour",
        metaInformation: ["all-purpose"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
      {
        id: 1145,
        amount: 4.5,
        unit: "oz",
        unitLong: "ounces",
        unitShort: "oz",
        aisle: "Milk, Eggs, Other Dairy",
        name: "unsalted butter",
        original: "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
        originalString:
          "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes",
        originalName: "tbsp cold unsalted butter, cut into cubes",
        metaInformation: ["unsalted", "cold", "cut into cubes"],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg",
      },
      {
        id: 14412,
        amount: 1,
        unit: "cup",
        unitLong: "cup",
        unitShort: "cup",
        aisle: "Beverages",
        name: "water",
        original: "1 cup water",
        originalString: "1 cup water",
        originalName: "water",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/water.png",
      },
    ],
    usedIngredients: [
      {
        id: 19335,
        amount: 1,
        unit: "tbsp",
        unitLong: "tablespoon",
        unitShort: "Tbsp",
        aisle: "Baking",
        name: "sugar",
        original: "1 tbsp sugar",
        originalString: "1 tbsp sugar",
        originalName: "sugar",
        metaInformation: [],
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/sugar-in-bowl.png",
      },
    ],
    unusedIngredients: [
      {
        id: 9003,
        amount: 1,
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
        aisle: "Produce",
        name: "apples",
        original: "apples",
        originalString: "apples",
        originalName: "apples",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
      },
      {
        id: 20081,
        amount: 1,
        unit: "serving",
        unitLong: "serving",
        unitShort: "serving",
        aisle: "Baking",
        name: "flour",
        original: "flour",
        originalString: "flour",
        originalName: "flour",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
      },
    ],
    likes: 0,
  },
];
