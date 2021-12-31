import React from "react";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={"My Cart"} headerRight={<div>Deliver to</div>}>
          {Object.keys(cartItems).map((key, index) => (
            <div key={index} className="flexRow">
              <div className="cartProductContainer">
                <img src="" />
              </div>
              <div className="cartItemDetails">
                <div>
                  {cartItems[key].name} - {cartItems[key].qty} Qty
                </div>
                <div>Delivery in 3 - 5 days</div>
              </div>
            </div>
          ))}
        </Card>
        <Card
          style={{
            width: "500px",
          }}
        >
          Price
        </Card>
      </div>
    </Layout>
  );
}

export default CartPage;
