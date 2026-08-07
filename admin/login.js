document.getElementById("loginBtn").onclick = function () {

    const username = document.getElementById("username").value.trim().toLowerCase();
const password = document.getElementById("password").value.trim();
    if (username === "admin" && password === "12345") {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("msg").innerHTML = "Wrong Username or Password";

    }

};