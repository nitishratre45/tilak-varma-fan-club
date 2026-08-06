// Firebase

import { db } from "../admin/firebase.js";

import {

    doc,
    getDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const newsId = params.get("id");

async function loadNewsDetails() {

    if (!newsId) {

        document.getElementById("newsTitle").innerHTML = "News Not Found";

        return;

    }

    try {

        const docRef = doc(db, "news", newsId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const news = docSnap.data();

            document.getElementById("newsImage").src = news.image;

            document.getElementById("newsTitle").innerHTML = news.title;

            document.getElementById("newsDate").innerHTML =
                news.date || "Latest Update";

            document.getElementById("newsDescription").innerHTML =
                news.description;

        }

        else {

            document.getElementById("newsTitle").innerHTML =
                "News Not Found";

        }

    }

    catch (err) {

        console.log(err);

    }

}

loadNewsDetails();