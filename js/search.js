// ==========================================
// SITE SEARCH
// NEWS + RECORDS + MATCHES
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTS
// ==========================================

const searchInput =
    document.getElementById("siteSearch");

const searchResults =
    document.getElementById("searchResults");

const clearSearch =
    document.getElementById("clearSearch");


if (!searchInput || !searchResults) {
    console.log("Search elements not found.");
}


// ==========================================
// DATA
// ==========================================

let searchData = [];


// ==========================================
// LOAD SEARCH DATA
// ==========================================

async function loadSearchData() {

    try {

        searchData = [];


        // ==============================
        // NEWS
        // ==============================

        const newsSnapshot =
            await getDocs(
                collection(db, "news")
            );

        newsSnapshot.forEach((doc) => {

            const data = doc.data();

            searchData.push({

                id: doc.id,

                type: "News",

                title:
                    data.title ||
                    "Untitled News",

                description:
                    data.description ||
                    "",

                image:
                    data.image ||
                    "image/tilak.png",

                url:
                    `news-details.html?id=${doc.id}`

            });

        });


        // ==============================
        // RECORDS
        // ==============================

        const recordsSnapshot =
            await getDocs(
                collection(db, "records")
            );

        recordsSnapshot.forEach((doc) => {

            const data = doc.data();

            searchData.push({

                id: doc.id,

                type: "Record",

                title:
                    data.title ||
                    "Record",

                description:
                    `${data.value || ""} ${data.description || ""}`,

                image:
                    "image/tilak.png",

                url:
                    "records.html"

            });

        });


        // ==============================
        // MATCHES
        // ==============================

        const matchesSnapshot =
            await getDocs(
                collection(db, "matches")
            );

        matchesSnapshot.forEach((doc) => {

            const data = doc.data();

            searchData.push({

                id: doc.id,

                type: "Match",

                title:
                    data.title ||
                    `${data.team1 || "Team 1"} vs ${data.team2 || "Team 2"}`,

                description:
                    `${data.team1 || ""} ${data.team2 || ""} ${data.venue || ""} ${data.status || ""}`,

                image:
                    "image/tilak.png",

                url:
                    "matches.html"

            });

        });


        console.log(
            "Search Data Loaded:",
            searchData
        );

    }

    catch (error) {

        console.error(
            "Search Data Error:",
            error
        );

    }

}


// ==========================================
// SEARCH
// ==========================================

function performSearch() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    // Empty search

    if (!keyword) {

        searchResults.style.display =
            "none";

        searchResults.innerHTML = "";

        clearSearch.style.display =
            "none";

        return;

    }


    clearSearch.style.display =
        "block";


    // Find matches

    const results =
        searchData
            .filter(item => {

                const text = `

                    ${item.title}

                    ${item.description}

                    ${item.type}

                `.toLowerCase();

                return text.includes(keyword);

            })
            .slice(0, 10);


    searchResults.innerHTML = "";


    // No result

    if (results.length === 0) {

        searchResults.innerHTML = `

            <div class="search-no-result">

                🔍 No results found for

                <strong>
                    "${searchInput.value}"
                </strong>

            </div>

        `;

        searchResults.style.display =
            "block";

        return;

    }


    // Show results

    results.forEach(item => {

        const result =
            document.createElement("a");

        result.className =
            "search-result";

        result.href =
            item.url;


        result.innerHTML = `

            <img
                src="${item.image}"
                alt=""
                onerror="this.src='image/tilak.png'"
            >

            <div class="search-result-content">

                <h4>
                    ${item.title}
                </h4>

                <span>
                    ${item.type}
                </span>

            </div>

        `;


        searchResults.appendChild(result);

    });


    searchResults.style.display =
        "block";

}


// ==========================================
// INPUT EVENT
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        performSearch
    );

}


// ==========================================
// CLEAR BUTTON
// ==========================================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            searchResults.innerHTML = "";

            searchResults.style.display =
                "none";

            clearSearch.style.display =
                "none";

            searchInput.focus();

        }
    );

}


// ==========================================
// CLOSE RESULTS OUTSIDE
// ==========================================

document.addEventListener(
    "click",
    (event) => {

        const searchBox =
            document.querySelector(
                ".site-search"
            );

        if (
            searchBox &&
            !searchBox.contains(event.target)
        ) {

            searchResults.style.display =
                "none";

        }

    }
);


// ==========================================
// START
// ==========================================

loadSearchData();