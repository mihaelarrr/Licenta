import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
} from "native-base";
import Clarifai from "clarifai";

import { CLARIFAI } from "../../constants/Config";
import IngredientList from "../../components/IngredientList/IngredientList";

import styles from "./styles";

const clarifaiApp = new Clarifai.App({
  apiKey: CLARIFAI.API_KEY,
});

class IngredientsScreen extends Component {
  static navigationOptions = {
    title: "IngredientsScreen",
  };

  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      loading: true,
    };

    this.onCancelPress = this.onCancelPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.onGetRecipesPress = this.onGetRecipesPress.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  getIngredients() {
    // TODO: Live API
    // const { navigation } = this.props;
    // const base64 = navigation.getParam("base64", "");

    // clarifaiApp.models.predict(Clarifai.FOOD_MODEL, { base64 }).then(
    //   res => {
    //     this.setState({
    //       ingredients: res.outputs[0].data.concepts,
    //       loading: false,
    //     });
    //   },
    //   err => {
    //     console.error("Clarifai error: ", err);
    //   }
    // );

    setTimeout(() => {
      this.setState({ ingredients: mock, loading: false });
    }, 1000);
  }

  onGetRecipesPress(selectedIngredients) {
    this.props.navigation.navigate("Recipes", {
      selectedIngredients,
    });
  }

  onCancelPress() {
    this.props.navigation.navigate("HomeTab");
  }

  onBackPress() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    const { loading, ingredients } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Ingredients</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onCancelPress}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <IngredientList
          loading={loading}
          ingredients={ingredients}
          onGetRecipesPress={this.onGetRecipesPress}
        />
      </Container>
    );
  }
}

export default IngredientsScreen;

const mock = [
  {
    app_id: "main",
    id: "ai_mPjqBnPk",
    name: "carrot",
    value: 0.9588791,
  },
  {
    app_id: "main",
    id: "ai_69JKJjSz",
    name: "fish",
    value: 0.91105163,
  },
  {
    app_id: "main",
    id: "ai_KWmFf1fn",
    name: "meat",
    value: 0.8994168,
  },
  {
    app_id: "main",
    id: "ai_G58V132Z",
    name: "water",
    value: 0.8488873,
  },
  {
    app_id: "main",
    id: "ai_rpDBJsjW",
    name: "pasture",
    value: 0.7699478,
  },
  {
    app_id: "main",
    id: "ai_TRbv6FWL",
    name: "pork",
    value: 0.61447525,
  },
  {
    app_id: "main",
    id: "ai_Ms5PWPWV",
    name: "bratwurst",
    value: 0.57519543,
  },
  {
    app_id: "main",
    id: "ai_jsmJGj7n",
    name: "lobster",
    value: 0.47111982,
  },
  {
    app_id: "main",
    id: "ai_XVpwLB09",
    name: "beef",
    value: 0.43059027,
  },
  {
    app_id: "main",
    id: "ai_DS1S9Rxq",
    name: "shrimp",
    value: 0.40698668,
  },
];
