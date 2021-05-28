import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip, List } from "react-native-paper";
import { UserContext } from "../App";
import fetch from "../utils/fetch";

type PharmaCheck = {
  id: number;
  date: string;
  start: number;
  end: number | null;
  batch_id: number;
  drugsheet_id: number;
  drug: string;
  batch_number: string;
};

interface ReportScreenState {
  pharma: PharmaCheck[];
  tab: "pharmacheck" | "novacheck";
}
export default class ReportSreen extends React.Component<
  {},
  ReportScreenState
> {
  state: ReportScreenState = {
    pharma: [],
    tab: "pharmacheck",
  };

  static contextType = UserContext;

  componentDidMount() {
    this.fetchMissingChecks();
  }

  async fetchMissingChecks() {
    const { currentBaseId: baseId } = this.context;
    const { data } = await fetch(`/missingchecks/${baseId}`, {
      headers: {
        Authorization:
          "Bearer 14eTrlt8sbWSQQiNME7xkkXH0aQsheWmf2ySIwL6mQWn4vxdKkC5afRSddKM",
      },
    });

    this.setState({
      pharma: data.pharma,
    });
  }

  render() {
    const { pharma, tab } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ padding: 12 }}
          style={{ flexGrow: 0 }}
          snapToStart={true}
        >
          <View>
            <Chip
              style={styles.chip}
              textStyle={{ padding: 4 }}
              selected={tab === "pharmacheck"}
              onPress={() => {
                this.setState({ tab: "pharmacheck" });
              }}
            >
              Pharmacheck
            </Chip>
          </View>
          <View>
            <Chip
              style={styles.chip}
              textStyle={{ padding: 4 }}
              selected={tab === "novacheck"}
              onPress={() => {
                this.setState({ tab: "novacheck" });
              }}
            >
              Novacheck
            </Chip>
          </View>
        </ScrollView>
        <ScrollView>
          {pharma.map((item) => (
            <List.Item title={item.drug} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  chip: {
    marginRight: 8,
    borderRadius: 50,
  },
});
