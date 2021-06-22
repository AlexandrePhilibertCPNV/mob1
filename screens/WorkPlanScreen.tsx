import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NetInfoWrapper } from "../components/NetInfoWrapper";
import { WorkPlanList } from "../components/WorkPlanList";
import { WorkPlanContext } from "../contexts/WorkPlanContext";

export default class WorkPlanScreen extends React.Component {
  static contextType = WorkPlanContext;

  render() {
    const { workPlans } = this.context;
    return (
      <View style={styles.container}>
        <NetInfoWrapper>
          <ScrollView>
            <WorkPlanList workPlans={workPlans} onItemClick={() => {}} />
          </ScrollView>
        </NetInfoWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
});
