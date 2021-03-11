// react
import React from "react";

// bootstrap
import { Container } from "react-bootstrap";

// my components
import ItemsList from "./components/ItemsList";
import AddItem from "./components/AddItem";

export const App = () => (
  <Container>
    <ItemsList />
    <AddItem />
  </Container>
);
