import express from "express";
import verifyToken from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Configura el transporter de Nodemailer con tus credenciales SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint para enviar la factura
router.post("/send", verifyToken, async (req, res) => {
  const { orderDetails } = req.body; // Debe incluir: cart, total, discountCode, etc.
  const userEmail = req.user.email;

  const invoiceHtml = `
    <h1>Factura de Compra</h1>
    <p>Gracias por tu compra, ${userEmail}!</p>
    <h2>Detalles de la Compra:</h2>
    <p>Total: $${orderDetails.total}</p>
    ${
      orderDetails.discountCode
        ? `<p>Descuento aplicado: ${orderDetails.discountCode}</p>`
        : ""
    }
    <h3>Productos:</h3>
    <ul>
      ${orderDetails.cart
        .map((item) => `<li>${item.name} - $${item.price}</li>`)
        .join("")}
    </ul>
    <p>¡Gracias por comprar en Vintage Shop!</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Tu factura de compra - Vintage Shop",
    html: invoiceHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Factura enviada correctamente a " + userEmail });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al enviar la factura: " + error.message });
  }
});

export default router;
