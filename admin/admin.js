import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// =======================
// Hide All Panels
// =======================

function hideAllPanels() {

    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("newsPanel").style.display = "none";
    document.getElementById("galleryPanel").style.display = "none";
    document.getElementById("careerPanel").style.display = "none";
    document.getElementById("recordsPanel").style.display = "none";
    document.getElementById("matchesPanel").style.display = "none";
    document.getElementById("settingsPanel").style.display = "none";

}

// =======================
// Sidebar Functions
// =======================

window.showDashboard = function () {

    hideAllPanels();
    document.getElementById("dashboardContent").style.display = "block";

};

window.showNews = function () {

    hideAllPanels();
    document.getElementById("newsPanel").style.display = "block";

};

window.showGallery = function () {

    hideAllPanels();
    document.getElementById("galleryPanel").style.display = "block";

};

window.showCareer = function () {

    hideAllPanels();
    document.getElementById("careerPanel").style.display = "block";

};

window.showRecords = function () {

    hideAllPanels();
    document.getElementById("recordsPanel").style.display = "block";

};

window.showMatches = function () {

    hideAllPanels();
    document.getElementById("matchesPanel").style.display = "block";

};

window.showSettings = function () {

    hideAllPanels();
    document.getElementById("settingsPanel").style.display = "block";

};

// =======================
// Logout
// =======================

window.logout = function () {

    window.location.href = "index.html";

};

// =======================
// Add News
// =======================

window.addNews = async function () {

    const title = document.getElementById("newsTitle").value.trim();
    const description = document.getElementById("newsDesc").value.trim();
    const imageName = document.getElementById("newsImageName").value.trim();

    if (!title || !description || !imageName) {

        alert("Please fill all fields");
        return;

    }

    try {

        await addDoc(collection(db, "news"), {

            title: title,
            description: description,
            image: "image/" + imageName,
            date: new Date().toLocaleDateString()

        });

        alert("✅ News Published Successfully");

        document.getElementById("newsTitle").value = "";
        document.getElementById("newsDesc").value = "";
        document.getElementById("newsImageName").value = "";

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

};

// =======================
// Add Gallery Photo
// =======================

window.addGallery = async function () {

    const image = document.getElementById("galleryImage").value.trim();

    if (!image) {

        alert("Please enter image name.");
        return;

    }

    try {

        await addDoc(collection(db, "gallery"), {

            image: "image/" + image,
            date: new Date().toLocaleDateString()

        });

        alert("✅ Photo Uploaded Successfully");

        document.getElementById("galleryImage").value = "";

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

};
async function loadDashboard() {

    const newsSnap = await getDocs(collection(db, "news"));

    document.getElementById("totalNews").innerHTML = newsSnap.size;

    const gallerySnap = await getDocs(collection(db, "gallery"));

    document.getElementById("totalGallery").innerHTML = gallerySnap.size;

}

loadDashboard();