import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List, Title } from "react-native-paper";
import fetch from "../utils/fetch";

type ReportDetails = {
  id: number;
  at: String;
  day: number;
  action: String;
};

interface ActionsScreenState {
  details: ReportDetails[];
}

export default class ActionsScreen extends React.Component<
  {},
  ActionsScreenState
> {
  state: ActionsScreenState = {
    details: [],
  };

  componentDidMount() {
    this.fetchReportDetails();
  }

  async fetchReportDetails() {
    const { report } = this.props.route.params;
    const { data } = await fetch(`/myactionsinshift/${report.id}`, {
      headers: {
        Authorization:
          "Bearer 14eTrlt8sbWSQQiNME7xkkXH0aQsheWmf2ySIwL6mQWn4vxdKkC5afRSddKM",
      },
    });

    this.setState({ details: data.data });
  }

  render() {
    const { details } = this.state;
    const { report } = this.props.route.params;

    return (
      <View>
        <Title style={styles.title}>
          Dans le rapport du {report.date} à {report.base}
        </Title>
        <ScrollView>
          {details.length === 0 && (
            <Text style={styles.empty}>
              Vous n'avez réaliser aucune action dans ce rapport
            </Text>
          )}
          {details.map(({ id, action, day, at }) => (
            <List.Item
              key={id}
              title={action}
              description={at}
              left={() => (
                <List.Icon
                  icon={day ? "white-balance-sunny" : "moon-waning-crescent"}
                />
              )}
            ></List.Item>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 12,
  },
  empty: {
    margin: 12,
  },
});
