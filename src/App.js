// react
import React from "react";

// bootstrap
import { Container } from "react-bootstrap";

// my components
import ItemsListContainer from "./containers/ItemsListContainer";
import AddItem from "./containers/AddItem";
import Appbar from "./containers/Appbar";

export const App = () => (
  <div>
    <Appbar />
    <Container>
      <ItemsListContainer />
      <AddItem />
    </Container>
  </div>
);
