import React from "react";
import { AuthProvider } from "../AuthContext";
import { CartProvider } from "../CartContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
