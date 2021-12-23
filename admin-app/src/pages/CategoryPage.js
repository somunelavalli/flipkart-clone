import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../redux/actions";
import Input from "../components/UI/Input";
import Modal from "../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import AddCategoryModal from "./components/AddCategoryModal";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import DeleteCategoryModal from "./components/DeleteCategoriesModal";
import "./Home.css";

function CategoryPage() {
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    // console.log(options);
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    // console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExtendedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExtendedArray);
    }
  };
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedidsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedidsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedidsArray.concat(checkedidsArray);
    if (checkedidsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedidsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
  };
  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd />
                  <span>Add Category</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload />
                  <span>Edit</span>
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul> */}
            {/* {renderCategories(category.categories)} */}
            {/* {JSON.stringify(createCategoryList(category.categories))} */}
            {/* </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckbox />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
                expandAll: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <AddCategoryModal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
        actionName={"Add Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Category"}
        actionName={"Save Changes"}
        size={"lg"}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      <DeleteCategoryModal
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        modalTitle="Confirm"
        actionName="Delete Category"
        deleteCategories={deleteCategories}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
      {/* {renderAddCategoryModal()} */}
      {/* Edit Category */}
      {/* {renderUpdateCategoriesModal()} */}
      {/* {renderDeleteCategoryModal()} */}
    </Layout>
  );
}

export default CategoryPage;
