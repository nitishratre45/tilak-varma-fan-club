import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

window.showDashboard = function () {
    document.getElementById("dashboardContent").style.display = "block";
    document.getElementById("newsPanel").style.display = "none";
};

window.showNews = function () {
    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("newsPanel").style.display = "block";
};

window.logout = function () {
    window.location.href = "index.html";
};

window.addNews = async function () {

    const title = document.getElementById("newsTitle").value;
    const description = document.getElementById("newsDesc").value;

    if (!title || !description) {
        alert("Please fill all fields");
        return;
    }

    try {

        await addDoc(collection(db, "news"), {
            title,
            description,
            image: "https://picsum.photos/500/300"
        });

        alert("News Published Successfully ✅");

        document.getElementById("newsTitle").value = "";
        document.getElementById("newsDesc").value = "";

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};