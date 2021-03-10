import React from "react";
import { connect } from "react-redux";
import { sendMessage } from "../actions";
import { Button, Form, InputGroup } from "react-bootstrap";

let InputArea = ({ dispatch }) => {
  let input;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(sendMessage(input.value));
        input.value = "";
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter a message"
            ref={(node) => {
              input = node;
            }}
          />
          <InputGroup.Append>
            <Button type="submit">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

InputArea = connect()(InputArea);

export default InputArea;
