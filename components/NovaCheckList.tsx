import React from "react";
import { List } from "react-native-paper";
import { Text, View } from "react-native";
import format from "date-fns/format";
import { frCH } from "date-fns/locale";
import { normalizeDateString } from "../utils/date";

interface NovaCheckListProps {
  nova?: NovaCheck[];
  onItemClick: (item: NovaCheck) => void;
}

export class NovaCheckList extends React.Component<NovaCheckListProps> {
  render() {
    const { nova, onItemClick } = this.props;

    return (
      <>
        {nova?.length === 0 && (
          <Text style={{ padding: 12 }}>Tous les novachecks sont remplis</Text>
        )}
        {nova?.map((item: NovaCheck, i) => (
          <List.Item
            key={i}
            title={`Nova ${item.nova} ${format(
              new Date(normalizeDateString(item.date)),
              "'le' d MMMM",
              {
                locale: frCH,
              }
            )}`}
            description={item.drug}
            right={() => (
              <View>
                {item.start && <Text>matin: {item.start}</Text>}
                {item.end && <Text>soir: {item.end}</Text>}
              </View>
            )}
            onPress={() => onItemClick(item)}
          ></List.Item>
        ))}
      </>
    );
  }
}
