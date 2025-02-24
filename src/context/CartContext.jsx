import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (error) {
        console.error("Error al parsear el carrito:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error al guardar el carrito:", error);
      }
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Se asume que cada producto tiene un id único
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((product) => product.id !== productId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
