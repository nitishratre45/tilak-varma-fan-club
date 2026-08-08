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


// ===========================
// MOBILE MENU
// ===========================

const menuToggle = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}




// ===========================================
// STICKY HEADER
// ===========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

// =================================
// MOBILE HEADER ON SCROLL
// =================================

window.addEventListener("scroll", () => {

    if (window.innerWidth <= 992) {

        if (window.scrollY > 80) {

            header.classList.add("scroll-hide");

        } else {

            header.classList.remove("scroll-hide");

        }

    }

});