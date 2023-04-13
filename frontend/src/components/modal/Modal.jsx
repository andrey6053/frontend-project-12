import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/reducers/uiSlice";
import ModalContent from "./modalContent/ModalContent";

export default function ModalWindow() {
  const { isModalShow } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  function modalClose() {
    dispatch(hideModal());
  }

  if (!isModalShow) return;
  return (
    <Modal
      show={isModalShow}
      onHide={modalClose}
      tabIndex={-1}
      centered
      style={{ display: "block" }}
    >
      <ModalContent />
    </Modal>
  );
}
