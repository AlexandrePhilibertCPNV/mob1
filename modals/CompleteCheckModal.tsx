import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { UserContext } from "../contexts/UserContext";
import { createNovaCheck } from "../requests/createNovaCheck";
import { createPharmaCheck } from "../requests/createPharmaCheck";

interface CompleteCheckModalProps {
  type: "novacheck" | "pharmacheck";
  item: NovaCheck | PharmaCheck | null;
  onDismiss: () => void;
}

interface CompleteCheckModalState {
  item: NovaCheck | PharmaCheck | null;
}

export class CompleteCheckModal extends React.Component<
  CompleteCheckModalProps,
  CompleteCheckModalState
> {
  static contextType = UserContext;

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

  async createMissingCheck() {
    const { type } = this.props;
    const { item } = this.state;
    const { token } = this.context;

    if (type === "novacheck") {
      createNovaCheck(item as NovaCheck, token);
    } else if (type === "pharmacheck") {
      createPharmaCheck(item as PharmaCheck, token);
    }
  }

  validateInputs() {
    const { item } = this.state;

    if (!/^[0-9]+$/.test(`${item?.start}`)) {
      Toast.show("La quantité du matin n'est pas valide", {
        duration: Toast.durations.LONG,
      });

      return false;
    }

    if (!/^[0-9]+$/.test(`${item?.end}`)) {
      Toast.show("La quantité du soir n'est pas valide", {
        duration: Toast.durations.LONG,
      });

      return false;
    }

    return true;
  }

  async submit() {
    const { onDismiss } = this.props;

    if (this.validateInputs()) {
      await this.createMissingCheck();
      onDismiss();
    }
  }

  render() {
    const { item, onDismiss } = this.props;

    return (
      <Portal>
        <Modal
          visible={!!item}
          style={{ margin: 20 }}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          onDismiss={onDismiss}
        >
          <Text style={styles.title}>{item?.drug}</Text>
          <TextInput
            style={styles.textInput}
            label="Matin"
            keyboardType="numeric"
            value={item?.start?.toString()}
            onChangeText={(value) => {
              this.setState({
                item: {
                  ...item,
                  start: Number(value),
                } as any,
              });
            }}
          />
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            underlineColor="#065e92"
            label="Soir"
            value={item?.end?.toString()}
            onChangeText={(value) => {
              this.setState({
                item: {
                  ...item,
                  end: Number(value),
                } as any,
              });
            }}
          />
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
  textInput: {
    marginVertical: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
