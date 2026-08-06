window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.visibility = "hidden";

    }, 1800);

    reveal(); // Page load hote hi visible sections show ho jayenge
});

const reveals = document.querySelectorAll(".reveal");

function reveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach((item) => {
        const revealTop = item.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
// Active Navbar

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
// =====================
// Animated Counter
// =====================

const counters = document.querySelectorAll(".counter");

const speed = 60;

const startCounter = () => {

    counters.forEach(counter => {

        const updateCount = () => {

            const target = +counter.getAttribute("data-target");

            const count = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (count < target) {

                counter.innerText = count + increment;

                setTimeout(updateCount, 25);

            } else {

                counter.innerText = target;

            }

        };

        updateCount();

    });

};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        startCounter();

        observer.disconnect();

    }

}, { threshold: 0.5 });

observer.observe(statsSection);
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menu.onclick = () => {
    nav.classList.toggle("active");
}
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
const gallery = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.getElementById("close");

gallery.forEach(img => {
    img.onclick = () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    }
})

close.onclick = () => {
    lightbox.style.display = "none";
}
const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {
    document.body.classList.toggle("light");

    themeBtn.innerHTML =
        document.body.classList.contains("light") ? "🌞" : "🌙";
};