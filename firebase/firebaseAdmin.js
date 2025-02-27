// firebase/firebaseAdmin.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Obtener la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta absoluta al archivo de credenciales
const serviceAccountPath = path.join(
  __dirname,
  "pluto-custom-firebase-adminsdk-fbsvc-ff82bd87cf.json"
);

// Leer y parsear el archivo JSON
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Si necesitas la URL de la base de datos, descomenta la siguiente línea:
    // databaseURL: "https://tu-proyecto.firebaseio.com",
  });
}

export default admin;
