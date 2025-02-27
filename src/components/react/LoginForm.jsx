import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Obtener el ID token de Firebase
      const idToken = await userCredential.user.getIdToken();

      // Enviar el ID token a tu backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (data.token) {
        // Puedes guardar el token recibido o manejar la sesión según tu lógica
        onLogin(data.token);
      } else {
        alert("Error en el login: " + data.error);
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (data.token) {
        onLogin(data.token);
      } else {
        alert("Error en el login con Google: " + data.error);
      }
    } catch (error) {
      alert("Error al iniciar sesión con Google: " + error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleEmailLogin}
        style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}
      >
        <h2>Iniciar Sesión</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#0077cc",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Entrar
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: "#db4437",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
