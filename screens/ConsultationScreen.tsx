import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import { ScrollView } from "react-native-gesture-handler";
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
          contentContainerStyle={styles.chip}
          style={{ maxHeight: 80 }}
          snapToStart={true}
        >
          <View>
            <Chip
              title="Garde"
              onPress={(e) => {
                this.setState({ tab: "shift" });
              }}
              buttonStyle={[styles.chip, { backgroundColor: "#0a2ab8" }]}
            />
          </View>
          <View>
            <Chip
              title="Stupéfiants"
              onPress={(e) => {
                this.setState({ tab: "drug" });
              }}
              buttonStyle={styles.chip}
            />
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
              <Text key={report.id} style={styles.listItem}>
                Le {report.date} à {report.base}
              </Text>
            ))}
          {tab === "drug" &&
            reports.drug.map((report: DrugReport) => (
              <Text key={report.id} style={styles.listItem}>
                Semaine {report.week} à {report.base}
              </Text>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contentScrollView: {
    flex: 2,
    width: "100%",
  },
  listItem: {
    padding: 12,
  },
});
