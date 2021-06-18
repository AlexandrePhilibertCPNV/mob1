import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserContext } from "../contexts/UserContext";
import { getReports } from "../requests/getReports";

interface ConsultationScreenState {
  reports: {
    shift: ShiftReport[];
    drug: DrugReport[];
  };
  tab: "shift" | "drug";
}

export default class ConsultationScreen extends React.Component<
  { navigation: StackNavigationProp<{ Actions: { report: ShiftReport } }> },
  ConsultationScreenState
> {
  state: ConsultationScreenState = {
    reports: {
      shift: [],
      drug: [],
    },
    tab: "shift",
  };

  static contextType = UserContext;

  componentDidMount() {
    this.fetchReports();
  }

  async fetchReports() {
    const { token } = this.context;

    const response = await getReports(token);

    if (response.status === 200) {
      const reports = response.data;
      this.setState({ reports });
    }
  }

  render() {
    const { tab, reports } = this.state;
    const { navigation } = this.props;

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
                onPress={() => {
                  navigation.navigate("Actions", {
                    report,
                  });
                }}
              />
            ))}
          {tab === "drug" &&
            reports.drug.map((report: DrugReport) => (
              <List.Item
                key={report.id}
                title={`Semaine ${report.week} à ${report.base}`}
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
