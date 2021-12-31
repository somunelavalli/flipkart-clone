import { cartConstants } from "../actions/constants";

const initialState = {
  cartItems: {
    // 123: {
    //   _id: 123,
    //   name: "Apple iphone 13",
    //   img: "some.jpg",
    //   price: 100,
    //   qty: 1,
    // },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
      };
      break;
  }
  return state;
};
