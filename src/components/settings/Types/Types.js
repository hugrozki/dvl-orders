import { useState } from "react";
import { View } from "react-native";

import { styles } from "./Types.styles";
import { TypeRow } from "./TypeRow";

export function Types({ items = [], onChange }) {
  const [newItem, setNewItem] = useState("");

  const onChangeHandler = (value, index) => {
    if (index !== null) {
      const newItemlist = items.slice();
      const itemObject = newItemlist[index];
      itemObject["description"] = value;
      itemObject["updated"] = true;
      onChange(newItemlist);
    } else {
      setNewItem(value);
    }
  };

  const addValuesHandler = () => {
    const newItemlist = items.slice();
    newItemlist.push({ id: null, description: newItem, updated: false });
    setNewItem("");
    onChange(newItemlist);
  };

  const deleteHandler = (index) => {
    const newItemlist = items.slice();
    const [deletedItem = null] = newItemlist.splice(index, 1);

    onChange(newItemlist, deletedItem);
  };
  return (
    <View>
      {items.map((item, index) => (
        <TypeRow
          key={`type-row-${index}`}
          onChangeValues={onChangeHandler}
          onDelete={deleteHandler}
          index={index}
          description={item.description}
        />
      ))}
      <TypeRow
        key="type-row-empty"
        onChangeValues={onChangeHandler}
        onAddValues={addValuesHandler}
        description={newItem}
      />
    </View>
  );
}
