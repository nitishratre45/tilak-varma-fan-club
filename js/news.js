// Firebase
import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Load News

async function loadNews() {

    const params = new URLSearchParams(window.location.search);
   const newsId = params.get("id");

    if (newsId) {

    const newsDoc = await getDoc(doc(db, "news", newsId));

    if (newsDoc.exists()) {

        const news = newsDoc.data();

        newsContainer.innerHTML = `

            <article class="news-full">

                <img
                    src="${news.image}"
                    alt="${news.title}"
                    class="news-full-image"
                >

                <div class="news-full-content">

                    <small>Latest News</small>

                    <h1>${news.title}</h1>

                    <p>${news.description}</p>

                </div>

            </article>


            `;

    };


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