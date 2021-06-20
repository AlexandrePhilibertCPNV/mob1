import React from "react";
import { List } from "react-native-paper";
import format from "date-fns/format";
import { frCH } from "date-fns/locale";
import { Text, View } from "react-native";

interface PharmaCheckListProps {
  pharma?: PharmaCheck[][];
  onItemClick: (item: PharmaCheck) => void;
}

export class PharmaCheckList extends React.Component<PharmaCheckListProps> {
  render() {
    const { pharma, onItemClick } = this.props;

    return (
      <>
        {pharma?.length === 0 && (
          <Text style={{ padding: 12 }}>
            Tous les pharmachecks sont remplis
          </Text>
        )}
        {pharma?.map((dateGroup: PharmaCheck[], i: number) => (
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
                onPress={() => onItemClick(item)}
              ></List.Item>
            ))}
          </List.Section>
        ))}
      </>
    );
  }
}
