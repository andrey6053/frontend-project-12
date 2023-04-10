import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav } from "react-bootstrap";
import { setCurrentChannelId } from "../../../store/reducers/channelSlice";

export default function ChannelItems(props) {
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { id, name } = props.channel;
  function changeChannel(e) {
    e.preventDefault();
    dispatch(setCurrentChannelId(id));
  }
  return (
    <Nav.Item as="li" className="w-100">
      <Button
        className="w-100 rounded-0 text-start"
        variant={id === curChannelId ? "secondary" : "none"}
        onClick={(e) => changeChannel(e)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </Nav.Item>
  );
}
