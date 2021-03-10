import React from "react";
import PropTypes from "prop-types";
import { ListGroup, Jumbotron } from "react-bootstrap";
import Message from "./Message";

const MessageList = ({ messageList }) => (
  <Jumbotron>
    <ListGroup>
      {messageList.map((message, index) => {
        return <Message key={index} {...message} />;
      })}
    </ListGroup>
  </Jumbotron>
);

MessageList.propTypes = {
  messageList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MessageList;
