import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Modal from "../components/UI/Modal";
import { Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";
import linearCategories from "../helpers/linearCategories";
import { useSelector } from "react-redux";

function NewPage() {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);
  // console.log("categories", categories);
  const handleBannerImages = (e) => {
    console.log(e);
  };
  const handleProductImages = (e) => {
    console.log(e);
  };
  const renderCategoryPageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        actionName={"Create Page"}
      >
        <Row>
          <Col>
            <select
              className="form-control form-control-sm mb-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Desc"}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="file" name="banners" onChange={handleBannerImages} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="file" name="products" onChange={handleProductImages} />
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      {renderCategoryPageModal()}
      <button onClick={() => setCreateModal(true)} style={{ float: "left" }}>
        Create Page
      </button>
    </Layout>
  );
}

export default NewPage;
