import format from "date-fns/format";
import { frCH } from "date-fns/locale";
import _ from "lodash";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, List } from "react-native-paper";

import { UserContext } from "../contexts/UserContext";
import { PharmaCheck } from "../types/PharmaCheck";
import { NovaCheck } from "../types/NovaCheck";
import { normalizeDateString } from "../utils/date";
import fetch, { withBearer } from "../utils/fetch";

interface ReportScreenState {
  pharma: any;
  nova: NovaCheck[];
  tab: "pharmacheck" | "novacheck";
}
export default class ReportScreen extends React.Component<
  {},
  ReportScreenState
> {
  state: ReportScreenState = {
    pharma: [],
    nova: [],
    tab: "pharmacheck",
  };

  static contextType = UserContext;

  componentDidMount() {
    this.fetchMissingChecks();
  }

  async fetchMissingChecks() {
    const { currentBaseId: baseId, token } = this.context;
    const { data } = await fetch<{
      pharma: PharmaCheck[];
      nova: NovaCheck[];
    }>(`/missingchecks/${baseId}`, withBearer(token));

    const pharma = data.pharma.map((item) => {
      item.date = new Date(normalizeDateString(item.date as string));

      return item;
    });

    this.setState({
      nova: data.nova,
      pharma: Object.values(_.groupBy(pharma, (item) => item.date)),
    });
  }

  render() {
    const { pharma, nova, tab } = this.state;

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
          {tab === "pharmacheck" &&
            pharma.map((dateGroup: PharmaCheck[], i: string) => (
              <List.Section
                key={i}
                title={format(dateGroup[0].date as Date, "'le' i MMMM", {
                  locale: frCH,
                })}
              >
                {dateGroup.map((item: PharmaCheck, i) => (
                  <List.Item
                    key={i}
                    title={item.batch_number}
                    description={item.drug}
                    onPress={() => {}}
                  ></List.Item>
                ))}
              </List.Section>
            ))}

          {tab === "novacheck" &&
            nova.map((item, i) => <List.Item key={i} title={item.drug} />)}
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
