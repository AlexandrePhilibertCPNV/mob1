import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

import {
  BottomTabParamList,
  TabConsultationParamList,
  TabReportParamList,
} from "../types";
import ConsultationScreen from "../screens/ConsultationScreen";
import ReportScreen from "../screens/ReportScreen";
import ActionsScreen from "../screens/ActionsScreen";
import { UserContext } from "../contexts/UserContext";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

class HeaderRight extends React.Component {
  static contextType = UserContext;

  render() {
    const { initials, currentBaseName } = this.context;

    return (
      <TouchableOpacity
        style={{ padding: 8 }}
        onPress={() => {
          this.context.clear();
        }}
      >
        <Text>
          Déconnexion - {currentBaseName} - {initials}
        </Text>
      </TouchableOpacity>
    );
  }
}

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
              <TabBarIcon name="reader" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="TabReport"
          component={ReportNavigator}
          options={{
            title: "Rapporter",
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
  static contextType = UserContext;

  render() {
    const { initials } = this.context;

    return (
      <TabConsultationStack.Navigator>
        <TabConsultationStack.Screen
          name="ConsultationScreen"
          component={ConsultationScreen}
          options={{
            headerTitle: "Consultation",
            headerRight: () => <HeaderRight />,
          }}
        />
        <TabConsultationStack.Screen name="Actions" component={ActionsScreen} />
      </TabConsultationStack.Navigator>
    );
  }
}

const ReportStack = createStackNavigator<TabReportParamList>();

class ReportNavigator extends React.Component {
  render() {
    return (
      <ReportStack.Navigator>
        <ReportStack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{
            headerTitle: "Rapporter",
            headerRight: () => <HeaderRight />,
          }}
        />
      </ReportStack.Navigator>
    );
  }
}
