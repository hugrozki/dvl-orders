import { useState } from "react";
import { FlatList } from "react-native";

import { keyExtractor, TotalListItem, emptyComponent } from "./TotalListItem";
import { TotalListHeader } from "./TotalListHeader";

export function TotalList({ dataset }) {
  const [selectedKey, setSelectedKey] = useState(null);
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={dataset}
      renderItem={(props) => (
        <TotalListItem
          {...props}
          selected={selectedKey}
          setSelected={setSelectedKey}
        />
      )}
      ListEmptyComponent={emptyComponent}
      ListHeaderComponent={TotalListHeader}
    />
  );
}
