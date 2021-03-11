// react
import React from "react";

// bootstrap
import { Container } from "react-bootstrap";

// my components
import ItemsListContainer from "./containers/ItemsListContainer";
import AddItem from "./containers/AddItem";

export const App = () => (
  <Container>
    <ItemsListContainer />
    <AddItem />
  </Container>
);
