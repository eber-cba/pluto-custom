import React from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    alert(`Producto ${product.name} agregado al carrito`);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {product.images && product.images.length > 0 && (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}
      <h3>{product.name}</h3>
      <p>{product.description.substring(0, 50)}...</p>
      <p style={{ fontWeight: "bold" }}>${product.price}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "#0077cc" }}
        >
          Ver Detalle
        </a>
        <button
          onClick={handleAdd}
          style={{
            backgroundColor: "#0077cc",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
