import React from "react";
import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       component={(props) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//           return <Component {...props} />;
//         } else {
//           return <Navigate to="/login" replace />;
//         }
//       }}
//     />
//   );
// };

// export default PrivateRoute;
