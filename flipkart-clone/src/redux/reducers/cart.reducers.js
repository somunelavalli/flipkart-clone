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
  updatingCart: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initialState,
      };
      break;
  }
  return state;
};
