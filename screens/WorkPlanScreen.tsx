import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NetInfoWrapper } from "../components/NetInfoWrapper";
import { WorkPlanList } from "../components/WorkPlanList";
import { WorkPlanContext } from "../contexts/WorkPlanContext";
import { UpdateWorkPlanModal } from "../modals/UpdateWorkPlanModal";

interface WorkPlanScreenState {
  selectedItem: WorkPlan | null;
}
export default class WorkPlanScreen extends React.Component<
  {},
  WorkPlanScreenState
> {
  static contextType = WorkPlanContext;

  state: WorkPlanScreenState = {
    selectedItem: null,
  };

  render() {
    const { workPlans } = this.context;
    const { selectedItem } = this.state;

    return (
      <View style={styles.container}>
        <NetInfoWrapper>
          {selectedItem && (
            <UpdateWorkPlanModal
              item={selectedItem}
              onDismiss={() => {
                this.setState({ selectedItem: null });
              }}
            />
          )}
          <ScrollView>
            <WorkPlanList
              workPlans={workPlans}
              onItemClick={(item) => {
                this.setState({
                  selectedItem: item,
                });
              }}
            />
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
