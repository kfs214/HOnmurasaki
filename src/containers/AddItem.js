import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from "react-redux";
import { addItem } from "../actions";

let AddItem = () => (
  <BsPlusCircleFill
    onClick={() => addItem()}
    className="float-right"
    size="3em"
  />
);

AddItem = connect()(AddItem);

export default AddItem;
