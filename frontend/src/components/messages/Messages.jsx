import React from "react";
import { useSelector } from "react-redux";
import { Container, Col } from "react-bootstrap";
import { selectors as channels } from "../../store/reducers/channelSlice";
import { selectors as messages } from "../../store/reducers/messageSlice";
import FormMessage from "./formMessage/FormMessage";
import MessageItem from "./messageList/MessageItem";

export default function Messages() {
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  const curChannel = useSelector((state) =>
    channels.selectById(state, curChannelId)
  );
  const msgList = useSelector(messages.selectAll).filter(
    (msg) => msg.channelId === curChannelId
  );
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Container className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {curChannel.name}</b>
          </p>
          <span className="text-muted">{msgList.length} сообщений</span>
        </Container>
        <div className="chat-messages overflow-auto px-5 " id="messages-box">
          {msgList.map((msg) => (
            <MessageItem msg={msg} key={msg.id} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <FormMessage />
        </div>
      </div>
    </Col>
  );
}
