import express from "express";
import jwt from "jsonwebtoken";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../src/firebase.js"; // Importa la instancia de autenticación de Firebase

const router = express.Router();
const users = [];

// Registro de usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = { id: userCredential.user.uid, email };
    users.push(newUser);
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
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
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
