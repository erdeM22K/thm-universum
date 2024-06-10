var texts = [
    "Text für Bild 1",
    "Text für Bild 2",
    "Text für Bild 3",
    "Text für Bild 4"
];

// Anfangs Text anzeigen
gsap.to("#text", {
    duration: 1,
    delay: 2,
    text: texts[0],
    onComplete: function() {
        startDotsAnimation();
        console.log("Text 1 ausgeführt");
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    startLevel();
});

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text)
document.querySelector('.textfeld').addEventListener('click', function() {
    const textElement = document.getElementById("text");
    var currentIndex = texts.indexOf(textElement.innerText);
    if (currentIndex < texts.length - 1) {
        clearText();
        showNextText(texts[currentIndex + 1]);
        toggleImage(currentIndex + 1);
    }
});

// Grundstruktur Animation + Interaktion
function startLevel() {
    gsap.from(".gallery_img", {
        duration: 1,
        opacity: 0,
        scale: 0,
        ease: 'back.out(1.7)',
        delay: 1
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

// Funktion zum Anzeigen des nächsten Textes
function showNextText(text) {
    gsap.to("#text", {
        duration: 1,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation();
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

function startDotsAnimation() {
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

//Funktionierende Funktion (Hände kommen von rechts nach links)
function toggleImage(index) {
    var images = document.querySelectorAll('.gallery_img');
    var currentImage = images[index];
    var previousImage = null;

    // Finde das aktuell angezeigte Bild
    for (var i = 0; i < images.length; i++) {
        if (images[i].style.display === 'block') {
            previousImage = images[i];
            break;
        }
    }

    // Wenn das vorherige Bild existiert, blende es aus und setze es auf 'none'
    if (previousImage) {
        gsap.to(previousImage, { duration: 1, x: "-=450", opacity: 0, onComplete: function() {
                previousImage.style.display = 'none';
                previousImage.style.transform = 'none'; // Setze die Transformationswerte zurück
                if (index < images.length) {
                    showNewImage();
                }
            }});
    } else {
        // Wenn kein vorheriges Bild vorhanden ist, setze das erste Bild auf 'none'
        images[0].style.display = 'none';
        showNewImage();
    }

    // Funktion zum Anzeigen des neuen Bildes
    function showNewImage() {
        currentImage.style.display = 'block';
        gsap.from(currentImage, { duration: 1, x: "+=450", opacity: 0 });
    }
}


/*
function toggleImage(index) {
    var images = document.querySelectorAll('.gallery_img');
    var currentImage = images[index];
    var previousImage = null;

    // Finde das aktuell angezeigte Bild
    for (var i = 0; i < images.length; i++) {
        if (images[i].style.display === 'block') {
            previousImage = images[i];
            break;
        }
    }

    // Blende das neue Bild ein und verschiebe es auf seine Position
    currentImage.style.display = 'block';
    currentImage.style.opacity = 0; // Setze die Anfangsopazität auf 0
    gsap.fromTo(currentImage, { opacity: 0, x: "+=450" }, { duration: 1, opacity: 1, x: 0 });

    // Wenn das vorherige Bild existiert, blende es aus und setze es auf 'none'
    if (previousImage) {
        gsap.to(previousImage, { duration: 1, opacity: 0, x: "-=450", onComplete: function() {
                previousImage.style.display = 'none';
            }});
    } else {
        // Wenn kein vorheriges Bild vorhanden ist, setze das erste Bild auf 'none'
        images[0].style.display = 'none';
    }
}
*/

