const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (username === "admin" && password === "12345") {

        window.location.href = "dashboard.html";

    } else {

        msg.innerText = "Wrong Username or Password";

    }

};