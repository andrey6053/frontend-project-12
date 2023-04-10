import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/reducers/channelSlice";
import Loader from "../../components/loader/Loader";
import { Container, Row } from "react-bootstrap";
import Channels from "../../components/channels/Channels";
import Messages from "../../components/messages/Messages";

export default function Chat() {
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state.channels.isLoader);
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  if (isLoader) return <Loader />;

  return (
    <Container className="my-4 h-100 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        {curChannelId && <Messages />}
      </Row>
    </Container>
  );
}
