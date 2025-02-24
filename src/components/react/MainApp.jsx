import React from "react";
import Carousel from "./Carousel/Carousel.jsx";
import ProductList from "./ProductList.jsx";
import Animation3D from "./Animation3D.jsx";
import UserStatus from "./UserStatus.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { CartProvider } from "../../context/CartContext.jsx";

const MainApp = ({ products }) => {
  return (
    <CartProvider>
      <ErrorBoundary>
        <section style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "3rem", color: "#333" }}>
            Bienvenidos a Vintage Shop
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#555" }}>
            Encuentra la mejor indumentaria vintage de segunda mano.
          </p>
        </section>
        <Animation3D />
        <section>
          <h2>Últimos Ingresos</h2>
          <Carousel products={products} />
        </section>
        <section>
          <h2>Indumentaria</h2>
          <ProductList products={products} />
        </section>
        <section>
          <UserStatus />
        </section>
      </ErrorBoundary>
    </CartProvider>
  );
};

export default MainApp;
