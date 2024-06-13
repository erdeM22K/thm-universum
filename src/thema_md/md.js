const path = document.querySelector("#path");
const pathStart = 30;
const pathLength = path.getTotalLength() - pathStart;
const levelItem = document.querySelectorAll(".level");
const numberOfIcons = levelItem.length;
const iconSpacing = pathLength / numberOfIcons;
const startButton = document.getElementById('startButton');
const levels = ["Typografie", "Farben", "Formen"];
let currentLevel = 0;

for (let i = 0; i < numberOfIcons; i++) {
    const distance = pathStart + i * iconSpacing;
    const point = path.getPointAtLength(distance);
    levelItem[i].setAttribute('transform', `translate(${point.x - 8}, ${point.y - 8})`);
}

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

let spaceship = document.querySelector("#spaceship");
let start = 0;
let breakpointLevel = [0.14, 0.43, 0.72];

function placeSpaceshipOnPath() {
    gsap.to("#spaceship", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 0,
        }
    });
}
function updateButtonText() {
    if (currentLevel < levels.length) {
        startButton.textContent = `${levels[currentLevel]} besuchen`;
    } else {
        startButton.textContent = `${levels[0]} besuchen`;
    }
    gsap.to("#startButton", {
        opacity: 1,
        scale: 1,
        delay: 0.5,
        duration: 0.8,
        ease: "elastic.out(1,0.5)",
    });
}

function hideButton(delay) {
    gsap.to("#startButton", {
        opacity: 0,
        scale: 0.5,
        delay: delay,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
            updateButtonText();
        }
    });
}
function showButton(delay) {
    gsap.to("#startButton", {
        opacity: 1,
        scale: 1,
        delay: delay,
        duration: 0.5,
        ease: "elastic.out(1,0.5)",
    });
}
function animateToLevel(level) {
    hideButton();
    gsap.to("#spaceship", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: start,
            end: breakpointLevel[level],
        },
        onComplete: () => {

        }
    });
    start = breakpointLevel[level];
    currentLevel = level;
    showButton(0.8);
}

function setButtonAnimation(id, button) {
    button.addEventListener("mouseenter", function () {
        gsap.to(id, {
            backgroundColor: "#f1f1f1",
            duration: 0.2,
            color: "#80ba24",
        });
        gsap.to(id, {
            delay: 0.2,
            backgroundColor: "#80ba24",
            duration: 0.2,
            color: "#f1f1f1",
        });
        gsap.to(id, {
            scale: 1.05,
            duration: 0.2,
        });
    });

    button.addEventListener("mouseleave", function () {
        gsap.to(id, {
            scale: 1,
            duration: 0.2,
        });
    });
}

placeSpaceshipOnPath();
setButtonAnimation("#startButton", startButton);

levelItem.forEach((item, index) => {
    item.addEventListener("click", function () {
        animateToLevel(index);
    });
});

startButton.addEventListener("click", function () {
    switch (currentLevel) {
        case 0:
            window.location.href = "level1.html";
            break;
        case 1:
            window.location.href = "level2.html";
            break;
        case 2:
            window.location.href = "level3.html";
            break;
    }
});

gsap.to("#spaceship", {
    duration: 1,
    scale: 1.05,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});
