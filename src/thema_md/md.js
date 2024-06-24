const path = document.querySelector("#path");
const pathStart = 30;
const pathLength = path.getTotalLength() - pathStart;
const levelItem = document.querySelectorAll(".level");
const numberOfIcons = levelItem.length;
const iconSpacing = pathLength / numberOfIcons;
const startButton = document.getElementById('startButton');
const whiteOverlay = document.querySelector('.white-overlay-start');
const levels = ["Typografie", "Farben", "Formen"];
let currentLevel = 0;
let skillIcon = document.querySelector("#skillbars");
let closeSkills = document.querySelector("#close");

for (let i = 0; i < numberOfIcons; i++) {
    const distance = pathStart + i * iconSpacing;
    const point = path.getPointAtLength(distance);
    levelItem[i].setAttribute('transform', `translate(${point.x - 8}, ${point.y - 8})`);
}

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(TextPlugin);

gsap.to(".white-overlay-start", {
    y: 0,
    duration: 1,
    opacity: 0,
    ease: "power1.inOut",
    onComplete: () => {
        whiteOverlay.style.display ="none";
}
});

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
    startButton.style.display = "block";
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

function showSkills(delay) {
    let skills = ["Webentwicklung", "Audiovisuelle Medien", "Grafische Datenverarbeitung", "Mobile Apps", "Mediendesign", "Game Development"];
    let skillsShort = ["wpr", "av", "gd", "ma", "md", "gamedev"]
    let levelAnzahl = [3, 4, 3, 3, 3, 1];
    let levelAnzahlGesamt = 0;
    for (let i = 0; i < levelAnzahl.length; i++) {
        levelAnzahlGesamt += levelAnzahl[i];
    }
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
        let skillBonusGameDesign = 0.95/levelAnzahlGesamt;
        for (let level = 1; level <= levelAnzahl[modul]; level++) {
            if(localStorage.getItem(skillsShort[modul] + "_level" + level + '_done')) {
                console.log(skills[modul] + " Level " + level + " fertig.");
                skillValues[modul] += 0.95/levelAnzahl[modul];
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

function addResetButton() {
    let resetButton = document.createElement('button');
    resetButton.id = "resetButton";
    resetButton.innerText = "Zurücksetzen";
    document.querySelector("body").appendChild(resetButton);

    gsap.from('#resetButton', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    setButtonAnimation("#resetButton", resetButton);

    resetButton.addEventListener('click', function() {
        const confirmation = confirm("Bist du sicher, dass du deinen Fortschritt zurücksetzen willst?");
        if (confirmation) {
            localStorage.clear();
            window.location.href = "index.html";
        }
    });
}

function removeResetButton() {
    document.querySelector('#resetButton').remove();
    gsap.to('#resetButton', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: function () {
            document.querySelector('#resetButton').remove();
        }
    });
}


skillIcon.addEventListener('click', function () {
    showSkills(0);

    addResetButton();

    skillIcon.style.display = "none";
    closeSkills.style.display = "block";
});


closeSkills.addEventListener('click', function () {
    hideSkills();

    removeResetButton();

    skillIcon.style.display = "block";
    closeSkills.style.display = "none";
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
            openPlanet("level1.html");
            break;
        case 1:
            openPlanet("level2.html");
            break;
        case 2:
            openPlanet("level3.html");
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

function openPlanet(relativeUrl) {
    // Holen der Basis-URL des aktuellen Dokuments
    var baseUrl = window.location.href.split('/').slice(0, -1).join('/');

    // Verwandeln des relativen Links in einen absoluten Link
    var absoluteUrl = baseUrl + '/' + relativeUrl;
    const whiteOverlay = document.querySelector('.white-overlay');
    const stars = document.querySelector('.star');
    whiteOverlay.style.display ="block";
    stars.style.display ="block";
    // Animation und Weiterleitung
    const overlay = document.querySelector('.transition-overlay');
    const clouds = document.querySelector('.clouds');
    overlay.style.display ="block";
    clouds.style.display ="block";
    gsap.to(overlay, {
        y: -2200,
        duration: 1.5,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
        }
    });
    gsap.to(".clouds", {
        y: -300,
        duration: 1.5,
        opacity: 1,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            clouds.style.display ="none";
        }
    });
    gsap.to(".white-overlay", {
        y: 0,
        duration: 1.5,
        opacity: 1,
        delay: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            window.location.href = absoluteUrl;
        }
    });
    gsap.to(".star", {
        y: 0,
        duration: 1.5,
        opacity: 1,
        delay: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            window.location.href = absoluteUrl;
        }
    });
}

function backPlanet(relativeUrl) {
    // Holen der Basis-URL des aktuellen Dokuments
    var baseUrl = window.location.href.split('/').slice(0, -1).join('/');

    // Verwandeln des relativen Links in einen absoluten Link
    var absoluteUrl = baseUrl + '/' + relativeUrl;
    const whiteOverlay = document.querySelector('.white-overlay');
    const stars = document.querySelector('.star');
    whiteOverlay.style.display ="block";
    stars.style.display ="block";
    // Animation und Weiterleitung
    const overlay = document.querySelector('.transition-overlay-back');
    const clouds = document.querySelector('.clouds');
    overlay.style.display ="block";
    clouds.style.display ="block";
    gsap.to(overlay, {
        y: 2200,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
        }
    });
    gsap.to(".clouds", {
        y: 2000,
        duration: 3,
        opacity: 1,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            clouds.style.display ="none";
            
        }
    });
    gsap.to(".white-overlay", {
        y: 0,
        duration: 1.5,
        opacity: 1,
        delay: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            window.location.href = absoluteUrl;
        }
    });
    gsap.to(".star", {
        y: 0,
        duration: 1.5,
        opacity: 1,
        delay: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            window.location.href = absoluteUrl;
        }
    });
}

const starCount = 200;
        const stars = [];

        function createStar() {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = -10 + 'px';
            star.speed = Math.random() * 200 + 50;  // Geschwindigkeit zwischen 1 und 4
            document.body.appendChild(star);
            stars.push(star);
        }

        function animateStars() {
            stars.forEach(star => {
                const top = parseFloat(star.style.top);
                if (top > window.innerHeight) {
                    star.style.top = -100 + 'px';
                    star.style.left = Math.random() * window.innerWidth + 'px';
                    star.speed = Math.random() * 200 + 50;  // Neue Geschwindigkeit zuweisen
                } else {
                    star.style.top = top + star.speed + 'px';
                }
            });
            requestAnimationFrame(animateStars);
        }

        for (let i = 0; i < starCount; i++) {
            createStar();
        }

        animateStars();