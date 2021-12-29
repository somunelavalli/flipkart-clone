import React from "react";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    actionName,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      actionName={actionName}
    >
      <Input
        vale={categoryName}
        placeholder="Category Name"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <select
        value={parentCategoryId}
        className="form-control mb-3"
        onChange={(e) => setParentCategoryId(e.target.value)}
      >
        <option>Select Category</option>
        {categoryList.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <input
        type={"file"}
        name="categoryImage"
        onChange={handleCategoryImage}
      />
    </Modal>
  );
};

export default AddCategoryModal;
