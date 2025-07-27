import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="app-header">
      <h1>ShoppyGlobe</h1>
      <nav className="nav-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/cart" className="nav-button">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
};

export default Header;