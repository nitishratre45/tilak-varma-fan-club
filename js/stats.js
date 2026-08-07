import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadStats() {

    try {

        const docRef = doc(db, "stats", "home");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            document.getElementById("totalMatches").textContent = data.matches;
            document.getElementById("totalRuns").textContent = data.runs;
            document.getElementById("totalAverage").textContent = data.average;
            document.getElementById("totalStrikeRate").textContent = data.strikeRate;
            document.getElementById("totalHundreds").textContent = data.hundreds;
            document.getElementById("totalFifties").textContent = data.fifties;

        }

    } catch (err) {

        console.error(err);

    }

}

loadStats();