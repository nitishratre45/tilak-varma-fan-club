// Firebase

import { db } from "../admin/firebase.js";

import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ======================
// Load Gallery
// ======================

async function loadGallery() {

    const container = document.getElementById("galleryContainer");

    container.innerHTML = "<h2>Loading Gallery...</h2>";

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        container.innerHTML = "";

        snapshot.forEach((doc) => {

            const photo = doc.data();

            container.innerHTML += `

            <div class="gallery-item">

                <img src="${photo.image}" alt="Gallery Image">

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

        container.innerHTML = "<h2>No Photos Available.</h2>";

    }

}

loadGallery();

// ======================
// Lightbox
// ======================

function enableLightbox(){

const images=document.querySelectorAll(".gallery-item img");

const lightbox=document.getElementById("lightbox");

const lightboxImg=document.getElementById("lightbox-img");

const close=document.getElementById("close");

images.forEach(img=>{

img.onclick=()=>{

lightbox.style.display="flex";

lightboxImg.src=img.src;

};

});

close.onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};

}