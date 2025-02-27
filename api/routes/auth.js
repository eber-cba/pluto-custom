// authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import admin from "../../firebase/firebaseAdmin.js"; // Ajusta la ruta según tu estructura

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Crea el usuario en Firebase usando el Admin SDK
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Puedes guardar datos adicionales en tu base de datos si lo requieres
    // Genera un token JWT propio para la sesión
    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  // En este flujo, el cliente debe enviar un ID token obtenido al autenticarse con Firebase
  const { idToken } = req.body;
  try {
    // Verifica el ID token usando el Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Genera un token JWT para manejar sesiones en tu backend
    const token = jwt.sign(
      { uid: decodedToken.uid, email: decodedToken.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
