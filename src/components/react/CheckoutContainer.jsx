import React, { useState } from "react";
import MercadoPagoButton from "./MercadoPagoButton";
import Animation3D from "./Animation3D";
import SendInvoiceButton from "./SendInvoiceButton";

const CheckoutContainer = ({ initialTotal }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleCheckoutSuccess = (finalTotal, cart) => {
    setOrderDetails({ cart, total: finalTotal, discountCode });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Finalizar Compra</h1>
      <p>Total a pagar: ${initialTotal}</p>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="discount">Código de Descuento:</label>
        <input
          type="text"
          id="discount"
          name="discount"
          placeholder="Ingresa tu código"
          value={discountCode}
          onChange={handleDiscountChange}
        />
      </div>
      <MercadoPagoButton
        total={initialTotal}
        discountCode={discountCode}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
      <Animation3D />
      {orderDetails && <SendInvoiceButton orderDetails={orderDetails} />}
    </div>
  );
};

export default CheckoutContainer;
