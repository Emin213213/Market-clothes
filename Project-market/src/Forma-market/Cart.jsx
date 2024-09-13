import React, { useState } from "react";
import "../../scss/styles.scss";
import ProductFilter from "./Math";

const Cart = () => {
  const handerClick = (e) => {
    setFilterPrice(e.target.value);
  };

  return (
    <div className="cart-container">
      <h1 className="item-h1">Basket</h1>

      <ProductFilter />
    </div>
  );
};

export default Cart;
