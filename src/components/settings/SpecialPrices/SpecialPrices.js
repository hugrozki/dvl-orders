import { useState } from "react";
import { View } from "react-native";

import { styles } from "./SpecialPrices.styles";
import { SpecialPriceRow } from "./SpecialPriceRow";

export function SpecialPrices({ pricesList, onChange }) {
  const [newItem, setNewItem] = useState({ quantity: 0, unitprice: 0 });

  const onChangeHandler = (key, value, index) => {
    if (index !== null) {
      const newItemlist = pricesList.slice();
      const itemObject = newItemlist[index];
      itemObject[key] = value;
      itemObject["updated"] = true;
      onChange(newItemlist);
    } else {
      const newObject = { ...newItem, [key]: value };
      setNewItem(newObject);
    }
  };

  const addValuesHandler = () => {
    const newItemlist = pricesList.slice();
    newItemlist.push({ ...newItem, id: null });
    setNewItem({ quantity: 0, unitprice: 0 });
    onChange(newItemlist);
  };

  const deleteHandler = (index) => {
    const newItemlist = pricesList.slice();
    const [deletedItem] = newItemlist.splice(index, 1);
    onChange(newItemlist, deletedItem);
  };

  return (
    <View style={styles.container}>
      <View>
        {pricesList.map((item, index) => (
          <SpecialPriceRow
            key={`special-price-row-${index}`}
            onChangeValues={onChangeHandler}
            onDelete={deleteHandler}
            index={index}
            quantity={item.quantity}
            unitPrice={item.unitprice}
            disableDelete={item.quantity === 1}
          />
        ))}
        {newItem && (
          <SpecialPriceRow
            key="special-price-row-empty"
            onChangeValues={onChangeHandler}
            onAddValues={addValuesHandler}
            quantity={newItem.quantity}
            unitPrice={newItem.unitprice}
          />
        )}
      </View>
    </View>
  );
}
