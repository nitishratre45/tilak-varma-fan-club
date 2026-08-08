import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const matchesContainer =
    document.getElementById("matchesContainer");


// ======================================
// LOAD MATCHES
// ======================================

async function loadMatches() {

    if (!matchesContainer) return;

    matchesContainer.innerHTML = `
        <div class="match-loading">
            Loading Matches...
        </div>
    `;

    try {

        const snapshot =
            await getDocs(collection(db, "matches"));

        if (snapshot.empty) {

            matchesContainer.innerHTML = `
                <div class="match-empty">
                    <h2>🏏 No Matches Available</h2>
                    <p>Upcoming matches will appear here.</p>
                </div>
            `;

            return;
        }


        // Latest / upcoming first
        const matches = snapshot.docs.sort((a, b) => {

            const dateA = a.data().date || "";
            const dateB = b.data().date || "";

            return dateA.localeCompare(dateB);

        });


        matchesContainer.innerHTML = "";


        matches.forEach((matchDoc) => {

            const match = matchDoc.data();


            matchesContainer.innerHTML += `

                <div class="match-card">

                    <div class="match-status">
                        ${match.status || "Upcoming"}
                    </div>


                    <h2>
                        ${match.title || "Cricket Match"}
                    </h2>


                    <div class="teams">

                        <div class="team">
                            <strong>${match.team1 || "Team 1"}</strong>
                        </div>

                        <span class="vs">VS</span>

                        <div class="team">
                            <strong>${match.team2 || "Team 2"}</strong>
                        </div>

                    </div>


                    <div class="match-info">

                        <p>
                            📅 ${match.date || "Date TBA"}
                        </p>

                        <p>
                            ⏰ ${match.time || "Time TBA"}
                        </p>

                        <p>
                            📍 ${match.venue || "Venue TBA"}
                        </p>

                    </div>


                    ${
                        match.result
                        ?
                        `<div class="match-result">
                            ${match.result}
                        </div>`
                        :
                        ""
                    }

                </div>

            `;

        });

    }

    catch (error) {

        console.error("Load Matches Error:", error);

        matchesContainer.innerHTML = `
            <div class="match-empty">
                <h2>❌ Unable to Load Matches</h2>
                <p>Please try again later.</p>
            </div>
        `;

    }

}


loadMatches();