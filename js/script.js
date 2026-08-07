import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCIbWp-r1ofg3TCxmGwr6OIZMfYkBf7fQ4",
  authDomain: "tilak-varma-fan-club.firebaseapp.com",
  projectId: "tilak-varma-fan-club",
  storageBucket: "tilak-varma-fan-club.firebasestorage.app",
  messagingSenderId: "362732593494",
  appId: "1:362732593494:web:768a0aacda61ae5891f6f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);
// =====================
// Loader
// =====================

window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.visibility = "hidden";
    }, 1800);

    reveal();

});
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