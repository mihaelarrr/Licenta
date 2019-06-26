import React, { Component } from "react";
import { Image } from "react-native";
import {
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Button,
  Icon,
} from "native-base";

import styles from "./styles";

class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.normalizeImageUrl = this.normalizeImageUrl.bind(this);
  }

  normalizeImageUrl(url) {
    if (url.includes("https://")) {
      return url;
    }

    return `https://spoonacular.com/recipeImages/${url}`;
  }

  render() {
    const { recipe, isFavourite, onFavouritePress, onRecipePress } = this.props;

    const image = this.normalizeImageUrl(recipe.image);
    const favouriteIconStyles = isFavourite
      ? [styles.icon, styles.favourite]
      : styles.icon;
    const favouriteIconName = isFavourite ? "ios-heart" : "ios-heart-empty";

    return (
      <Card>
        <CardItem button onPress={() => onRecipePress(recipe)}>
          <Left>
            <Thumbnail source={{ uri: image }} />
            <Body>
              <Text>{recipe.title}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={() => onRecipePress(recipe)}>
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>

        <CardItem>
          <Left transparent>
            <Button transparent>
              <Icon name="ios-thumbs-up" style={styles.icon} />
              <Text>{recipe.likes}</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent style={styles.shareButton}>
              <Icon name="ios-share-alt" style={styles.icon} />
              <Text>Share</Text>
            </Button>
          </Body>
          <Right style={styles.section}>
            <Button
              transparent
              style={styles.favouriteButton}
              onPress={() => onFavouritePress(recipe)}
            >
              <Icon name={favouriteIconName} style={favouriteIconStyles} />
              <Text>Favourite</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default RecipeCard;
