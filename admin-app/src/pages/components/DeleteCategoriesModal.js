import React from "react";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const DeleteCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    actionName,
    setDeleteCategoryModal,
    deleteCategories,
    expandedArray,
    checkedArray,
  } = props;

  return (
    <Modal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
      actionName={actionName}
      buttons={[
        {
          label: "No",
          color: "primary",
          onClick: () => {
            alert("no");
          },
        },
        {
          label: "Yes",
          color: "danger",
          onClick: deleteCategories,
        },
      ]}
    >
      <h5>Expanded</h5>
      {expandedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
      <h5>Checked</h5>
      {checkedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
    </Modal>
  );
};

export default DeleteCategoryModal;
