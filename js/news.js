// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXXXXXXXX",
    appId: "XXXXXXXXXXXXX"
};

// Firebase Init

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Load News

async function loadNews() {

    const container = document.getElementById("newsContainer");

    container.innerHTML = "<h2>Loading News...</h2>";

    try {

        const q = query(collection(db, "news"));

        const snapshot = await getDocs(q);

        container.innerHTML = "";

        snapshot.forEach((doc) => {

            const news = doc.data();

            container.innerHTML += `

            <div class="news-card">

                <img src="${news.image}" alt="">

                <div class="news-content">

                    <span class="news-date">
                        ${news.date || "Latest"}
                    </span>

                    <h3>${news.title}</h3>

                    <p>${news.description}</p>

                    <a href="news-details.html?id=${doc.id}" class="read-btn">

                     Read More →

                    </a>

                </div>

            </div>

            `;

        });

    }

    catch (err) {

        container.innerHTML = "<h2>Unable to load news.</h2>";

        console.error(err);

    }

}

loadNews();

// =========================
// Search News
// =========================

const search = document.getElementById("searchNews");

search.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".news-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});