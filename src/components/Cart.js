import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../redux/cartSlice";

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return <div className="cart-empty">Your cart is empty.</div>;

  return (
    <div className="cart-container">
      <div className="cart-list">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <div className="cart-actions">  
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;