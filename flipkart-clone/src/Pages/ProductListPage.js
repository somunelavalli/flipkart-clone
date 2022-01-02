import React from "react";
import Layout from "../Components/Layout";
import ProductStore from "./ProductStore";
import { useLocation } from "react-router-dom";
import "./style.css";
import getParams from "../utils/getParams";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClothingAndAccessories";
function ProductListPage(props) {
  const { search } = useLocation();
  const renderProducts = () => {
    const params = getParams(search);
    console.log(params);
    let content = null;
    switch (params.type) {
      case "Store":
        content = <ProductStore {...props} />;
        break;
      case "Page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };
  return <Layout>{renderProducts()}</Layout>;
}

export default ProductListPage;
