import React from "react";
import headerStyle from "./Header.module.css";

function Header() {
  return (
    <div className={headerStyle.hero}>
      <h1 style={{ padding: "1rem" }}>Keep yourself in check!</h1>
    </div>
  );
}

export default Header;
 