import { format } from "date-fns";
import { frCH } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import { UserContext } from "../contexts/UserContext";

interface UpdateWorkPlanProps {
  item: WorkPlan | null;
  onDismiss: () => void;
}

interface UpdateWorkPlanModalState {
  item: WorkPlan | null;
}

export class UpdateWorkPlanModal extends React.Component<
  UpdateWorkPlanProps,
  UpdateWorkPlanModalState
> {
  static contextType = UserContext;

  componentDidMount() {
    const { item } = this.props;

    this.setState({
      item,
    });
  }

  render() {
    const { item, onDismiss } = this.props;

    if (!item) {
      return <></>;
    }

    return (
      <Portal>
        <Modal
          visible={!!item}
          style={{ margin: 20 }}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          onDismiss={onDismiss}
        >
          <Text style={styles.title}>
            {item?.worktime.type}
            {format(new Date(item?.date as string), "'le' d MMMM", {
              locale: frCH,
            })}
          </Text>
          <View style={styles.actions}>
            <Button mode="contained" color="#dbd8d8" onPress={onDismiss}>
              Annuler
            </Button>
            <Button mode="contained" color="#065e92">
              Enregistrer
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
