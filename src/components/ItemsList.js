import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemsList = ({ items }) => (
  <div>
    {Object.keys(items).map((key) => (
      <Item key={key} {...items[key]} />
    ))}
  </div>
);

export default ItemsList;
