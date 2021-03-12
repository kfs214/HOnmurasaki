import React from "react";
import Item from "./Item";

const ItemsList = ({ items, lowestUnitCost, updateItem }) => (
  <div>
    {Object.keys(items).map((key) => (
      <Item
        key={key}
        itemKey={key}
        item={items[key]}
        updateItem={updateItem}
        lowest={items[key].unitPrice === lowestUnitCost}
      />
    ))}
  </div>
);

export default ItemsList;
