import React from "react";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    actionName,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      actionName={actionName}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder="Category Name"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control"
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select Value</option>
                <option value="Store">Store</option>
                <option value="Product">Product</option>
                <option value="Page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
      <h6>Checked Catagories</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder="Category Name"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control"
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select Value</option>
                <option value="Store">Store</option>
                <option value="Product">Product</option>
                <option value="Page">Page</option>
              </select>
            </Col>
          </Row>
        ))}

      {/* <input
        type={"file"}
        name="categoryImage"
        onChange={handleCategoryImage}
      /> */}
    </Modal>
  );
};

export default UpdateCategoriesModal;
