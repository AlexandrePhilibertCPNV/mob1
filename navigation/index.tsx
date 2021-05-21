import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import * as SecureStore from "expo-secure-store";

import { SignInScreen } from "../screens/SignInScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

const Stack = createStackNavigator<RootStackParamList>();

interface RootNavigatorState {
  token: string | null;
}

class RootNavigator extends React.Component<{}, RootNavigatorState> {
  state = {
    token: null,
  };

  componentDidMount() {
    this.getSecureStoreUser();
  }

  async getSecureStoreUser() {
    const token = await SecureStore.getItemAsync("token");

    this.setState({ token });
  }

  render() {
    const { token } = this.state;

    return token ? (
      <BottomTabNavigator />
    ) : (
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    );
  }
}
