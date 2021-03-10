import { SEND_MESSAGE, ADD_MESSAGE } from "../actions";

const initialState = {
  messageList: [],
};

export const messageApp = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
    case ADD_MESSAGE:
      let newMessageList = [
        ...state.messageList,
        {
          ...action.messageItem,
        },
      ];

      return {
        ...state,
        messageList: newMessageList,
      };

    default:
      return state;
  }
};
