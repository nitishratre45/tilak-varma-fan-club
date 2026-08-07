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

                <h2>No Photos Available</h2>

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
                data-index="${index}">

                <div class="gallery-overlay">

                    <i class="fa-solid fa-expand"></i>

                </div>

            </div>

            `;

        });

        enableLightbox();

    }

    catch(err){

        console.log(err);

    }

}
// ===========================
// Lightbox
// ===========================

function enableLightbox() {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.getElementById("close");

    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach((img) => {

        img.addEventListener("click", () => {

            currentIndex = Number(img.dataset.index);

            openImage();

        });

    });

    if (close) {

        close.onclick = () => {

            lightbox.style.display = "none";

        };

    }

    if (lightbox) {

        lightbox.onclick = (e) => {

            if (e.target === lightbox) {

                lightbox.style.display = "none";

            }

        };

    }

}


// ===========================
// Open Image
// ===========================

function openImage() {

    const lightbox = document.getElementById("lightbox");

    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";

    lightboxImg.src = images[currentIndex];

}


// ===========================
// Download Image
// ===========================

window.downloadImage = function () {

    const link = document.createElement("a");

    link.href = images[currentIndex];

    link.download = "Tilak-Varma.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}
// ===========================
// Previous Image
// ===========================

window.previousImage = function () {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    openImage();

};


// ===========================
// Next Image
// ===========================

window.nextImage = function () {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    openImage();

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