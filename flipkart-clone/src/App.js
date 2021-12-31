import "./App.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./Pages/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./redux/actions";
import { useEffect } from "react";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          />
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
