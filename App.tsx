import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import Colors from "./constants/Colors";
import Navigation from "./navigation";
import { SplashScreen } from "./screens/SplashScreen";

interface UserContextValue {
  initials?: string;
  token?: string;
}

export const UserContext = React.createContext<UserContextValue | null>({});

export default class App extends React.Component {
  state = {
    user: null,
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
        currentBaseId,
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
      <UserContext.Provider value={user}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar backgroundColor={Colors.light.primary} />
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
