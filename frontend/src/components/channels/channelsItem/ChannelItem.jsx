/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Nav, ButtonGroup } from "react-bootstrap";
import { setCurrentChannelId } from "../../../store/reducers/channelSlice";
import { showModal, setIdDropdown } from "../../../store/reducers/uiSlice";

export default function ChannelItem(props) {
  const { t } = useTranslation();
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  const idDropdown = useSelector((state) => state.ui.idDropdown);
  const dispatch = useDispatch();
  const { id, name } = props.channel;
  function changeChannel(e) {
    e.preventDefault();
    dispatch(setCurrentChannelId(id));
  }
  function modalHandler(e, type) {
    e.preventDefault();
    const title =
      type === "renameChannel" ? `${t("rename")}` : `${t("delete")}`;
    const modal = {
      title: `${title} ${t("channel")}`,
      type,
      idChannel: id,
    };
    dispatch(showModal(modal));
  }
  function dropdownHandler() {
    if (idDropdown === id) {
      dispatch(setIdDropdown(null));
    } else {
      dispatch(setIdDropdown(id));
    }
  }
  return (
    <Nav.Item as="li" className="w-100">
      <ButtonGroup
        className={`d-flex ${id === idDropdown ? "show" : ""} dropdown`}
      >
        <Button
          className="w-100 rounded-0 text-start d-flex text-truncate"
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
          onClick={() => dropdownHandler(id)}
        ></Button>
        <div
          x-placement="bottom-start"
          className={`dropdown-menu ${id === idDropdown ? "show" : ""}`}
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            transform: "translate3d(-8px,40px,0px)",
          }}
        >
          <a
            className="dropdown-item"
            role="button"
            tabIndex={0}
            href="#"
            onClick={(e) => modalHandler(e, "removeChannel")}
          >
            {t("delete")}
          </a>
          <a
            className="dropdown-item"
            role="button"
            tabIndex={0}
            href="#"
            onClick={(e) => modalHandler(e, "renameChannel")}
          >
            {t("rename")}
          </a>
        </div>
      </ButtonGroup>
    </Nav.Item>
  );
}
