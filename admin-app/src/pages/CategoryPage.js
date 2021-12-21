import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../redux/actions";
import Input from "../components/UI/Input";
import Modal from "../components/UI/Modal";

function CategoryPage() {
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage,
    // };

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    // console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    const myCategories = [];

    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    console.log(options);
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add Category</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category.categories)}
              {/* {JSON.stringify(createCategoryList(category.categories))} */}
            </ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
        actionName={"Add Category"}
      >
        <Input
          vale={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          value={parentCategoryId}
          className="form-control"
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
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
    </Layout>
  );
}

export default CategoryPage;
