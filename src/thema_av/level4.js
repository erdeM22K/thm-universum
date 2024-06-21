//Grundstruktur Animation + Interaktion

var text1 = "Du bist nun im letzten Level dieses Moduls angekommen. Dank deiner erfolgreichen Lösung der vorherigen Level weißt du nun, was im Modul Audiovisuelle Medien behandelt wird. Alle vorherigen Aufgaben werden in der Postproduktion (dem Schnitt) zu einem funktionsfähigen Video zusammengeführt. Klicke auf \"Kamera\", um das Endprodukt zu sehen! :) Viel Spaß!";


// Fügen Sie diese Codezeilen in Ihr vorhandenes JavaScript-Skript ein

// Zuerst verbergen wir das Video:
gsap.set(".video_container", {
    y: "-100%", // Beginnen Sie außerhalb des sichtbaren Bereichs (oben)
    opacity: 0 // Beginnen Sie mit einer Opazität von 0 (versteckt)
});

// Dann zeigen wir es nach 5 Sekunden an:
gsap.to(".video_container", {
    delay: 5, // Verzögerung von 5 Sekunden
    y: "0%", // Bewegen Sie das Video in den sichtbaren Bereich (oben)
    opacity: 1, // Ändern Sie die Opazität auf 1 (sichtbar)
    duration: 1, // Dauer der Animation
    ease: "power2.out" // Easing-Funktion
});


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

document.addEventListener('DOMContentLoaded', (event) => {
    startLevel();
});

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text)
document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textElement.innerText === text1) {
            clearText();
            showNextText(text2);
        } else if (textElement.innerText === text2) {
            clearText();
            showNextText(text3);
        }
    });
});

//Funktionen ---------------------------------------------------

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