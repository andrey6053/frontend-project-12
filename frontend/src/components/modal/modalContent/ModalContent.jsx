import React, { useState, useContext, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { hideModal } from "../../../store/reducers/uiSlice";
import { socketEvent } from "../../../actions/message";
import {
  selectors,
  setOwnerNewChannel,
} from "../../../store/reducers/channelSlice";
import socketContext from "../../../contexts/socketContext";
import { ChannelSchema } from "../../../utils/validator";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function ModalContent() {
  const { t } = useTranslation();
  const [error, setError] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);
  const username = localStorage.getItem("username");
  const inputRef = useRef(null);
  const { modal } = useSelector((state) => state.ui);
  const { socket } = useContext(socketContext);
  const channels = useSelector(selectors.selectAll).map((el) => el.name);
  const isRemove = modal.type === "removeChannel";
  const isRename = modal.type === "renameChannel";
  const isAdd = modal.type === "newChannel";
  const dispatch = useDispatch();
  let schema = ChannelSchema(channels);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: click,
  });
  function click({ name }) {
    setBtnDisable(true);
    try {
      schema.validateSync({ name });
      if (isRename) {
        socketEvent(socket, { id: modal.idChannel, name }, modal.type);
        toast.success(t("toast_renameChannel"))
      }
      if (isAdd) {
        socketEvent(socket, { name }, modal.type);
        dispatch(setOwnerNewChannel(username));
        toast.success(t("toast_createChannel"));
      }
      dispatch(hideModal());
    } catch (e) {
      setError(e.errors);
      console.log(e.errors);
    } finally {
      setBtnDisable(false);
    }
  }
  function modalClose() {
    dispatch(hideModal());
  }
  function modalSubmit(e) {
    e.preventDefault();
    setBtnDisable(true);
    if (isRemove) {
      socketEvent(socket, { id: modal.idChannel }, modal.type);
      dispatch(hideModal());
      toast.success(t("toast_deleteChannel"))
    } else {
      formik.handleSubmit();
    }
    setBtnDisable(false);
  }
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isRemove ? (
          `${t("deleteChannelBody")}`
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Form.Control
              required
              isInvalid={error.length !== 0}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.username}
              type="text"
              ref={inputRef}
            />
            <div className="invalid-feedback">
              {error && t(`${error[0]}`)}
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalClose}>
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={(e) => modalSubmit(e)}
          disabled={btnDisable}
        >
          {modal.title}
        </Button>
      </Modal.Footer>
    </>
  );
}
