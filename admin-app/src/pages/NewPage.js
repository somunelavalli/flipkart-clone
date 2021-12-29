import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Modal from "../components/UI/Modal";
import { Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";
import linearCategories from "../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../redux/actions";

function NewPage() {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);
  // console.log("categories", categories);
  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setType("");
      setDesc("");
      setCategoryId("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);
  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };
  const submitPageForm = (e) => {
    // e.preventDefault();

    if (title === "") {
      alert("Title is Required Field");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    // console.log({ title, desc, categoryId, type, banners, products });
    dispatch(createPage(form));
  };
  const renderCategoryPageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
        actionName={"Create Page"}
      >
        <Row>
          <Col>
            {/* <select
              className="form-control form-control-sm mb-3"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select> */}
            <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder={"Select Category"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              className="mb-3 mt-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              className="mb-3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Desc"}
              className="form-control-sm"
            />
          </Col>
        </Row>
        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row key={index}>
                <Col> {banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="mb-3 mt-3"
              type="file"
              name="banners"
              onChange={handleBannerImages}
            />
          </Col>
        </Row>
        {products.length > 0
          ? products.map((product, index) => (
              <Row key={index}>
                <Col> {product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              className="mb-3"
              type="file"
              name="products"
              onChange={handleProductImages}
            />
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <h3>Page is Creating Please wait ....</h3>
      ) : (
        <>
          {renderCategoryPageModal()}
          <button
            onClick={() => setCreateModal(true)}
            style={{ float: "left" }}
          >
            Create Page
          </button>
        </>
      )}
    </Layout>
  );
}

export default NewPage;
