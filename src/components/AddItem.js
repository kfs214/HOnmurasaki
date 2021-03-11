import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

const AddItem = () => (
  <BsPlusCircleFill
    onClick={() => console.log("clicked!")}
    className="float-right"
    size="3em"
  />
);

export default AddItem;
