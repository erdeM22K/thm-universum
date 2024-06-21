const path = document.querySelector("#path");
const pathStart = 30;
const pathLength = path.getTotalLength() - pathStart;
const levelItem = document.querySelectorAll(".level");
const numberOfIcons = levelItem.length;
const iconSpacing = pathLength / numberOfIcons;
const startButton = document.getElementById('startButton');
const textfeld = document.querySelector(".textfeld");
const copilotContainer = document.querySelector(".copilot_container");
let skillIcon = document.querySelector("#skillbars");
let closeSkills = document.querySelector("#close");
const levels = ["Modellierung", "Shading", "Animation"];
let currentLevel = 0;
let startText = "Wir landen auf dem Planeten der Grafischen Datenverarbeitung. Hier kannst du die Stationen \"Modellierung\", \"Shading\" und \"Animation\" besuchen.";
let finishText1 = "Herzlichen Glückwunsch, du hast alle Level der Mobilen Anwendungen abgeschlossen. Mit den Kenntnissen, die du während des Studiums sammelst, kannst du eine Vielzahl spannender beruflicher Wege einschlagen.";
let finishText2 = "Als <i>App-Entwickler</i> kannst du innovative mobile Anwendungen für iOS und Android entwickeln. Als <i>Softwareentwickler</i> stehen dir allgemeinere Softwareprojekte offen, während du als <i>UX/UI Designer</i> an der Gestaltung benutzerfreundlicher und ästhetischer Interfaces arbeitest.";
let finishText3 = "Gehe zurück zur Startseite, um weitere Planeten des Medieninformatik-Universums zu erforschen.";
const textAnimation = gsap.timeline();

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

function setLastLevelBreakpoint() {
    switch (localStorage.getItem("lastLevel")) {
        case "gd1":
            start = breakpointLevel[0];
            break;
        case "gd2":
            start = breakpointLevel[1];
            break;
        case "gd3":
            start = breakpointLevel[2];
            break;
        default:
            return 0;
    }
}
function placeSpaceshipOnPath() {
    gsap.to("#spaceship", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: start,
            end: start,
        }
    });
}
function updateButtonText() {
    if (currentLevel < levels.length) {
        startButton.textContent = `${levels[currentLevel]} besuchen`;
    } else {
        startButton.textContent = `${levels[0]} besuchen`;
    }
}

function hideButton(delay) {
    gsap.to("#startButton", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
        delay: delay,
        duration: 0.2,
        ease: "power1.out",
    });
}
function showButton(delay) {
    startButton.style.display = "block";
    gsap.to("#startButton", {
        opacity: 1,
        scale: 1,
        transformOrigin: "center center",
        delay: delay,
        duration: 0.5,
        ease: "elastic.out(1,0.5)",
        onstart: function () {
            updateButtonText();
        }
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
            transformOrigin: "center center",
            duration: 0.2,
        });
    });

    button.addEventListener("mouseleave", function () {
        gsap.to(id, {
            scale: 1,
            transformOrigin: "center center",
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
    textAnimation.to("#text", {
        duration: 0.5,
        text: "",
        onComplete: function() {
            console.log("Textfeld geleert");
        }
    });
    document.getElementById("dots").style.display = "none";
}
function showNextText(text) {
    textAnimation.to("#text", {
        duration: 3,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation();
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

function allLevelsDone() {
    if (localStorage.getItem('gd_level1_done') && localStorage.getItem('gd_level2_done') && localStorage.getItem('gd_level3_done')) {
        return true;
    } else {
        return false;
    }
}

function showSkills(delay) {
    let skills = ["Webentwicklung", "Audiovisuelle Medien", "Grafische Datenverarbeitung", "Mobile Apps", "Mediendesign", "Game Development"];
    let skillsShort = ["wpr", "av", "gd", "ma", "md", "gamedev"]
    let skillValues = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

    const skillHeadline = document.createElement('h1');
    skillHeadline.id = "skillHeadline";
    skillHeadline.innerHTML = "Deine Skills";
    document.querySelector("body").appendChild(skillHeadline);
    const skillContainer = document.createElement('div');
    skillContainer.id = "skillContainer";
    document.querySelector("body").appendChild(skillContainer);

    for (let i = 0; i < skills.length; i++) {
        let skillName = document.createElement('div');
        skillName.className = "skillName";
        skillName.className = "skillName";
        skillName.innerHTML = skills[i];
        skillContainer.appendChild(skillName);
        let skillValue = document.createElement('div');
        skillValue.className = "skillValue";
        skillContainer.appendChild(skillValue);

        //Prüfen, ob ein Modul fertig ist und Eintragen des skillValues


    }
    for (let modul = 0; modul < skills.length - 1; modul++) {
        let skillBonusGameDesign = 0.063;
        for (let level = 1; level <= 3; level++) {
            if(localStorage.getItem(skillsShort[modul] + "_level" + level + '_done')) {
                console.log(skills[modul] + " Level " + level + " fertig.");
                skillValues[modul] += 0.316;
                skillValues[5] += skillBonusGameDesign;
            }
        }
    }

    document.querySelector("#overlay").style.display = "block";
    gsap.to("#overlay", {
        duration: 0.5,
        delay: delay,
        opacity: 0.9,

    });

    gsap.from('#skillHeadline', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        delay: delay,
    });

    gsap.from('#skillContainer div:nth-child(odd)', {
        x: -100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: delay,
    });

    for (let i = 0; i < skillValues.length; i++) {
        let staggerFactor = 0.1;
        gsap.to(".skillValue:nth-child(" + (i * 2 + 2) + ")", {
            delay: delay + 0.3 + i * staggerFactor,
            width: skillValues[i] * 100 + "%",
            duration: 0.5,
            ease: "power2.out"
        });
    }
}

function hideSkills() {
    gsap.to("#overlay", {
        duration: 0.5,
        opacity: 0,
        onComplete: function () {
            document.querySelector("#overlay").style.display = "none";
        }
    });
    gsap.to('#skillContainer div', {
        x: -100,
        opacity: 0,
        stagger: 0.015,
        duration: 0.5,
        onComplete: function () {
            document.querySelector("#skillContainer").remove();
        }
    });
    gsap.to('#skillHeadline', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            document.querySelector("#skillHeadline").remove();
        }
    });
}

setLastLevelBreakpoint()

skillIcon.addEventListener('click', function () {
    showSkills(0);
    skillIcon.style.display = "none";
    closeSkills.style.display = "block";
});

closeSkills.addEventListener('click', function () {
    hideSkills();
    skillIcon.style.display = "block";
    closeSkills.style.display = "none";
});

document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textAnimation.isActive() && textAnimation.progress() < 1) {
            textAnimation.progress(1);
        }
        else {
            if (textElement.innerHTML === startText || textElement.innerHTML === finishText3) {
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
                if (textElement.innerHTML === startText) {
                    localStorage.setItem('gd_visited', 'true');
                    gsap.to("#overlay", {
                        duration: 0.5,
                        opacity: 0,
                        onComplete: function () {
                            document.querySelector("#overlay").style.display = "none";
                        }
                    });
                }
                if (textElement.innerHTML === finishText3) {
                    hideSkills();
                    localStorage.setItem('module2_done', 'true');
                }
            } else if (textElement.innerHTML === finishText1) {
                clearText();
                showNextText(finishText2);
            } else if (textElement.innerHTML === finishText2) {
                clearText();
                showNextText(finishText3);
            }
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
    if (allLevelsDone() && !localStorage.getItem('module2_done')) {
        showSkills(1.3);
        let copilotImg = document.querySelector(".copilot");
        copilotImg.src = "../bilder/copilot_sassy.svg";
        startAnimation();
        textAnimation.to("#text", {
            duration: 3,
            delay: 2,
            text: finishText1,
            onComplete: function() {
                startDotsAnimation();
                console.log("Finish Text wird ausgeführt");
            }
        });
    }
    else if (!localStorage.getItem('gd_visited')) {
        document.querySelector("#overlay").style.display = "block";
        gsap.to("#overlay", {
            duration: 1,
            delay: 1,
            opacity: 0.5
        });
        startAnimation();
        textAnimation.to("#text", {
            duration: 3,
            delay: 2,
            text: startText,
            onComplete: function() {
                startDotsAnimation();
                console.log("Text 1 ausgeführt");
            }
        });
    }
});