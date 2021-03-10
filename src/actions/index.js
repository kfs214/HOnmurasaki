// constants
import { SENT_BY } from "../constants";

// action types
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ADD_MESSAGE = "ADD_MESSAGE";

// actions
export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  messageItem: {
    _id: new Date().getTime(),
    sentBy: SENT_BY.ME,
    message,
  },
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  messageItem: {
    _id: new Date().getTime(),
    sentBy: SENT_BY.OTHERS,
    message,
  },
});
