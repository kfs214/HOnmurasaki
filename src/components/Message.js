import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import { SENT_BY } from "../constants";

const Message = ({ message, sentBy }) => {
  const backgroundColor = sentBy === SENT_BY.ME ? "bg-primary" : "bg-secondary";

  return (
    <ListGroup.Item className={[backgroundColor, "text-white"]}>
      {message}
    </ListGroup.Item>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
