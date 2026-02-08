import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyDZeV0XL3ldC0foTKvTGW11GsCPrlWaUEU",
 authDomain: "gjsupplies-d7e68.firebaseapp.com",
 projectId: "gjsupplies-d7e68",
 storageBucket: "gjsupplies-d7e68.firebasestorage.app",
 messagingSenderId: "318019800475",
 appId: "1:318019800475:web:f6ba4578a893b53d8fe53e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
