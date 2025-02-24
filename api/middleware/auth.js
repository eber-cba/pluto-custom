import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer <token>"
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
