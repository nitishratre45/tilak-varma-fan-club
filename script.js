// =====================
// Loader
// =====================

window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.visibility = "hidden";
    }, 1800);

    reveal();

});

// =====================
// Scroll Reveal
// =====================

const reveals = document.querySelectorAll(".reveal");

function reveal() {

    const windowHeight = window.innerHeight;

    reveals.forEach((item) => {

        const revealTop = item.getBoundingClientRect().top;

        if (revealTop < windowHeight - 150) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", reveal);

// =====================
// Active Navbar
// =====================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
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

function startCounter() {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const update = () => {

            const count = +counter.innerText;
            const increment = Math.ceil(target / 60);

            if (count < target) {

                counter.innerText = count + increment;

                setTimeout(update, 25);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });

}

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        startCounter();
        observer.disconnect();

    }

}, {
    threshold: 0.5
});

if (statsSection) {
    observer.observe(statsSection);
}

// =====================
// Mobile Menu
// =====================

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menu.onclick = () => {

    nav.classList.toggle("active");

};

// =====================
// Back To Top
// =====================

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

// =====================
// Gallery Lightbox
// =====================

const gallery = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.getElementById("close");

gallery.forEach(img => {

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
// Auto close menu after clicking any link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});
// =====================
// Live Cricket Matches
// =====================

const API_KEY = "50c3cfa2-eec9-4d33-8309-22a8bdce1f64";

async function loadLiveMatches() {

    try {

        const response = await fetch(
            `https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`
        );

        const result = await response.json();

        const container = document.getElementById("liveMatches");

        if (!container) return;

        container.innerHTML = "";

        if (!result.data || result.data.length === 0) {
            container.innerHTML = "<p>No live matches available.</p>";
            return;
        }

        // Filter only India / Mumbai Indians / Hyderabad / India A
        const filteredMatches = result.data.filter(match => {

            const text = (
                (match.name || "") + " " +
                (match.series || "") + " " +
                (match.teamInfo?.map(team => team.name).join(" ") || "")
            ).toLowerCase();

            return (
                text.includes("india") ||
                text.includes("india a") ||
                text.includes("mumbai indians") ||
                text.includes("hyderabad")
            );

        });

        if (filteredMatches.length === 0) {

            container.innerHTML = `
                <div class="match-card">
                    <h3>🏏 No Match</h3>
                    <p>No India / Tilak Varma matches available.</p>
                    <div class="status">Check back later.</div>
                </div>
            `;

            return;
        }

        filteredMatches.slice(0, 6).forEach(match => {

            const card = document.createElement("div");
            card.className = "match-card";

            const team1 = match.teamInfo?.[0]?.name || "Team 1";
            const team2 = match.teamInfo?.[1]?.name || "Team 2";

            card.innerHTML = `
                <h3>${team1} vs ${team2}</h3>

                <p><strong>🏏 Match:</strong> ${match.matchType || "N/A"}</p>

                <p><strong>🏆 Series:</strong> ${match.name || "N/A"}</p>

                <p><strong>📅 Date:</strong> ${match.date || "N/A"}</p>

                <p><strong>📍 Venue:</strong> ${match.venue || "N/A"}</p>

                <div class="status">${match.status || "Upcoming"}</div>
            `;

            container.appendChild(card);

        });

    } catch (err) {

        console.error(err);

        const container = document.getElementById("liveMatches");

        if (container) {

            container.innerHTML = `
                <div class="match-card">
                    <h3>API Error</h3>
                    <p>Unable to load live matches.</p>
                </div>
            `;

        }

    }

}

loadLiveMatches();