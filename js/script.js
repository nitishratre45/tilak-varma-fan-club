
// ===========================================
// TILAK VARMA FAN CLUB
// script.js
// ===========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ===========================================
// LOADER
// ===========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 1000);

    }

});


// ===========================================
// MOBILE MENU
// ===========================================

const menu = document.querySelector(".menu");

const navLinks = document.querySelector(".nav-links");

if (menu && navLinks) {

    menu.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}



// ===========================================
// CLOSE MENU AFTER CLICK
// ===========================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


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


// ===========================================
// BACK TO TOP BUTTON
// ===========================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 300) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ===========================================
// SCROLL PROGRESS BAR
// ===========================================

window.addEventListener("scroll", () => {

    const progressBar = document.getElementById("progressBar");

    if (!progressBar) return;

    const scroll =

        (window.scrollY /

        (document.body.scrollHeight - window.innerHeight)) * 100;

    progressBar.style.width = scroll + "%";

});
// ===========================================
// REVEAL ANIMATION
// ===========================================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);


// ===========================================
// ACTIVE NAVBAR
// ===========================================

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }
      
    });

    links.forEach(link => {

        link.classList.remove("active");

        if (
            current &&
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ===========================================
// LIGHTBOX
// ===========================================

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");

function enableLightbox() {

    const images = document.querySelectorAll(".gallery-grid img");

    images.forEach((img) => {

        img.addEventListener("click", () => {

            if (!lightbox || !lightboxImg) return;

            lightbox.style.display = "flex";

            lightboxImg.src = img.src;

        });

    });

}

enableLightbox();

if (closeBtn) {

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}


// ===========================================
// COUNTER ANIMATION
// ===========================================

const counters = document.querySelectorAll(".counter");

function startCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 80;

        function updateCounter() {

            if (count < target) {

                count += speed;

                counter.innerText = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        }

        updateCounter();

    });

}

const statsSection = document.querySelector(".stats-section");

if (statsSection) {

    const observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting) {

            startCounters();

            observer.disconnect();

        }

    });

    observer.observe(statsSection);

}
// ===========================================
// LOAD LATEST 2 NEWS ON HOME
// ===========================================

async function loadNews() {

    const newsContainer = document.querySelector(".news-container");

    if (!newsContainer) return;

    newsContainer.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "news"));

        let html = "";

        // Home page par sirf latest 2 news
        const latestNews = snapshot.docs.slice(0, 2);

        latestNews.forEach((doc) => {

            const news = doc.data();

            html += `

                <div class="news-card">

                    <img
                        src="${news.image}"
                        alt="${news.title}"
                    >

                    <div class="news-content">

                        <small style="color:#00abf0;">
                            Latest News
                        </small>

                        <h3>${news.title}</h3>

                        <p>
                            ${news.description.substring(0, 120)}...
                        </p>

                        <a href="news.html" class="btn">
                            Read More →
                        </a>

                    </div>

                </div>

            `;

        });

        newsContainer.innerHTML = html;

    } catch (error) {

        console.error("News Loading Error:", error);

        newsContainer.innerHTML = `
            <p>News could not be loaded.</p>
        `;

    }

}

loadNews();
// ===========================================
// LOAD GALLERY
// ===========================================

async function loadGallery() {

    const gallery = document.querySelector(".gallery-grid");

    if (!gallery) return;

    gallery.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        let html = "";

        // Sirf latest 6 photos
        const docs = snapshot.docs.slice(0, 6);

        docs.forEach((doc) => {

            const photo = doc.data();

            html += `

            <img
                src="${photo.image}"
                alt="Gallery Image"
                class="gallery-photo"
            >

            `;

        });

        gallery.innerHTML = html;

        enableLightbox();

    }

    catch (error) {

        console.log(error);

        gallery.innerHTML = "<h3>Gallery Not Found.</h3>";

    }

}

loadGallery();

// ===========================================
// LIVE CRICKET MATCHES
// ===========================================

const API_KEY = "50c3cfa2-eec9-4d33-8309-22a8bdce1f64";

async function loadLiveMatches() {

    const container = document.getElementById("liveMatches");

    if (!container) return;

    container.innerHTML = "<p>Loading Matches...</p>";

    try {

        const response = await fetch(`https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`

        );

        const result = await response.json();

        container.innerHTML = "";

        if (!result.data || result.data.length === 0) {

            container.innerHTML = `

            <div class="match-card">

                <h3>No Live Match</h3>

                <p>No India / Tilak Varma match available.</p>

            </div>

            `;

            return;

        }

        const matches = result.data.filter(match => {

            const text = (

                (match.name || "") + " " +

                (match.series || "") + " " +

                (match.teamInfo?.map(team => team.name).join(" ") || "")

            ).toLowerCase();

            return (

                text.includes("india") ||

                text.includes("mumbai indians") ||

                text.includes("india a") ||

                text.includes("hyderabad")

            );

        });

        matches.slice(0,3).forEach(match => {

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `

                <h3>${match.teamInfo?.[0]?.name || "Team A"}

                vs

                ${match.teamInfo?.[1]?.name || "Team B"}</h3>

                <p>📅 ${match.date || "-"}</p>

                <p>📍 ${match.venue || "Venue Not Available"}</p>

                <p>📢 ${match.status || "Upcoming"}</p>

                

            `;

            container.appendChild(card);

        });

    }

    catch(error){

        console.log(error);

        container.innerHTML = `

        <div class="match-card">

            <h3>API Error</h3>

            <p>Unable to load matches.</p>

        </div>

        `;

    }

}

loadLiveMatches();



// ===========================================
// WELCOME POPUP
// ===========================================

const popup = document.getElementById("welcomePopup");

const closePopup = document.getElementById("closePopup");

if (popup && closePopup) {

    if (localStorage.getItem("welcomeShown")) {

        popup.style.display = "none";

    }

    closePopup.onclick = () => {

        popup.style.display = "none";

        localStorage.setItem("welcomeShown", "true");

    };

}


loadInstagramFollowers();

// ===========================================
// FINISHED
// ===========================================

console.log("✅ Tilak Varma Fan Club Loaded Successfully");
