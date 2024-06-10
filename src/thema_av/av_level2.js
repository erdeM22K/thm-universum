document.addEventListener('DOMContentLoaded', (event) => {
    startLevel();
    hideImageAndSlider(); // Verstecke das Bild und den Regler zu Beginn

    const slider = document.getElementById('blur_slider');
    const image = document.getElementById('gamma_picture');

    // Funktion, um einen zufälligen Wert für den Slider zu generieren
    function setRandomSliderValue() {
        const randomValue = Math.floor(Math.random() * 101) - 50; // Zufälliger Wert zwischen -50 und 50
        slider.value = randomValue;
        const blurValue = Math.abs(randomValue);
        image.style.filter = `blur(${blurValue}px)`;
    }

    // Setze den Slider auf einen zufälligen Wert beim Laden der Seite
    setRandomSliderValue();

    slider.addEventListener('input', function() {
        let blurValue = Math.abs(slider.value); // Absolutwert des Slider-Werts
        blurValue = Math.min(blurValue, 50); // Begrenze den Wert auf maximal 50
        image.style.filter = `blur(${blurValue}px)`;
    });

    const submitButton = document.getElementById('submit_button');
    submitButton.addEventListener('click', function() {
        const sliderValue = parseInt(slider.value);
        if (sliderValue >= -1 && sliderValue <= 1) {
            clearText();
            showNextText("Sehr gut, deine Eingabe war korrekt :)");
        } else {
            clearText();
            showNextText("Das sieht noch nicht gut genug aus, du kannst das besser. Versuch es noch einmal :)!");
        }
    });
});



// Grundstruktur Animation + Interaktion

var text1 = "Willkommen im zweiten Level \"Kamera\". In diesem Level besteht deine Aufgabe darin, die Schärfe eines vorgegebenen Bildes mithilfe eines Reglers so anzupassen, dass es wieder erkennbar wird.";
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