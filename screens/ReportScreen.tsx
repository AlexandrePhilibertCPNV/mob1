import _ from "lodash";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, List } from "react-native-paper";
import { NetInfoWrapper } from "../components/NetInfoWrapper";
import { PharmaCheckList } from "../components/PharmaCheckList";
import { UserContext } from "../contexts/UserContext";
import { CompleteCheckModal } from "../modals/CompleteCheckModal";
import { getMissingChecks } from "../requests/getMissingChecks";
import { normalizeDateString } from "../utils/date";

interface ReportScreenState {
  pharma?: PharmaCheck[][];
  nova?: NovaCheck[];
  tab: "pharmacheck" | "novacheck";
  selectedItem: any;
}
export default class ReportScreen extends React.Component<
  {},
  ReportScreenState
> {
  state: ReportScreenState = {
    tab: "pharmacheck",
    selectedItem: null,
  };

  static contextType = UserContext;

  componentDidMount() {
    this.fetchMissingChecks();
  }

  async fetchMissingChecks() {
    const { currentBaseId: baseId, token } = this.context;
    const { data } = await getMissingChecks(baseId, token);

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
        <NetInfoWrapper>
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
            {tab === "pharmacheck" && (
              <PharmaCheckList
                pharma={pharma}
                onItemClick={(item: PharmaCheck) => {
                  this.setState({
                    selectedItem: item,
                  });
                }}
              />
            )}

            {tab === "novacheck" &&
              nova?.map((item, i) => <List.Item key={i} title={item.drug} />)}
          </ScrollView>
        </NetInfoWrapper>
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
