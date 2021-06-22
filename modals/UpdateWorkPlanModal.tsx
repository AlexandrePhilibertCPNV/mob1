import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { frCH } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";
import { UserContext } from "../contexts/UserContext";
import { confirmWorkPlan } from "../requests/confirmWorkPlan";

interface UpdateWorkPlanProps {
  item: WorkPlan | null;
  onDismiss: () => void;
}

interface UpdateWorkPlanModalState {
  item: WorkPlan | null;
  confirmed: 0 | 1 | null;
  reason: string | null;
}

export class UpdateWorkPlanModal extends React.Component<
  UpdateWorkPlanProps,
  UpdateWorkPlanModalState
> {
  static contextType = UserContext;

  state: UpdateWorkPlanModalState = {
    item: null,
    confirmed: null,
    reason: null,
  };

  constructor(props: any) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { item } = this.props;

    this.setState({
      item,
      confirmed: item?.confirmation ?? null,
    });
  }

  async submit() {
    const { item } = this.state;
    const { token } = this.context;

    const response = await confirmWorkPlan(item!, token);
  }

  render() {
    const { item, onDismiss } = this.props;
    const { confirmed } = this.state;

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
            {item?.worktime.type}{" "}
            {format(new Date(item?.date as string), "'le' d MMMM", {
              locale: frCH,
            })}
          </Text>
          <Picker
            onValueChange={(confirmed: any) => {
              this.setState({
                confirmed,
                reason: null,
              });
            }}
            selectedValue={confirmed}
            mode="dialog"
          >
            <Picker.Item key={null} label="Inconnu" value={null} />
            <Picker.Item key={0} label="A discuter" value={0} />
            <Picker.Item key={1} label="Confirmé" value={1} />
          </Picker>
          {confirmed == 0 && <TextInput label="raison" multiline={true} />}
          <View style={styles.actions}>
            <Button mode="contained" color="#dbd8d8" onPress={onDismiss}>
              Annuler
            </Button>
            <Button mode="contained" color="#065e92" onPress={this.submit}>
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
