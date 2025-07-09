// Header component for navigation menu and shopping cart icon
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "#eee" }}>
      <nav>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
      <h1>ShoppyGlobe</h1>
    </header>
  );
};

export default Header;