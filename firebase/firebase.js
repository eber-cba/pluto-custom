import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase con fallback a process.env en caso de que import.meta.env no esté disponible
const firebaseConfig = {
  apiKey:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_API_KEY) ||
    process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN) ||
    process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_PROJECT_ID) ||
    process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET) ||
    process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID) ||
    process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_APP_ID) ||
    process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID) ||
    process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
