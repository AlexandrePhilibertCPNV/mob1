import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import { ScrollView } from "react-native-gesture-handler";
import { ShiftReport } from "../types/shiftReport";
import fetch from "../utils/fetch";

interface ConsultationScreenState {
  reports: {
    shift: ShiftReport[];
  };
}

export default class ConsultationScreen extends React.Component<
  {},
  ConsultationScreenState
> {
  state: ConsultationScreenState = {
    reports: {
      shift: [],
    },
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
    const { reports } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.chip}
          snapToStart={true}
        >
          <View>
            <Chip
              title="Garde"
              onPress={(e) => {}}
              buttonStyle={[styles.chip, { backgroundColor: "#0a2ab8" }]}
            />
          </View>
          <View>
            <Chip
              title="Stupéfiants"
              onPress={(e) => {}}
              buttonStyle={styles.chip}
            />
          </View>
        </ScrollView>
        <ScrollView style={styles.contentScrollView}>
          {reports.shift.map((report: ShiftReport) => (
            <Text key={report.id}>
              Le {report.date} à {report.base}
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
    flex: 1,
    width: "100%",
  },
});
