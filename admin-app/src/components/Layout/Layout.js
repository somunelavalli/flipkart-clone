import React from "react";
import Header from "../Header/Header";

function Layout(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
