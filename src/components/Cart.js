import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const items = useSelector(state => state.cart.items);

  if (items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;