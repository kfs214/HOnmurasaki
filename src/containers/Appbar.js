// react/redux
import React from "react";

// styles and consts
import { Navbar } from "react-bootstrap";
import funchan from "../funchan-best.png";
import { APP_NAME } from "../consts";

const Appbar = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand>
      <img
        alt="funchan"
        src={funchan}
        height="30"
        className="d-inline-block align-top"
      />{" "}
      {APP_NAME}
    </Navbar.Brand>
  </Navbar>
);

export default Appbar;
