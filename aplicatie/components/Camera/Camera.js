import React from "react";

import { Camera } from "expo-camera";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Container, Button, Text, Icon } from "native-base";

import styles from "./styles";

class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isTakingPhoto: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };

    this.switchCamera = this.switchCamera.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.onReceivePhoto = this.onReceivePhoto.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  switchCamera() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }

  takePicture() {
    this.setState({ isTakingPhoto: true }, () => {
      this.camera.takePictureAsync({ base64: true }).then(photo => {
        this.setState({ isTakingPhoto: false }, () => {
          if (Constants.isDevice) this.camera.pausePreview();

          this.onReceivePhoto(photo);
        });
      });
    });
  }

  onReceivePhoto({ base64 }) {
    this.props.navigation.navigate("SelectIngredients", { base64 });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Container />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Container style={styles.container}>
          <Camera
            style={styles.camera}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <Container style={styles.cameraactions}>
              <Button large transparent style={styles.button}>
                <Icon style={styles.icon} name="ios-square-outline" />
              </Button>
              <Button
                large
                transparent
                style={styles.button}
                onPress={this.takePicture}
              >
                <Icon style={styles.cameraicon} name="ios-camera" />
              </Button>
              <Button
                large
                transparent
                style={styles.button}
                onPress={this.switchCamera}
              >
                <Icon style={styles.icon} name="ios-reverse-camera" />
              </Button>
            </Container>
          </Camera>
        </Container>
      );
    }
  }
}

export default CameraScreen;
