import React from "react";
import { useSelector } from "react-redux";
import { Container, Col, Button, Nav } from "react-bootstrap";
import { selectors as channels } from "../../store/reducers/channelSlice";
import ChannelItems from "./channelsItem/ChannelItems";

export default function Channels() {
  const channelList = useSelector(channels.selectAll);
  return (
    <Col className="d-flex col-4 col-md-2 border-end px-0 bg-light h-100 flex-column">
      <Container className="d-flex mt-1 align-items-center justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="primary" className="p-1 btn-group-vertical">
          Создать
        </Button>
      </Container>
      <Nav
        as="ul"
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelList.map((channel) => (
          <ChannelItems channel={channel} key={channel.id}></ChannelItems>
        ))}
      </Nav>
    </Col>
  );
}
