import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/UI/Input";
import { addProduct } from "../redux/actions";
import Modal from "../components/UI/Modal";
import "./Home.css";
import { generatePublicurl } from "../urlConfig";

function ProductsPage(props) {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [productDetailModail, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [name, setName] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

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

  const handleProductPicture = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm" className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  key={product._id}
                  onClick={() => showProductDetailsModal(product)}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>{product.createdBy}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Product"}
        actionName={"Add Product"}
      >
        <Input
          label="Product Name"
          vale={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Product Price"
          vale={price}
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Product Stock"
          vale={quantity}
          placeholder="Product Stock"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Product Description"
          vale={description}
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={categoryId}
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPicture.length > 0 &&
          productPicture.map((pic, index) => <div key={index}>{pic.name}</div>)}
        <input
          className="mt-3"
          type={"file"}
          name="productPicture"
          onChange={handleProductPicture}
        />
      </Modal>
    );
  };
  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        size="lg"
        show={productDetailModail}
        handleClose={handleCloseProductDetailModal}
        modalTitle={"Product Details"}
        actionName={"Save Changes"}
      >
        <Row>
          <Col md="6">
            <label className="key">Product Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Product Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Product Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Product Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key mb-3">Product Images</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImageContainer ">
                  <img src={generatePublicurl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add Product</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Container>
    </Layout>
  );
}

export default ProductsPage;
