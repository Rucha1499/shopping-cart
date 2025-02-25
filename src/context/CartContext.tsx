import React, { createContext, useReducer, useEffect, Dispatch } from "react";
import { cartReducer, initialState } from "../reducers/cartReducer";
// import { Product } from "../types";

interface CartContextProps {
  cart: any[];
  dispatch: Dispatch<any>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
