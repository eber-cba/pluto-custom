import express from "express";
import verifyToken from "../middleware/auth.js";
import { MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  let { total, discountCode } = req.body;

  // Lógica simple para aplicar descuento
  const discountCodes = {
    DESCUENTO10: 0.1,
    DESCUENTO20: 0.2,
  };

  if (discountCode && discountCodes[discountCode]) {
    const discount = discountCodes[discountCode];
    total = total - total * discount;
  }

  const preference = {
    items: [
      {
        title: "Compra Vintage Shop",
        unit_price: total,
        quantity: 1,
      },
    ],
    back_urls: {
      success: process.env.MP_SUCCESS_URL,
      failure: process.env.MP_FAILURE_URL,
      pending: process.env.MP_PENDING_URL,
    },
    auto_return: "approved",
  };

  try {
    const response = await client.preferences.create(preference);
    res.json({ init_point: response.body.init_point, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
