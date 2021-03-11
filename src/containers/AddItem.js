import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from "react-redux";
import { addItem } from "../actions";

let AddItem = ({ dispatch }) => (
  <BsPlusCircleFill
    onClick={() => dispatch(addItem())}
    className="float-right"
    size="3em"
  />
);

AddItem = connect()(AddItem);

export default AddItem;
