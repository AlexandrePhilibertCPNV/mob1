import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "./constants/Colors";

import Navigation from "./navigation";

export const UserContext = React.createContext({});

export default class App extends React.Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem("user");

    console.log(user);

    this.setState({
      user,
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar backgroundColor={Colors.light.primary} />
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
