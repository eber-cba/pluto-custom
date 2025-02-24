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
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onLogin();
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
