import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyCIbWp-r1ofg3TCxmGwr6OIZMfYkBf7Q4",

    authDomain: "tilak-varma-fan-club.firebaseapp.com",

    projectId: "tilak-varma-fan-club",

    storageBucket: "tilak-varma-fan-club.firebasestorage.app",

    messagingSenderId: "362732593494",

    appId: "1:362732593494:web:768a0aacda61ae5891f6f7"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };