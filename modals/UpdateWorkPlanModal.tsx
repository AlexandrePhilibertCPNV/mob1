import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { frCH } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";
import { UserContext } from "../contexts/UserContext";
import { WorkPlanContext } from "../contexts/WorkPlanContext";
import { confirmWorkPlan } from "../requests/confirmWorkPlan";
import { getUnconfirmedWorkPlans } from "../requests/getUnconfirmedWorkPlans";

interface UpdateWorkPlanProps {
  item: WorkPlan | null;
  onDismiss: () => void;
}

interface UpdateWorkPlanModalState {
  item: WorkPlan | null;
  reason: string | null;
}

export class UpdateWorkPlanModal extends React.Component<
  UpdateWorkPlanProps,
  UpdateWorkPlanModalState
> {
  static contextType = WorkPlanContext;

  state: UpdateWorkPlanModalState = {
    item: null,
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
    });
  }

  validate() {
    const { item } = this.state;

    // When the confirmation is 0 (to discuss), a reason must be given
    if (item?.confirmation == 0) {
      if (!item?.reason) {
        Toast.show("Une raison doit être donnée", {
          duration: Toast.durations.LONG,
        });

        return false;
      }

      if (item.reason.length < 10) {
        Toast.show(
          "La raison doit être suppérieure ou égale à 10 charactères",
          {
            duration: Toast.durations.LONG,
          }
        );

        return false;
      }

      if (item.reason.length > 50) {
        Toast.show("La raison doit être inférieure ou égale à 50 charactères", {
          duration: Toast.durations.LONG,
        });

        return false;
      }
    }

    return true;
  }

  async submit(token: string) {
    const { onDismiss } = this.props;
    const { item } = this.state;

    if (this.validate()) {
      const response = await confirmWorkPlan(item!, token);

      if (response.status === 200) {
        const { data: workPlans } = await getUnconfirmedWorkPlans(token);
        this.context.setWorkPlans(workPlans);

        onDismiss();
      } else {
        Toast.show("Une erreur est survenue. Veuillez réessayer.", {
          duration: Toast.durations.LONG,
        });
      }
    }
  }

  render() {
    const { onDismiss } = this.props;
    const { item } = this.state;

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
            {item.worktime.type}{" "}
            {format(new Date(item?.date as string), "'le' d MMMM", {
              locale: frCH,
            })}
          </Text>
          <Picker
            onValueChange={(confirmation: any) => {
              this.setState({
                item: {
                  ...item,
                  reason: null,
                  confirmation,
                },
              });
            }}
            selectedValue={item.confirmation}
            mode="dialog"
          >
            <Picker.Item key={null} label="Inconnu" value={null} />
            <Picker.Item key={0} label="A discuter" value={0} />
            <Picker.Item key={1} label="Confirmé" value={1} />
          </Picker>
          {item.confirmation == 0 && (
            <TextInput
              label="raison"
              multiline={true}
              onChangeText={(reason) => {
                this.setState({
                  item: {
                    ...item,
                    reason,
                  },
                });
              }}
            />
          )}
          <View style={styles.actions}>
            <Button mode="contained" color="#dbd8d8" onPress={onDismiss}>
              Annuler
            </Button>
            <UserContext.Consumer>
              {({ token }) => (
                <Button
                  mode="contained"
                  color="#065e92"
                  onPress={() => this.submit(token)}
                  disabled={item.confirmation == null}
                >
                  Enregistrer
                </Button>
              )}
            </UserContext.Consumer>
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
