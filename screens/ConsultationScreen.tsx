import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, List } from "react-native-paper";
import { ShiftReport } from "../types/shiftReport";
import { DrugReport } from "../types/drugReport";
import fetch from "../utils/fetch";

interface ConsultationScreenState {
  reports: {
    shift: ShiftReport[];
    drug: DrugReport[];
  };
  tab: "shift" | "drug";
}

export default class ConsultationScreen extends React.Component<
  {},
  ConsultationScreenState
> {
  state: ConsultationScreenState = {
    reports: {
      shift: [],
      drug: [],
    },
    tab: "shift",
  };

  componentDidMount() {
    this.fetchReports();
  }

  async fetchReports() {
    const response = await fetch("/reports", {
      headers: {
        Authorization:
          "Bearer 14eTrlt8sbWSQQiNME7xkkXH0aQsheWmf2ySIwL6mQWn4vxdKkC5afRSddKM",
      },
    });

    if (response.status === 200) {
      const reports = response.data;
      this.setState({ reports });
    }
  }

  render() {
    const { tab, reports } = this.state;

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
              selected={tab === "shift"}
              onPress={() => {
                this.setState({ tab: "shift" });
              }}
            >
              Garde
            </Chip>
          </View>
          <View>
            <Chip
              style={styles.chip}
              textStyle={{ padding: 4 }}
              selected={tab === "drug"}
              onPress={() => {
                this.setState({ tab: "drug" });
              }}
            >
              Stupéfiants
            </Chip>
          </View>
        </ScrollView>
        <ScrollView
          style={styles.contentScrollView}
          contentContainerStyle={{
            flex: 2,
          }}
        >
          {tab === "shift" &&
            reports.shift.map((report: ShiftReport) => (
              <List.Item
                key={report.id}
                title={`Le ${report.date} à ${report.base}`}
                onPress={() => {}}
              />
            ))}
          {tab === "drug" &&
            reports.drug.map((report: DrugReport) => (
              <List.Item
                key={report.id}
                title={` Semaine ${report.week} à ${report.base}`}
                onPress={() => {}}
              />
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
  contentScrollView: {
    flex: 2,
    width: "100%",
  },
});
