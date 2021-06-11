import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React from "react";

import { SignInScreen } from "../screens/SignInScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { UserContext } from "../contexts/UserContext";

export default class Navigation extends React.Component {
  static contextType = UserContext;

  render() {
    const { token } = this.context;

    return (
      <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
        {token ? <BottomTabNavigator /> : <SignInScreen />}
      </NavigationContainer>
    );
  }
}
