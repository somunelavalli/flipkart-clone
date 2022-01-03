import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsBySlug } from "../redux/actions";
import "./style.css";
import { generatePublicurl } from "../urlConfig";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Price from "../Components/Price";
import Rating from "../Components/Rating";
import { MaterialButton } from "../Components/MaterialUI";

function ProductStore() {
  const { slug } = useParams();
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  console.log(product);
  console.log(priceRange);
  const dispatch = useDispatch();
  // const [priceRange, setPriceRange] = useState({
  //   under5k: 5000,
  //   under10k: 10000,
  //   under20k: 20000,
  //   above20k: 20001,
  // });
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
            // headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block", textDecoration: "none" }}
                  className="productContainet"
                >
                  <div className="productImageContainer">
                    <img
                      src={generatePublicurl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "10px 0" }}>{product.name}</div>
                    <div>
                      {/* <span>4.3</span>  */}
                      <Rating value="4.3" />
                      &nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3322)
                      </span>
                    </div>
                    {/* <div className="productPrice">{product.price}</div> */}
                    <Price value={product.price} />
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
