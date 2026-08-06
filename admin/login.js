document.getElementById("loginBtn").onclick = function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("msg").innerHTML = "Wrong Username or Password";

    }

};