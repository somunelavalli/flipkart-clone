import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsBySlug } from "../redux/actions";
import "./style.css";
import { generatePublicurl } from "../urlConfig";
function ProductListPage(props) {
  const { slug } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under20k: 20000,
    above20k: 20001,
  });

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{slug} Mobiles Under 10k</div>
              <button>View All</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div className="productContainet">
                  <div className="productImageContainer">
                    <img
                      src={generatePublicurl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span> &nbsp;
                      <span>3322</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
}

export default ProductListPage;
