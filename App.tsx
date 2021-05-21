import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import Colors from "./constants/Colors";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextValue {
  initials?: string;
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

    this.setState({
      user: {
        initials,
        token,
      },
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <UserContext.Provider value={user}>
        <SafeAreaProvider>
          {isLoading ? null : <Navigation />}
          <StatusBar backgroundColor={Colors.light.primary} />
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
