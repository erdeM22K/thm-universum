const whiteOverlay = document.querySelector('.white-overlay-start');
document.addEventListener('DOMContentLoaded', (event) => {
    localStorage.setItem("lastLevel", "av1");
    startLevel();
    hideImageAndSlider(); // Verstecke das Bild und den Regler zu Beginn

    const slider = document.getElementById('brightness_slider');
    const image = document.getElementById('gamma_picture');
    const max_slider = slider.max;

    // Set slider to a random value between 0 and 200
    const randomValue = Math.floor(Math.random() * max_slider);
    slider.value = randomValue;
    image.style.filter = `brightness(${randomValue / 100})`;

    slider.addEventListener('input', function() {
        const brightnessValue = slider.value / 100;
        image.style.filter = `brightness(${brightnessValue})`;
    });

    const submitButton = document.getElementById('submit_button');
    submitButton.addEventListener('click', function() {
        const sliderValue = parseFloat(slider.value);
        if (sliderValue >= 75 && sliderValue <= 125) {
            clearText();
            showNextText("Sehr gut, deine Eingabe war korrekt :) <br> Über den Pfeil in der oberen linken Ecke gelangst du zurück auf die Startseite!");
            localStorage.setItem("av_level1_done", 'true');
        } else {
            clearText();
            showNextText("Das sieht noch nicht gut genug aus, du kannst das besser.  <br> Versuch es noch einaml :)!");
        }
    });
});

// Grundstruktur Animation + Interaktion

var text1 = "Willkommen im zweiten Level \"Licht\". In diesem Level besteht deine Aufgabe darin, die Helligkeit eines vorgegebenen Bildes mithilfe eines Reglers so anzupassen, dass es wieder sichtbar wird.";
var text2 = "Wenn du denkst, dass deine Einstellung korrekt ist, dann drück auf den Button \"Abgeben\".";

const textAnimation = gsap.timeline();

gsap.registerPlugin(TextPlugin);

// Anfangs Text anzeigen
textAnimation.to("#text", {
    duration: 3,
    delay: 2,
    text: text1,
    onComplete: function() {
        startDotsAnimation();
        console.log("Text 1 ausgeführt");
    }
});

//blockiert das selectstart-Ereignis
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text)
document.querySelector('.textfeld').addEventListener('click', function() {
    const textElement = document.getElementById("text");
    if (textAnimation.isActive() && textAnimation.progress() < 1) {
        textAnimation.progress(1);
    }
    else {
        if (textElement.innerText === text1) {
            clearText();
            showImageAndSlider(); // Zeige das Bild und den Regler, wenn der Benutzer zum ersten Mal weiterklickt
            showNextText(text2);
        } else if (textElement.innerHTML === "Sehr gut, deine Eingabe war korrekt :) <br> Über einen Klick oder den Pfeil in der oberen linken Ecke kommst du zurück zur Levelauswahl.") {
            backPlanet("av.html");
        }
    }
});

function startLevel() {
    gsap.to(".white-overlay-start", {
        y: 0,
        duration: 1,
        opacity: 0,
        delay: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
            whiteOverlay.style.display ="none";
    }
});
    gsap.to(".black_transparent", {
        duration: 2,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Endfarbe mit Transparenz
        ease: "power1.inOut"
    });
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

function hideImageAndSlider() {
    const imageAndSliderContainer = document.getElementById('imageAndSliderContainer');
    gsap.set(imageAndSliderContainer, { opacity: 0, y: -50 }); // Setze die Anfangsposition und Opazität
}

function showImageAndSlider() {
    const imageAndSliderContainer = document.getElementById('imageAndSliderContainer');
    gsap.to(imageAndSliderContainer, { duration: 5, opacity: 1, y: 0, ease: "power4.out" }); // Zeige Bild und Regler mit einer GSAP-Animation an
}

// Funktion zum Anzeigen des nächsten Textes
function showNextText(text) {
    textAnimation.to("#text", {
        duration: 3,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation(text3);
            console.log("Text wird ausgeführt");
        }
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

function startDotsAnimation(lastText) {
    if (document.getElementById("text").innerText === lastText) {
        document.getElementById("dots").style.display = "none";
    } else {
        document.getElementById("dots").style.display = "block";
        document.getElementById("dots").innerText = "...>"
        gsap.to("#dots", {
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            x: "+=10",
            onComplete: function() {
                console.log("Textfeld geleert");
            }
        });
    }
}

function killDotsAnimation() {
    document.getElementById("dots").style.display = "none";
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