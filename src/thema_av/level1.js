document.addEventListener('DOMContentLoaded', (event) => {
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
        } else {
            clearText();
            showNextText("Das sieht noch nicht gut genug aus, du kannst das besser.  <br> Versuch es noch einaml :)!");
        }
    });
});

// Grundstruktur Animation + Interaktion

var text1 = "Willkommen im zweiten Level \"Licht\". In diesem Level besteht deine Aufgabe darin, die Helligkeit eines vorgegebenen Bildes mithilfe eines Reglers so anzupassen, dass es wieder sichtbar wird.";
var text2 = "Wenn du denkst, dass deine Einstellung korrekt ist, dann drück auf den Button \"Abgeben\".";

gsap.registerPlugin(TextPlugin);

// Anfangs Text anzeigen
gsap.to("#text", {
    duration: 3,
    delay: 2,
    text: text1,
    onComplete: function() {
        startDotsAnimation();
        console.log("Text 1 ausgeführt");
    }
});

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text)
document.querySelector('.textfeld').addEventListener('click', function() {
    const textElement = document.getElementById("text");
    if (textElement.innerText === text1) {
        clearText();
        showImageAndSlider(); // Zeige das Bild und den Regler, wenn der Benutzer zum ersten Mal weiterklickt
        showNextText(text2);
    }
});

function startLevel() {
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
    gsap.to("#text", {
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
    gsap.to("#text", {
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

function killDotsAnimation() {
    document.getElementById("dots").style.display = "none";
}