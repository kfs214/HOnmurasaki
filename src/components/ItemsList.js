import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemsList = () => {
  const items = [
    { price: 100, quantity: 10, volume: 1, unitPrice: 10, lowest: true },
    { price: 200, quantity: 10, volume: 1, unitPrice: 20, lowest: false },
    { price: 240, quantity: 6, volume: 2, unitPrice: 20, lowest: false },
  ];

  return (
    <div>
      {items.map((item, index) => {
        return <Item key={index} {...item} />;
      })}
    </div>
  );
};

export default ItemsList;
