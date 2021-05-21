/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import ConsultationScreen from "../screens/ConsultationScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  BottomTabParamList,
  TabConsultationParamList,
  TabTwoParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default class BottomTabNavigator extends React.Component {
  render() {
    return (
      <BottomTab.Navigator initialRouteName="TabConsultation">
        <BottomTab.Screen
          name="TabConsultation"
          component={TabConsultationNavigator}
          options={{
            title: "Consultation",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

interface TabBarIconProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}

class TabBarIcon extends React.Component<TabBarIconProps> {
  render() {
    return <Ionicons size={30} {...this.props} />;
  }
}

const TabConsultationStack = createStackNavigator<TabConsultationParamList>();

class TabConsultationNavigator extends React.Component {
  render() {
    return (
      <TabConsultationStack.Navigator>
        <TabConsultationStack.Screen
          name="ConsultationScreen"
          component={ConsultationScreen}
          options={{ headerTitle: "Consultation" }}
        />
      </TabConsultationStack.Navigator>
    );
  }
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

class TabTwoNavigator extends React.Component {
  render() {
    return (
      <TabTwoStack.Navigator>
        <TabTwoStack.Screen
          name="TabTwoScreen"
          component={TabTwoScreen}
          options={{ headerTitle: "Tab Two Title" }}
        />
      </TabTwoStack.Navigator>
    );
  }
}
