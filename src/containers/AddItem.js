// react/redux
import React from "react";
import { connect } from "react-redux";

// styles
import { BsPlusCircleFill } from "react-icons/bs";

// my components
import { addItem } from "../actions";

let AddItem = ({ dispatch }) => (
  <BsPlusCircleFill
    onClick={() => dispatch(addItem())}
    className="float-right"
    size="3em"
    color={"#65318e"}
  />
);

AddItem = connect()(AddItem);

export default AddItem;
