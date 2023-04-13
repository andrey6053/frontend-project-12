import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { socketEvent } from "../../../actions/message";
import UserContext from "../../../contexts/userContext";
import socketContext from "../../../contexts/socketContext";

export default function FormMessage() {
  const { user } = useContext(UserContext);
  const { socket } = useContext(socketContext);
  const curChannelId = useSelector((state) => state.channels.currentChannelId);
  const formik = useFormik({
    initialValues: {
      msgText: "",
    },
    onSubmit: async (values) => {
      if (values.msgText === "") return;
      socketEvent(
        socket,
        {
          body: values.msgText,
          channelId: curChannelId,
          username: user,
        },
        "newMessage"
      );
      values.msgText = "";
    },
  });
  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="input-group has-validation">
        <Form.Control
          name="msgText"
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          type="text"
          placeholder="Введите сообщение..."
          value={formik.values.msgText}
          onChange={formik.handleChange}
          autoFocus
        />
        <Button className="btn-group-vertical rounded" type="submit">
          Отправить
        </Button>
      </Form.Group>
    </Form>
  );
}
