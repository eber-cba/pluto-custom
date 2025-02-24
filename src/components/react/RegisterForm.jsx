import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onRegister();
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}
    >
      <h2>Registrarse</h2>
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
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
