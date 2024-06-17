const path = document.querySelector("#path");
const pathStart = 30;
const pathLength = path.getTotalLength() - pathStart;
const levelItem = document.querySelectorAll(".level");
const numberOfIcons = levelItem.length;
const iconSpacing = pathLength / numberOfIcons;
const startButton = document.getElementById('startButton');
const levels = ["Softwareplatformen", "Appdesign", "Sensoren"];
const textfeld = document.querySelector(".textfeld");
const copilotContainer = document.querySelector(".copilot_container");
let currentLevel = 0;
let text1 = "Wir landen auf dem Planeten der Mobilen Anwendungen. Hier kannst du die Stationen \"Softwareplattformen\", \"Appdesign\" und \"Sensoren\" besuchen.";


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


function startAnimation() {
    textfeld.style.display = "block";
    copilotContainer.style.display = "block";
    gsap.from(".textfeld", {
        y: 1500,
        duration: 3,
        ease: 'power4.out',
    });
    gsap.from(".copilot_container", {
        x: 1500,
        duration: 3,
        ease: 'power4.out',
    });
}
function clearText() {
    gsap.to("#text", {
        duration: 0.5,
        text: "",
        onComplete: function() {
            console.log("Textfeld geleert");
        }
    });
    document.getElementById("dots").style.display = "none";
}
function showNextText(text) {
    gsap.to("#text", {
        duration: 3,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation(text);
            console.log("Text wird ausgeführt");
        }
    });
}
function startDotsAnimation(lastText) {
    if (document.getElementById("text").innerText === lastText) {
        document.getElementById("dots").style.display = "none";
    } else {
        document.getElementById("dots").style.display = "block";
        gsap.to("#dots", { duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut", x: "+=10" });
        gsap.to("#dots", {
            duration: 2,
            repeat: -1,
            text: "...",
            onComplete: function() {

                console.log("Textfeld geleert");
            }
        });
    }
}
document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textElement.innerText === text1) {
            //clearText();
            //showNextText(text2);
            gsap.to(".textfeld", {
                y: 1500,
                duration: 3,
                ease: 'power4.out',
                opacity: 0,
                onComplete: function () {
                    textfeld.style.display = "none";
                }
            });
            gsap.to(".copilot_container", {
                x: 1500,
                duration: 3,
                ease: 'power4.out',
                opacity: 0,
                onComplete: function () {
                    copilotContainer.style.display = "none";
                }
            });
            gsap.to("#overlay", {
                duration: 0.5,
                opacity: 0,
                onComplete: function () {
                    document.querySelector("#overlay").style.display = "none";
                }
            });
            localStorage.setItem('ma_visited', 'true');
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('ma_visited')) {
        document.querySelector("#overlay").style.display = "block";
        gsap.to("#overlay", {
            duration: 1,
            delay: 1,
            opacity: 0.5
        });
        startAnimation();
        gsap.to("#text", {
            duration: 3,
            delay: 2,
            text: text1,
            onComplete: function() {
                startDotsAnimation();
                console.log("Text 1 ausgeführt");
            }
        });
    }
});