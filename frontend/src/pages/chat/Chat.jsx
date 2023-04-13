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
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Container className="my-4 h-100 overflow-hidden rounded shadow">
      {isLoader ? (
        <Row className="row h-100 justify-content-center align-items-center">
          <Loader />
        </Row>
      ) : (
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      )}
    </Container>
  );
}
