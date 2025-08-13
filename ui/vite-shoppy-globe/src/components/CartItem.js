import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity }));
    }
  };

  return (
    <div className="cart-item">
      <h4>{item.title}</h4>
      <p>Price: ${item.price}</p>
      <p>
        Quantity: <input type="number" value={item.quantity} min="1" onChange={handleQuantityChange} style={{ width: 50 }} />
      </p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;