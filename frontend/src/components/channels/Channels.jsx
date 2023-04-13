import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Button, Nav } from "react-bootstrap";
import { selectors as channels } from "../../store/reducers/channelSlice";
import { showModal } from "../../store/reducers/uiSlice";
import ChannelItem from "./channelsItem/ChannelItem";
import MainChannelItem from "./channelsItem/MainChannelItem";

export default function Channels() {
  const dispatch = useDispatch();
  const channelList = useSelector(channels.selectAll);
  function modalHandler(e) {
    e.preventDefault();
    const modal = {
      type: "newChannel",
      title: "Создать канал",
    };
    dispatch(showModal(modal));
  }

  return (
    <Col className="d-flex col-4 col-md-3 border-end px-0 bg-light h-100 flex-column">
      <Container className="d-flex mt-1 align-items-center justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="primary"
          className="p-1 btn-group-vertical"
          onClick={modalHandler}
        >
          Создать
        </Button>
      </Container>
      <Nav
        as="ul"
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelList.map((channel) =>
          channel.removable ? (
            <ChannelItem channel={channel} key={channel.id}></ChannelItem>
          ) : (
            <MainChannelItem
              channel={channel}
              key={channel.id}
            ></MainChannelItem>
          )
        )}
      </Nav>
    </Col>
  );
}
