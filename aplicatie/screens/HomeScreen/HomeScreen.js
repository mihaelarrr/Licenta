import React from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Right,
  Segment,
  Text,
  Title,
} from "native-base";

import { StoreContext } from "../../store";
import Placeholder from "../../components/Placeholder/Placeholder";
import RecipeList from "../../components/RecipeList/RecipeList";

import styles from "./styles";

class HomeScreen extends React.Component {
  static contextType = StoreContext;
  static navigationOptions = {
    title: "HomeScreen",
  };

  constructor(props) {
    super(props);

    this.onRecipePress = this.onRecipePress.bind(this);
    this.goToCamera = this.goToCamera.bind(this);
  }

  onRecipePress(recipe) {
    this.props.navigation.navigate("Recipe", { recipe });
  }

  goToCamera() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    const { similarRecipes, favouriteRecipes, onFavouritePress } = this.context;

    return (
      <Container>
        <Header hasSegment style={styles.header}>
          <Left>
            <Button transparent onPress={this.goToCamera}>
              <Icon name="camera" />
            </Button>
          </Left>
          <Body>
            <Title>Segments</Title>
          </Body>
          <Right />
        </Header>
        <Segment>
          <Button first active>
            <Text>For You</Text>
          </Button>
          <Button>
            <Text>Top Charts</Text>
          </Button>
          <Button last>
            <Text>Categories</Text>
          </Button>
        </Segment>
        {!similarRecipes.length ? (
          <Placeholder text="Add recipes to favourite in order for us to offer you personalized suggestions." />
        ) : (
          <Content padder>
            <RecipeList
              recipes={similarRecipes}
              favouriteRecipes={favouriteRecipes}
              onRecipePress={this.onRecipePress}
              onFavouritePress={onFavouritePress}
            />
          </Content>
        )}
      </Container>
    );
  }
}

export default HomeScreen;
