import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { addToCart } from "../redux/actions";
function CartPage(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //   const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card headerLeft={"My Cart"} headerRight={<div>Deliver to</div>}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}
        </Card>
        <Card
          headerLeft={"Price"}
          style={{
            width: "500px",
          }}
        ></Card>
      </div>
    </Layout>
  );
}

export default CartPage;
