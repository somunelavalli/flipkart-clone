import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsBySlug } from "../redux/actions";
import "./style.css";
import { generatePublicurl } from "../urlConfig";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

function ProductStore() {
  const { slug } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under20k: 20000,
    above20k: 20001,
  });
  //   console.log(priceRange["under5k"]);
  //   console.log(product.productsByPrice);
  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${slug} Mobiles under ${priceRange[key]}`}
            headerRight={<button>View All</button>}
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block" }}
                  className="productContainet"
                >
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
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default ProductStore;
