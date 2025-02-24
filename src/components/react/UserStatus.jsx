import React from "react";
import { useAuth } from "../../hooks/useAuth";

const UserStatus = () => {
  const { user, logout } = useAuth() || {};

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "inline-block", marginLeft: "1rem" }}>
      <span style={{ marginRight: "0.5rem" }}>Hola, {user.email}</span>
      <button
        onClick={logout}
        style={{
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          padding: "0.3rem 0.6rem",
          borderRadius: "5px",
        }}
      >
        Salir
      </button>
    </div>
  );
};

export default UserStatus;
