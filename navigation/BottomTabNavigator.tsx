import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import ConsultationScreen from "../screens/ConsultationScreen";
import ReportSreen from "../screens/ReportScreen";
import {
  BottomTabParamList,
  TabConsultationParamList,
  TabTwoParamList as ReportParamList,
} from "../types";
import { TouchableNativeFeedback } from "react-native";
import { UserContext } from "../App";

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
              <TabBarIcon name="reader" color={color} />
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
  static contextType = UserContext;

  render() {
    return (
      <TabConsultationStack.Navigator>
        <TabConsultationStack.Screen
          name="ConsultationScreen"
          component={ConsultationScreen}
          options={{
            headerTitle: "Consultation",
            headerRight: () => (
              <Ionicons
                name="ellipsis-vertical-sharp"
                size={16}
                style={{ padding: 12 }}
                onPress={() => {}}
              />
            ),
          }}
        />
      </TabConsultationStack.Navigator>
    );
  }
}

const ReportStack = createStackNavigator<ReportParamList>();

class TabTwoNavigator extends React.Component {
  render() {
    return (
      <ReportStack.Navigator>
        <ReportStack.Screen
          name="ReportScreen"
          component={ReportSreen}
          options={{ headerTitle: "Rapporter" }}
        />
      </ReportStack.Navigator>
    );
  }
}
