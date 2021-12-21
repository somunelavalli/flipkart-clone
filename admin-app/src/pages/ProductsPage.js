import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/UI/Input";
import { addProduct } from "../redux/actions";
import Modal from "../components/UI/Modal";

function ProductsPage(props) {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
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
      <Table responsive="sm" className="mt-5">
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
                <tr key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.createdBy}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
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

        <Modal
          show={show}
          handleClose={handleClose}
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
            productPicture.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))}
          <input
            className="mt-3"
            type={"file"}
            name="productPicture"
            onChange={handleProductPicture}
          />
        </Modal>
      </Container>
    </Layout>
  );
}

export default ProductsPage;
