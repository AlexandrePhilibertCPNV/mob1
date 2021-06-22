import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { RootSiblingParent } from "react-native-root-siblings";
import { Portal, Provider } from "react-native-paper";

import Colors from "./constants/Colors";
import Navigation from "./navigation";
import { SplashScreen } from "./screens/SplashScreen";
import { UserContext } from "./contexts/UserContext";
import fetch, { withBearer } from "./utils/fetch";
import { WorkPlanContext } from "./contexts/WorkPlanContext";

export default class App extends React.Component {
  state: any = {
    user: {},
    workPlans: [],
    isLoading: true,
  };

  async componentDidMount() {
    const token = await SecureStore.getItemAsync("token");
    const initials = await AsyncStorage.getItem("initials");
    const currentBaseId = await AsyncStorage.getItem("currentBaseId");
    const currentBaseName = await AsyncStorage.getItem("currentBaseName");

    this.setState({
      user: {
        initials,
        token,
        currentBaseId: Number(currentBaseId),
        currentBaseName: currentBaseName,
      },
      isLoading: false,
    });

    this.getUnconfirmedWorkPlans();
  }

  async getUnconfirmedWorkPlans() {
    const { token }: any = this.state.user;

    const response = await fetch("/unconfirmedworkplans", {
      ...withBearer(token),
    });

    this.setState({
      workPlans: response.data,
    });
  }

  render() {
    const { user, workPlans, isLoading } = this.state;

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
          clear: async () => {
            this.setState({ user: {} });
            await SecureStore.deleteItemAsync("token");
          },
        }}
      >
        <WorkPlanContext.Provider
          value={{
            workPlans,
            setWorkPlans: (workPlans) => {
              this.setState({
                workPlans,
              });
            },
          }}
        >
          <SafeAreaProvider>
            <Provider>
              <Portal.Host>
                <RootSiblingParent>
                  <Navigation />
                  <StatusBar backgroundColor={Colors.light.primary} />
                </RootSiblingParent>
              </Portal.Host>
            </Provider>
          </SafeAreaProvider>
        </WorkPlanContext.Provider>
      </UserContext.Provider>
    );
  }
}
