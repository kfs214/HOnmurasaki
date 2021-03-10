// react
import React from "react";

// bootstrap
import { Container, Col, Row } from "react-bootstrap";

// my components
import InputArea from "./containers/InputArea";
import MessageListContainer from "./containers/MessageListContainer";

export const App = () => (
  <Container>
    <Row className="row">
      <Col xs={12}>
        <h1>Ayanami Wryyyyy Service</h1>
        <MessageListContainer />
        <InputArea />
      </Col>
    </Row>
  </Container>
);
