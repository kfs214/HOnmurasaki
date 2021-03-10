import { all, call, put, takeEvery } from "redux-saga/effects";
import { SEND_MESSAGE, addMessage } from "../actions";

export function* postMessage(action) {
  const endpoint =
    "https://rtzf27sw51.execute-api.ap-northeast-1.amazonaws.com/echo";

  const content = {
    method: "POST",
    body: JSON.stringify({ message: action.messageItem.message }),
  };

  const response = yield call(fetch, endpoint, content);

  const { message } = yield response.json();

  yield put(addMessage(message));
}

export function* sendMessage() {
  yield takeEvery(SEND_MESSAGE, postMessage);
}

export default function* rootSaga() {
  yield all([sendMessage()]);
}
