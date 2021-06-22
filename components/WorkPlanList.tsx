import { format } from "date-fns";
import { frCH } from "date-fns/locale";
import React from "react";
import { Text, View } from "react-native";
import { List } from "react-native-paper";

/**
 * Get the user-readable text corresponding to the give workPlan status
 *
 * @param {WorkPlan} workPlan
 * @return {string}
 */
function getWorkplanStatusText(workPlan: WorkPlan) {
  if (workPlan.confirmation == 0) {
    return "A discuter";
  }
  if (workPlan.confirmation == 1) {
    return "Confirmé";
  }
  if (workPlan.confirmation == null) {
    return "Inconnu";
  }
}

interface WorkPlanListProps {
  workPlans: WorkPlan[];
  onItemClick: (workPlan: WorkPlan) => void;
}

export class WorkPlanList extends React.Component<WorkPlanListProps> {
  render() {
    const { workPlans, onItemClick } = this.props;
    return (
      <>
        {workPlans?.length === 0 && (
          <Text style={{ padding: 12 }}>
            Vous avez confirmé tous vos horaires
          </Text>
        )}
        {workPlans?.map((item: WorkPlan, i) => (
          <List.Item
            key={i}
            title={`${item.worktime.type} ${format(
              new Date(item.date),
              "'le' d MMMM",
              {
                locale: frCH,
              }
            )}`}
            description={
              <View>
                <Text>status: {getWorkplanStatusText(item)}</Text>
                {item.reason && <Text>raison: {item.reason}</Text>}
              </View>
            }
            onPress={() => onItemClick(item)}
          ></List.Item>
        ))}
      </>
    );
  }
}
