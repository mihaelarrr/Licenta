const CLARIFAI = {
  API_KEY: "d036fd83e7c2407699966e6bd5711c66",
};

const SPOONACULAR = {
  API_KEY: "97a47d661bmsh38533f7367f1d1cp1beac0jsna5d49aaf1039",
  URLS: {
    FIND_BY_INGREDIENTS:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false",
    FIND_SIMILAR:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes",
    FIND_BULK:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
  },
  get HEADERS() {
    return {
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": this.API_KEY,
    };
  },
};

export { CLARIFAI, SPOONACULAR };
