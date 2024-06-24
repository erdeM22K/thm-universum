let currentIndex = 1;
const textAnimation = gsap.timeline();
let textMode = "Das \"Originial Mesh\" ist die Grundstruktur des Modells, bestehend aus Polygonen. Hier überprüfen wir die grundlegende Geometrie und bearbeiten die Basisform, um das Modell zu erstellen."

function initializeModeSwitching() {
    document.querySelector('.arrows_container').style.display = "flex";
    document.querySelector('.modes_container').style.display = "flex";
    gsap.from('.arrows_container', {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        ease: "power4.out"
    });
    gsap.from('.modes_container', {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        ease: "power4.out"
    });

    document.getElementById('arrowLeft').addEventListener('click', () => switchMode('left'));
    document.getElementById('arrowRight').addEventListener('click', () => switchMode('right'));
    updateModeText();
}

function switchMode(direction) {
    const modesContainer = document.querySelector('.modes_container');
    const modes = document.querySelectorAll('.image_container');
    const firstMode = modes[0];
    const lastMode = modes[modes.length - 1];

    if (direction === 'left') {
        if (textAnimation.isActive() && textAnimation.progress() < 1) {
            textAnimation.progress(1);
        }
        modesContainer.insertBefore(lastMode, firstMode);
    } else {
        if (textAnimation.isActive() && textAnimation.progress() < 1) {
            textAnimation.progress(1);
        }
        modesContainer.appendChild(firstMode);
    }

    updateHighlight();
    updateModeText();
}

function updateHighlight() {
    const modes = document.querySelectorAll('.modes');
    modes.forEach(mode => mode.classList.remove('highlight'));
    modes[1].classList.add('highlight'); // Mittelposition hervorheben
}

function updateModeText() {
    if (document.querySelectorAll('.image_container .mode_title')[1].innerHTML === "Original Mesh") {
        textMode = "Das \"Originial Mesh\" ist die Grundstruktur des Modells, bestehend aus Polygonen. Hier überprüfen wir die grundlegende Geometrie und bearbeiten die Basisform, um das Modell zu erstellen.";
        clearText();
        showNextText(textMode);
    } else if (document.querySelectorAll('.image_container .mode_title')[1].innerHTML === "Cage + Smooth Mesh") {
        textMode = "Das \"Cage + Smooth-Mesh\" zeigt sowohl das Original Mesh als auch die geglättete Version. Der \"Cage\" repräsentiert die ursprünglichen Polygone, während das \"Smooth Mesh\" die geglättete Form darstellt. Dies hilft uns zu sehen, wie Glättungsoperationen das Modell beeinflussen.";
        clearText();
        showNextText(textMode);
    } else if (document.querySelectorAll('.image_container .mode_title')[1].innerHTML === "Smooth Mesh") {
        textMode = "Das \"Smooth Mesh\" zeigt nur das geglättete Modell, ohne die ursprünglichen Polygone. Es gibt uns einen Eindruck vom endgültigen Aussehen des Modells und ermöglicht Feinabstimmungen.";
        clearText();
        showNextText(textMode);
    }
    document.getElementById("dots").style.display = "none";
    console.log(document.getElementById("dots").style.display);
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

    overlay.style.display ="block";

    gsap.to(overlay, {
        y: -2200,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
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