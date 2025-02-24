import React from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, emptyCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "0.5rem 0",
              }}
            >
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "5px",
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={emptyCart}
              style={{
                backgroundColor: "#777",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                marginRight: "1rem",
              }}
            >
              Vaciar Carrito
            </button>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#0077cc",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
