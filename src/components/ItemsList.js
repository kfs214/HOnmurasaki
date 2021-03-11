import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemsList = ({ items, updateItem }) => (
  <div>
    {Object.keys(items).map((key) => (
      <Item key={key} itemKey={key} item={items[key]} updateItem={updateItem} />
    ))}
  </div>
);

export default ItemsList;
