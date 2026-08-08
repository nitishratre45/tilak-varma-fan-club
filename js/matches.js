// ===========================================
// LIVE / UPCOMING CRICKET MATCHES
// ===========================================

const API_KEY = "50c3cfa2-eec9-4d33-8309-22a8bdce1f64";


// ===========================================
// LOAD MATCHES FROM API
// ===========================================

async function loadMatchesFromAPI() {

    const container =
        document.getElementById("matchesContainer");

    if (!container) return;


    container.innerHTML = `
        <div class="match-loading">
            🏏 Loading Matches...
        </div>
    `;


    try {

        const response = await fetch(
    `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
);

        if (!response.ok) {

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        const result = await response.json();


        console.log( "CRICAPI FULL RESPONSE:",
           JSON.stringify(result, null, 2)
        );


        if (!result.data || !Array.isArray(result.data)) {

            container.innerHTML = `
                <div class="match-card">

                    <h2>⚠️ No Match Data</h2>

                    <p>
                        Cricket match data is currently
                        unavailable.
                    </p>

                </div>
            `;

            return;
        }


        // ======================================
        // FILTER INDIA / TILAK RELATED MATCHES
        // ======================================

        const matches = result.data.filter(match => {


            // Team names
            const teamNames = (
                match.teamInfo
                    ?.map(team => team.name || "")
                    .join(" ") || ""
            );


            // Everything searchable
            const searchText = (

                (match.name || "") + " " +

                (match.series || "") + " " +

                (match.status || "") + " " +

                (match.venue || "") + " " +

                teamNames

            ).toLowerCase();


            // Remove extra spaces
            const text =
                searchText.replace(/\s+/g, " ");


            return (

                // India
                text.includes("india") ||

                // India Men
                text.includes("india men") ||

                // India A
                text.includes("india a") ||

                // Mumbai Indians
                text.includes("mumbai indians") ||

                // Hyderabad
                text.includes("hyderabad")

            );

        });


        // Clear container

        container.innerHTML = "";


        // ======================================
        // NO MATCH FOUND
        // ======================================

        if (matches.length === 0) {

            container.innerHTML = `
                <div class="match-card">

                    <h2>🇮🇳 No India Match Found</h2>

                    <p>
                        No India, India A or Mumbai Indians
                        match is currently available from
                        the cricket API.
                    </p>

                </div>
            `;

            return;
        }


        // ======================================
        // SHOW MAXIMUM 6 MATCHES
        // ======================================

        matches
            .slice(0, 6)
            .forEach(match => {


                // ==================================
                // TEAMS
                // ==================================

                const teamA =
                    match.teamInfo?.[0]?.name ||
                    "Team A";


                const teamB =
                    match.teamInfo?.[1]?.name ||
                    "Team B";


                // ==================================
                // DATE
                // ==================================

                let matchDate = "Date TBA";


                if (match.date) {

                    const dateObject =
                        new Date(match.date);

                    if (!isNaN(dateObject)) {

                        matchDate =
                            dateObject.toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            );

                    } else {

                        matchDate = match.date;

                    }

                }


                // ==================================
                // TIME
                // ==================================

                let matchTime = "Time TBA";


                if (match.dateTimeGMT) {

                    const dateTime =
                        new Date(match.dateTimeGMT);


                    if (!isNaN(dateTime)) {

                        matchTime =
                            dateTime.toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            );

                    }

                }


                // ==================================
                // CREATE CARD
                // ==================================

                const card =
                    document.createElement("div");


                card.className =
                    "match-card";


                card.innerHTML = `

                    <div class="match-status">

                        ${match.status || "Upcoming"}

                    </div>


                    <h2>

                        ${
                            match.name ||
                            `${teamA} vs ${teamB}`
                        }

                    </h2>


                    <div class="match-teams">


                        <div class="match-team">

                            ${teamA}

                        </div>


                        <div class="match-vs">

                            VS

                        </div>


                        <div class="match-team">

                            ${teamB}

                        </div>


                    </div>


                    <div class="match-info">


                        <p>

                            📅

                            <strong>

                                ${matchDate}

                            </strong>

                        </p>


                        <p>

                            ⏰

                            <strong>

                                ${matchTime}

                            </strong>

                        </p>


                        <p>

                            📍

                            ${match.venue ||
                            "Venue Not Available"}

                        </p>


                    </div>

                `;


                container.appendChild(card);

            });

    }


    catch (error) {

        console.error(
            "CricAPI Error:",
            error
        );


        container.innerHTML = `

            <div class="match-card">

                <h2>
                    ⚠️ Unable to Load Matches
                </h2>

                <p>
                    Cricket match data is temporarily
                    unavailable. Please try again later.
                </p>

            </div>

        `;

    }

}


// ===========================================
// INITIAL LOAD
// ===========================================

loadMatchesFromAPI();


// ===========================================
// AUTO UPDATE
// Every 5 Minutes
// ===========================================

setInterval(
    loadMatchesFromAPI,
    5 * 60 * 1000
);