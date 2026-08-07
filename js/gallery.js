import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const galleryContainer = document.querySelector(".gallery-grid");

async function loadGallery() {

    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        if (snapshot.empty) {

            galleryContainer.innerHTML = `
                <div class="empty-gallery">
                    <h2>📷 No Photos Available</h2>
                    <p>Gallery will be updated soon.</p>
                </div>
            `;

            return;
        }
                snapshot.forEach((doc) => {

            const photo = doc.data();

            galleryContainer.innerHTML += `

                <div class="gallery-item">

                    <img
                        src="${photo.image}"
                        alt="Tilak Varma">

                </div>

            `;

        });

        enableLightbox();

    } catch (err) {

        console.error(err);

        galleryContainer.innerHTML = `
            <div class="empty-gallery">
                <h2>❌ Error</h2>
                <p>Unable to load gallery.</p>
            </div>
        `;
    }

}
function enableLightbox() {

    const images = document.querySelectorAll(".gallery-item img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.getElementById("close");

    if (!lightbox || !lightboxImg || !close) return;

    images.forEach((img) => {

        img.onclick = () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        };

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

loadGallery();
const images = document.querySelectorAll(".gallery-item img");

images.forEach(img=>{
    img.onclick=()=>{
        document.getElementById("lightbox").style.display="flex";
        document.getElementById("lightbox-img").src=img.src;
    };
});

document.getElementById("close").onclick=()=>{
    document.getElementById("lightbox").style.display="none";
};