import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const galleryGrid = document.querySelector(".gallery-grid");

let images = [];
let currentIndex = 0;

// ===========================
// Load Gallery
// ===========================

async function loadGallery() {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";
    images = [];

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        if (snapshot.empty) {

            galleryGrid.innerHTML = `
                <h2 style="color:white;text-align:center;">
                    No Photos Available
                </h2>
            `;

            return;
        }

        snapshot.forEach((doc) => {

            const photo = doc.data();

            images.push(photo.image);

        });

        images.forEach((url, index) => {

            galleryGrid.innerHTML += `

            <div class="gallery-item">

                <img
                    src="${url}"
                    data-index="${index}"
                    class="gallery-image">

                <div class="gallery-overlay">
                    <i class="fa-solid fa-expand"></i>
                </div>

            </div>

            `;

        });

        enableLightbox();

    }

    catch (err) {

        console.error(err);

    }

}
// ===========================
// Lightbox
// ===========================

function enableLightbox() {

    const galleryImages = document.querySelectorAll(".gallery-image");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.getElementById("close");

    galleryImages.forEach((img) => {

        img.addEventListener("click", () => {

            currentIndex = Number(img.dataset.index);

            lightbox.style.display = "flex";
            lightboxImg.src = images[currentIndex];

        });

    });

    close.onclick = () => {

        lightbox.style.display = "none";

    };

    lightbox.onclick = (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    };

}

// ===========================
// Previous Image
// ===========================

window.previousImage = function () {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    document.getElementById("lightbox-img").src = images[currentIndex];

};

// ===========================
// Next Image
// ===========================

window.nextImage = function () {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    document.getElementById("lightbox-img").src = images[currentIndex];

};
// ===========================
// Download Image
// ===========================

window.downloadImage = function () {

    let url = images[currentIndex];

    // Cloudinary URL ko forced download URL me convert karo
    url = url.replace("/upload/", "/upload/fl_attachment/");

    window.open(url, "_blank");

};


// ===========================
// Keyboard Support
// ===========================

document.addEventListener("keydown", (e) => {

    const lightbox = document.getElementById("lightbox");

    if (!lightbox || lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") {

        nextImage();

    }

    if (e.key === "ArrowLeft") {

        previousImage();

    }

    if (e.key === "Escape") {

        lightbox.style.display = "none";

    }

});


// ===========================
// Initialize
// ===========================

loadGallery();
// ===========================
// MOBILE MENU
// ===========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}