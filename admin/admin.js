import { db } from "./firebase.js";
import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// ===============================
// Cloudinary Config
// ===============================

const CLOUD_NAME = "wad76b1f";
const UPLOAD_PRESET = "tilakfanclub";

async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(

        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {

            method: "POST",

            body: formData

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.error?.message || "Cloudinary Upload Failed");

    }

    return data.secure_url;

}
// ======================================
// Hide All Panels
// ======================================

function hideAllPanels() {

    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("statsPanel").style.display = "none";
    document.getElementById("newsPanel").style.display = "none";
    document.getElementById("galleryPanel").style.display = "none";
    document.getElementById("careerPanel").style.display = "none";
    document.getElementById("recordsPanel").style.display = "none";
    document.getElementById("matchesPanel").style.display = "none";
    document.getElementById("instagramPanel").style.display = "none";
    document.getElementById("settingsPanel").style.display = "none";

}


// ======================================
// Sidebar Functions
// ======================================

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

    window.loadRecords();

};


window.showMatches = function () {

    hideAllPanels();

    document.getElementById("matchesPanel").style.display = "block";

    loadMatches();

};
window.showSettings = function () {

    hideAllPanels();

    document.getElementById("settingsPanel").style.display = "block";

};
window.showStats = function () {

    hideAllPanels();

    document.getElementById("statsPanel").style.display = "block";

};

// ======================================
// Logout
// ======================================

window.logout = function () {

    window.location.href = "index.html";

};

// ======================================
// Add News
// ======================================

// ==============================
// Add News (Cloudinary)
// ==============================

window.addNews = async function () {

    const title = document.getElementById("newsTitle").value.trim();

    const description = document.getElementById("newsDesc").value.trim();

    const imageFile = document.getElementById("newsImage").files[0];

    if (!title || !description || !imageFile) {

        alert("Please fill all fields.");
        return;

    }

    try {

        // Upload image to Cloudinary
        const imageURL = await uploadToCloudinary(imageFile);

        // Save News in Firestore
        await addDoc(collection(db, "news"), {

            title: title,
            description: description,
            image: imageURL,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now()

        });

        alert("✅ News Published Successfully");

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
// Add Gallery (Cloudinary)
// ==============================

window.addGallery = async function () {

    const imageFile = document.getElementById("galleryImage").files[0];

    if (!imageFile) {

        alert("Please select an image.");
        return;

    }

    try {

        // Upload to Cloudinary
        const imageURL = await uploadToCloudinary(imageFile);

        // Save URL in Firestore
        await addDoc(collection(db, "gallery"), {

            image: imageURL,
            date: new Date().toLocaleDateString()

        });

        alert("✅ Gallery Photo Uploaded Successfully");

        document.getElementById("galleryImage").value = "";

        loadDashboard();

        if (typeof loadGalleryList === "function") {

            loadGalleryList();

        }

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

};
// ======================================
// Dashboard Count
// ======================================

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


// ======================================
// Load News List
// ======================================

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

        console.error(err);

    }

}


// ======================================
// Load Gallery List
// ======================================

async function loadGalleryList() {

    const galleryList = document.getElementById("galleryList");

    if (!galleryList) return;

    galleryList.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        snapshot.forEach((item) => {

            const photo = item.data();

            galleryList.innerHTML += `

            <div class="gallery-card">

                <img src="${photo.image}" alt="Gallery">

                <button onclick="deleteGallery('${item.id}')">

                    Delete

                </button>

            </div>

            `;

        });

    } catch (err) {

        console.error(err);

    }

}


// ======================================
// Delete News
// ======================================

window.deleteNews = async function(id){

    if(!confirm("Delete this news?")) return;

    try{

        await deleteDoc(doc(db,"news",id));

        loadDashboard();
        loadNewsList();

        alert("News Deleted");

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

};


// ======================================
// Delete Gallery
// ======================================

window.deleteGallery = async function(id){

    if(!confirm("Delete this photo?")) return;

    try{

        await deleteDoc(doc(db,"gallery",id));

        loadDashboard();
        loadGalleryList();

        alert("Photo Deleted");

    }

    catch(err){

        console.error(err);

        alert(err.message);

    }

};


// ======================================
// Initialize
// ======================================

window.addEventListener("load",()=>{

    loadDashboard();

    loadNewsList();

    loadGalleryList();

});
window.saveStats = async function () {

    try {

        await setDoc(doc(db, "stats", "home"), {

            matches: document.getElementById("matches").value,

            runs: document.getElementById("runs").value,

            average: document.getElementById("average").value,

            strikeRate: document.getElementById("strikeRate").value,

            hundreds: document.getElementById("hundreds").value,

            fifties: document.getElementById("fifties").value

        });

        alert("✅ Stats Saved Successfully");

    } catch (error) {

        console.error(error);

        alert("❌ Failed to Save");

    }

};

// ======================================
// ADD MATCH
// ======================================

window.addMatch = async function () {

    const title = document.getElementById("matchTitle").value.trim();
    const team1 = document.getElementById("team1").value.trim();
    const team2 = document.getElementById("team2").value.trim();
    const date = document.getElementById("matchDate").value;
    const time = document.getElementById("matchTime").value;
    const venue = document.getElementById("venue").value.trim();
    const status = document.getElementById("matchStatus").value.trim();
    const result = document.getElementById("matchResult").value.trim();

    if (!title || !team1 || !team2 || !date || !time) {
        alert("⚠️ Please fill Match Title, Teams, Date and Time");
        return;
    }

    try {

        await addDoc(collection(db, "matches"), {

            title: title,
            team1: team1,
            team2: team2,
            date: date,
            time: time,
            venue: venue,
            status: status || "Upcoming",
            result: result,
            timestamp: Date.now()

        });

        alert("✅ Match Added Successfully");
    

        document.getElementById("matchTitle").value = "";
        document.getElementById("team1").value = "";
        document.getElementById("team2").value = "";
        document.getElementById("matchDate").value = "";
        document.getElementById("matchTime").value = "";
        document.getElementById("venue").value = "";
        document.getElementById("matchStatus").value = "";
        document.getElementById("matchResult").value = "";

    } catch (error) {

        console.error("Match Error:", error);

        alert("❌ Failed to Add Match");

    }

};

// ======================================
// LOAD MATCHES IN DASHBOARD
// ======================================

window.loadMatches = async function () {

    const matchesList = document.getElementById("matchesList");

    if (!matchesList) return;

    matchesList.innerHTML = "Loading Matches...";

    try {

        const snapshot = await getDocs(
            collection(db, "matches")
        );

        if (snapshot.empty) {

            matchesList.innerHTML = `
                <p>No matches added yet.</p>
            `;

            return;
        }

        matchesList.innerHTML = "";

        snapshot.forEach((matchDoc) => {

            const match = matchDoc.data();

            matchesList.innerHTML += `

                <div class="admin-match-card">

                    <h3>
                        ${match.title || "Cricket Match"}
                    </h3>

                    <p>
                        <strong>
                            ${match.team1 || "Team 1"}
                        </strong>

                        &nbsp; VS &nbsp;

                        <strong>
                            ${match.team2 || "Team 2"}
                        </strong>
                    </p>

                    <p>
                        📅 ${match.date || "Date TBA"}
                    </p>

                    <p>
                        ⏰ ${match.time || "Time TBA"}
                    </p>

                    <p>
                        📍 ${match.venue || "Venue TBA"}
                    </p>

                    <p>
                        Status:
                        ${match.status || "Upcoming"}
                    </p>

                    ${
                        match.result
                        ? `<p>${match.result}</p>`
                        : ""
                    }

                    <button
                        onclick="deleteMatch('${matchDoc.id}')">
                        🗑️ Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error("Load Matches Error:", error);

        matchesList.innerHTML =
            "<p>❌ Failed to load matches.</p>";

    }

};window.deleteMatch = async function (id) {

    if (!confirm("Delete this match?")) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "matches", id)
        );

        alert("✅ Match Deleted");

        window.loadMatches();

    } catch (error) {

        console.error(error);

        alert("❌ Failed to Delete Match");

    }

};


// ======================================
// ADD RECORD
// ======================================

window.addRecord = async function () {

    const title =
        document.getElementById("recordTitle").value.trim();

    const value =
        document.getElementById("recordValue").value.trim();

    const description =
        document.getElementById("recordDescription").value.trim();


    if (!title || !value) {

        alert("⚠️ Please enter Record Title and Value");

        return;
    }


    try {

        await addDoc(
            collection(db, "records"),
            {

                title: title,

                value: value,

                description: description,

                timestamp: Date.now()

            }
        );


        alert("✅ Record Added Successfully");


        document.getElementById("recordTitle").value = "";

        document.getElementById("recordValue").value = "";

        document.getElementById("recordDescription").value = "";


        window.loadRecords();

    }

    catch (error) {

        console.error("Record Error:", error);

        alert("❌ Failed to Add Record");

    }

};


// ======================================
// LOAD RECORDS IN DASHBOARD
// ======================================

window.loadRecords = async function () {

    const recordsList =
        document.getElementById("recordsList");

    if (!recordsList) return;


    recordsList.innerHTML =
        "Loading Records...";


    try {

        const snapshot =
            await getDocs(
                collection(db, "records")
            );


        if (snapshot.empty) {

            recordsList.innerHTML = `
                <p>No records added yet.</p>
            `;

            return;

        }


        recordsList.innerHTML = "";


        snapshot.forEach((recordDoc) => {

            const record =
                recordDoc.data();


            recordsList.innerHTML += `

                <div class="admin-record-card">

                    <h3>
                        ${record.title}
                    </h3>

                    <h2>
                        ${record.value}
                    </h2>

                    <p>
                        ${record.description || ""}
                    </p>

                    <button
                        onclick="deleteRecord('${recordDoc.id}')">

                        🗑️ Delete

                    </button>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(
            "Load Records Error:",
            error
        );

        recordsList.innerHTML =
            "<p>❌ Failed to load records.</p>";

    }

};


// ======================================
// DELETE RECORD
// ======================================

window.deleteRecord = async function (id) {

    if (!confirm("Delete this record?")) {
        return;
    }


    try {

        await deleteDoc(
            doc(db, "records", id)
        );


        alert("✅ Record Deleted");


        window.loadRecords();

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to Delete Record");

    }

};

// ======================================
// DASHBOARD OVERVIEW
// ======================================

async function loadDashboardOverview() {

    try {

        const newsSnapshot =
            await getDocs(collection(db, "news"));

        const gallerySnapshot =
            await getDocs(collection(db, "gallery"));

        const recordsSnapshot =
            await getDocs(collection(db, "records"));

        const matchesSnapshot =
            await getDocs(collection(db, "matches"));


        // ===============================
        // TOTAL COUNTS
        // ===============================

        const totalNews =
            document.getElementById("totalNews");

        const totalGallery =
            document.getElementById("totalGallery");

        const totalRecords =
            document.getElementById("totalRecords");

        const totalMatches =
            document.getElementById("totalMatches");


        if (totalNews) {
            totalNews.textContent =
                newsSnapshot.size;
        }

        if (totalGallery) {
            totalGallery.textContent =
                gallerySnapshot.size;
        }

        if (totalRecords) {
            totalRecords.textContent =
                recordsSnapshot.size;
        }

        if (totalMatches) {
            totalMatches.textContent =
                matchesSnapshot.size;
        }


        // ===============================
        // RECENT ACTIVITY
        // ===============================

        const activity =
            document.getElementById("recentActivity");

        if (!activity) return;


        activity.innerHTML = `

            <div class="activity-item">
                📰
                <span>
                    ${newsSnapshot.size}
                    news articles published
                </span>
            </div>

            <div class="activity-item">
                📷
                <span>
                    ${gallerySnapshot.size}
                    gallery photos uploaded
                </span>
            </div>

            <div class="activity-item">
                🏆
                <span>
                    ${recordsSnapshot.size}
                    records available
                </span>
            </div>

            <div class="activity-item">
                🏏
                <span>
                    ${matchesSnapshot.size}
                    matches added
                </span>
            </div>

        `;

    }

    catch (error) {

        console.error(
            "Dashboard Overview Error:",
            error
        );

    }

}


// ======================================
// LOAD DASHBOARD
// ======================================

loadDashboardOverview();