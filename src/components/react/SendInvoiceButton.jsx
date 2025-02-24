import React from "react";

const SendInvoiceButton = ({ orderDetails }) => {
  const handleSendInvoice = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:5000/invoice/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderDetails }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error al enviar la factura: " + error.message);
    }
  };

  return (
    <button
      onClick={handleSendInvoice}
      style={{
        backgroundColor: "#8e44ad",
        color: "#fff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        marginTop: "1rem",
      }}
    >
      Enviar Factura
    </button>
  );
};

export default SendInvoiceButton;
