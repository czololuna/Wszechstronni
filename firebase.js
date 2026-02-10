import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi1i8fd9ScVCYl9CvsV1G6yIQqQlwoMKo",
  authDomain: "wszechstronni-d32eb.firebaseapp.com",
  projectId: "wszechstronni-d32eb",
  storageBucket: "wszechstronni-d32eb.firebasestorage.app",
  messagingSenderId: "248988595534",
  appId: "1:248988595534:web:2a95948c5ec116fc5d9a1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };