import React from "react";
import { Text } from "react-native";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
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
          <Text>{item?.drug}</Text>
          <TextInput
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
          <Button
            mode="contained"
            color="#065e92"
            onPress={async () => {
              await this.createMissingCheck();
              onDismiss();
            }}
          >
            Enregistrer
          </Button>
        </Modal>
      </Portal>
    );
  }
}
