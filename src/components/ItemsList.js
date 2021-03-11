import React from "react";
import PropTypes from "prop-types";
import { ListGroup, Jumbotron } from "react-bootstrap";
import Item from "./Item";

const ItemsList = () => (
  <div>
    <Item price={100} quantity={10} volume={1} unitPrice={10} lowest={true} />
    <Item price={200} quantity={10} volume={1} unitPrice={20} lowest={false} />
    <Item price={240} quantity={6} volume={2} unitPrice={20} lowest={false} />
  </div>
);

export default ItemsList;
