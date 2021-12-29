import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductPage } from "../redux/actions";
import { useLocation } from "react-router-dom";
import getParams from "../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../Components/Card";

function ProductPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  const { search } = useLocation();

  useEffect(() => {
    const params = getParams(search);
    console.log(params);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: "0 10px" }}>
      {page.title}
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt="" />
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px 0",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{
                width: "400px",
                height: "350px",
                margin: "5px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={product.img}
                alt=""
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ProductPage;
