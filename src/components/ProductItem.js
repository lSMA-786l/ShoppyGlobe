import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;