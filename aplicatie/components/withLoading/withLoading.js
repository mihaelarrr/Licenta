import React, { PureComponent } from "react";
import { Spinner } from "native-base";

import styles from "./styles";

const withLoading = WrappedComponent => {
  return class Loading extends PureComponent {
    render() {
      if (this.props.loading) {
        return <Spinner style={styles.spinner} color="blue" />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoading;
