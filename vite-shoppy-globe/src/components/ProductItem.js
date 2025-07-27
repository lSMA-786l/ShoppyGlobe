import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleImageError = (e) => {
    e.target.src = "/images/fallback.png";
  };

  return (
    <article className="product-item">
      <section className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={`Image of ${product.title} - ${product.description.substring(0, 30)}...`}
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />
      </section>
      <section className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      </section>
    </article>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;