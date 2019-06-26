const isFavouriteRecipe = (recipe, favouriteRecipes) => {
  return favouriteRecipes.some(({ id }) => id === recipe.id);
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export { isFavouriteRecipe, arrayToObject };
