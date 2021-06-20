import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface NetInfoWrapperState {
  unsubscribe: NetInfoSubscription;
  isConnected: boolean;
}

export class NetInfoWrapper extends React.Component<{}, NetInfoWrapperState> {
  state = {
    isConnected: true,
    unsubscribe: () => {},
  };

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener((state) => {
      this.setState({
        isConnected: state.isConnected ?? false,
      });
    });

    this.setState({
      unsubscribe,
    });
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state;

    unsubscribe();
  }

  render() {
    const { children } = this.props;
    const { isConnected } = this.state;

    if (isConnected) {
      return children;
    }

    return (
      <View style={styles.container}>
        <Ionicons name="wifi" size={60} />
        <Text style={styles.text}>Vous n'avez pas de réseau</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
