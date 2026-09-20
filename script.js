
/* =====================================================
   MOHAMMED LEKRAA — INTERACTIONS
===================================================== */


/* LOADER */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");
    const progress = document.querySelector(".loader-progress");
    const percent = document.querySelector(".loader-percent");
    const status = document.querySelector(".loader-status-text");

    if (!loader || !progress || !percent) return;

    let value = 0;

    const statuses = [
        "INITIALIZING SYSTEM",
        "LOADING INTERFACE",
        "CALIBRATING COMPONENTS",
        "CONNECTING MODULES",
        "SYSTEM READY"
    ];

    const interval = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 4;

        if (value >= 100) {

            value = 100;
            clearInterval(interval);

            if (status) {
                status.textContent = statuses[4];
            }

            setTimeout(() => {
                loader.classList.add("loaded");
            }, 450);

        } else if (status) {

            const index = Math.min(
                Math.floor(value / 25),
                statuses.length - 2
            );

            status.textContent = statuses[index];

        }

        progress.style.width = `${value}%`;
        percent.textContent = `${value}%`;

    }, 65);

});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* MAGNETIC BUTTONS */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX - rect.left - rect.width / 2;

        const y =
            event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0, 0)";

    });

});


/* PORTRAIT PARALLAX */

const portrait = document.querySelector(".hero-portrait");

if (portrait && window.matchMedia("(pointer: fine)").matches) {

    portrait.addEventListener("mousemove", (event) => {

        const rect = portrait.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        portrait.style.transform =
            `perspective(1100px)
             rotateY(${x * 3}deg)
             rotateX(${y * -2}deg)`;

    });

    portrait.addEventListener("mouseleave", () => {

        portrait.style.transform =
            "perspective(1100px) rotateY(0deg) rotateX(0deg)";

    });

}


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNavigation() {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.style.color = "";

        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "#2457ff";
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


/* PROJECT CARD POINTER GLOW */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("pointermove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--pointer-x", `${x}px`);
        card.style.setProperty("--pointer-y", `${y}px`);

    });

});
