/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav, ButtonGroup } from "react-bootstrap";
import { setCurrentChannelId } from "../../../store/reducers/channelSlice";
import { showModal } from "../../../store/reducers/uiSlice";

export default function ChannelItem(props) {
  const [isDropdown, setIsDropdown] = useState(false);
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { id, name } = props.channel;
  function changeChannel(e) {
    e.preventDefault();
    dispatch(setCurrentChannelId(id));
  }
  function modalHandler(e, type) {
    e.preventDefault();
    setIsDropdown(false);
    const title = type === "renameChannel" ? "Переименовать" : "Удалить";
    const modal = {
      title: `${title} канал`,
      type,
      idChannel: id,
    };
    dispatch(showModal(modal));
  }
  return (
    <Nav.Item as="li" className="w-100">
      <ButtonGroup className={`d-flex ${isDropdown ? "show" : ""} dropdown`}>
        <Button
          className="w-100 rounded-0 text-start d-flex"
          variant={id === curChannelId ? "secondary" : "none"}
          onClick={changeChannel}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
        <Button
          type="button"
          className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
          variant={id === curChannelId ? "secondary" : "none"}
          onClick={() => setIsDropdown(!isDropdown)}
        ></Button>
        <div
          x-placement="bottom-start"
          className={`dropdown-menu ${isDropdown ? "show" : ""}`}
          style={{
            position: "absolute",
            inset: "0px 0px auto auto",
            transform: "translate(0px,40px)",
          }}
        >
          <a
            className="dropdown-item"
            role="button"
            tabIndex={0}
            href="#"
            onClick={(e) => modalHandler(e, "removeChannel")}
          >
            Удалить
          </a>
          <a
            className="dropdown-item"
            role="button"
            tabIndex={0}
            href="#"
            onClick={(e) => modalHandler(e, "renameChannel")}
          >
            Переименовать
          </a>
        </div>
      </ButtonGroup>
    </Nav.Item>
  );
}
