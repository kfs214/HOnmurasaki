import { connect } from "react-redux";
import MessageList from "../components/MessageList";

const mapStateToProps = (state) => ({
  messageList: state.messageList,
});

const MessageListContainer = connect(mapStateToProps)(MessageList);

export default MessageListContainer;
