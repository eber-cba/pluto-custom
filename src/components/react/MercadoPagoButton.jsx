import React from "react";

const MercadoPagoButton = ({ total, discountCode, onCheckoutSuccess }) => {
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ total, discountCode }),
      });
      const data = await response.json();
      window.location.href = data.init_point;
      if (onCheckoutSuccess) {
        onCheckoutSuccess(data.total, []);
      }
    } catch (error) {
      alert("Error en el proceso de pago: " + error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        backgroundColor: "#00a650",
        color: "#fff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
      }}
    >
      Pagar con MercadoPago
    </button>
  );
};

export default MercadoPagoButton;
