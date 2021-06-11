import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { RootSiblingParent } from "react-native-root-siblings";

import Colors from "./constants/Colors";
import Navigation from "./navigation";
import { SplashScreen } from "./screens/SplashScreen";
import { UserContext } from "./contexts/userContext";

export default class App extends React.Component {
  state = {
    user: {},
    isLoading: true,
  };

  async componentDidMount() {
    const token = await SecureStore.getItemAsync("token");
    const initials = await AsyncStorage.getItem("initials");
    const currentBaseId = await AsyncStorage.getItem("currentBaseId");

    this.setState({
      user: {
        initials,
        token,
        currentBaseId: Number(currentBaseId),
      },
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <SplashScreen />;
    }

    return (
      <UserContext.Provider
        value={{
          ...user,
          setUser: (newUser) => {
            this.setState({ user: newUser });
          },
          clear: () => {
            this.setState({ user: {} });
          },
        }}
      >
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation />
            <StatusBar backgroundColor={Colors.light.primary} />
          </RootSiblingParent>
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
