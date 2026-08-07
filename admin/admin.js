import { db, storage } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


// ==============================
// Hide All Panels
// ==============================

function hideAllPanels() {

    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("newsPanel").style.display = "none";
    document.getElementById("galleryPanel").style.display = "none";
    document.getElementById("careerPanel").style.display = "none";
    document.getElementById("recordsPanel").style.display = "none";
    document.getElementById("matchesPanel").style.display = "none";
    document.getElementById("settingsPanel").style.display = "none";

}


// ==============================
// Sidebar Buttons
// ==============================

window.showDashboard = function(){

    hideAllPanels();

    document.getElementById("dashboardContent").style.display="block";

}

window.showNews = function(){

    hideAllPanels();

    document.getElementById("newsPanel").style.display="block";

}

window.showGallery = function(){

    hideAllPanels();

    document.getElementById("galleryPanel").style.display="block";

}

window.showCareer = function(){

    hideAllPanels();

    document.getElementById("careerPanel").style.display="block";

}

window.showRecords = function(){

    hideAllPanels();

    document.getElementById("recordsPanel").style.display="block";

}

window.showMatches = function(){

    hideAllPanels();

    document.getElementById("matchesPanel").style.display="block";

}

window.showSettings = function(){

    hideAllPanels();

    document.getElementById("settingsPanel").style.display="block";

}


// ==============================
// Logout
// ==============================

window.logout=function(){

    location.href="index.html";

}
// ==============================
// Add News
// ==============================

window.addNews = async function () {

    const title = document.getElementById("newsTitle").value.trim();
    const description = document.getElementById("newsDesc").value.trim();
    const imageFile = document.getElementById("newsImage").files[0];

    if (!title || !description || !imageFile) {

        alert("Please fill all fields and select an image.");
        return;

    }

    try {

        // Upload image to Firebase Storage
        const fileName = Date.now() + "_" + imageFile.name;

        const storageRef = ref(storage, "news/" + fileName);

        await uploadBytes(storageRef, imageFile);

        const imageURL = await getDownloadURL(storageRef);

        // Save data in Firestore
        await addDoc(collection(db, "news"), {

            title: title,
            description: description,
            image: imageURL,
            date: new Date().toLocaleDateString()

        });

        alert("✅ News Published Successfully");

        // Clear form
        document.getElementById("newsTitle").value = "";
        document.getElementById("newsDesc").value = "";
        document.getElementById("newsImage").value = "";

        loadDashboard();
        loadNewsList();

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

};
// ==============================
// Add Gallery Photo
// ==============================

window.addGallery = async function () {

    const imageFile = document.getElementById("galleryImage").files[0];

    if (!imageFile) {

        alert("Please select an image.");
        return;

    }

    try {

        // Upload image to Firebase Storage
        const fileName = Date.now() + "_" + imageFile.name;

        const storageRef = ref(storage, "gallery/" + fileName);

        await uploadBytes(storageRef, imageFile);

        const imageURL = await getDownloadURL(storageRef);

        // Save image URL in Firestore
        await addDoc(collection(db, "gallery"), {

            image: imageURL,
            date: new Date().toLocaleDateString()

        });

        alert("✅ Gallery Photo Uploaded");

        document.getElementById("galleryImage").value = "";

        loadDashboard();

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

};
// ==============================
// Dashboard Count
// ==============================

async function loadDashboard() {

    try {

        const newsSnap = await getDocs(collection(db, "news"));
        document.getElementById("totalNews").innerHTML = newsSnap.size;

        const gallerySnap = await getDocs(collection(db, "gallery"));
        document.getElementById("totalGallery").innerHTML = gallerySnap.size;

    } catch (err) {

        console.error(err);

    }

}


// ==============================
// Load News List
// ==============================

async function loadNewsList() {

    const newsList = document.getElementById("newsList");

    if (!newsList) return;

    newsList.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "news"));

        snapshot.forEach((item) => {

            const news = item.data();

            newsList.innerHTML += `

            <div class="news-item">

                <div>

                    <h3>${news.title}</h3>

                    <small>${news.date}</small>

                </div>

                <div class="news-actions">

                    <button
                        class="delete-btn"
                        onclick="deleteNews('${item.id}')">

                        🗑 Delete

                    </button>

                </div>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}