import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  productsByPrice: {
    under5K: [],
    under10k: [],
    under20k: [],
    above20k: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;
  }
  return state;
};
