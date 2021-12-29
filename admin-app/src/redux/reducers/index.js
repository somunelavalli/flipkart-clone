import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.recuders";
import orderReducer from "./order.reducers";
import pageReducer from "./page.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
  order: orderReducer,
});

export default rootReducer;
