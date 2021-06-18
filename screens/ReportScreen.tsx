import format from "date-fns/format";
import { frCH } from "date-fns/locale";
import _ from "lodash";
import * as React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Chip, List, Modal, Portal, TextInput } from "react-native-paper";

import { UserContext } from "../contexts/UserContext";
import { CompleteCheckModal } from "../modals/CompleteCheckModal";
import { normalizeDateString } from "../utils/date";
import fetch, { withBearer } from "../utils/fetch";

interface ReportScreenState {
  pharma: PharmaCheck[][];
  nova: NovaCheck[];
  tab: "pharmacheck" | "novacheck";
  selectedItem: any;
}
export default class ReportScreen extends React.Component<
  {},
  ReportScreenState
> {
  state: ReportScreenState = {
    pharma: [],
    nova: [],
    tab: "pharmacheck",
    selectedItem: null,
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
    const { pharma, nova, tab, selectedItem } = this.state;

    return (
      <View style={styles.container}>
        <CompleteCheckModal
          type={tab}
          item={selectedItem}
          onDismiss={() => {
            this.setState({ selectedItem: null });
            this.fetchMissingChecks();
          }}
        />
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
            pharma.map((dateGroup: PharmaCheck[], i: number) => (
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
                    right={() => (
                      <View>
                        {item.start && <Text>matin: {item.start}</Text>}
                        {item.end && <Text>soir: {item.end}</Text>}
                      </View>
                    )}
                    onPress={() => {
                      this.setState({ selectedItem: item });
                    }}
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
