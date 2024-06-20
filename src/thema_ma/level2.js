
var text1 = "Willkommen zu unserem interaktiven Tutorial! Heute werden wir einige grundlegende Funktionen und UI-Elemente durchgehen, die oft in modernen Web- und Mobilanwendungen verwendet werden. Unser Ziel ist es, Ihnen einen klaren Überblick über diese wichtigen Elemente zu geben und deren Einsatzmöglichkeiten zu zeigen.";
var text2 = "In dieser Sitzung wirst du mehrere wichtige Elemente und Funktionen kennenlernen, die eine zentrale Rolle in modernen Web- und Mobilanwendungen spielen. Durch Klicken auf die Textbox kannst du schrittweise die nächsten Themen anzeigen und dich durch die Inhalte navigieren.";
var text3 = "Eine Hamburger-Menüleiste ist ein Symbol, das aus drei horizontalen Linien besteht (obere linke Ecke in der Abbildung) und oft in mobilen Anwendungen verwendet wird, um ein verstecktes Menü anzuzeigen. Durch das Antippen des Symbols wird das Menü sichtbar, wodurch Platz gespart und die Benutzeroberfläche übersichtlicher gestaltet wird.";
var text4 = "Die Listenfunktion ist ein wesentliches UI-Element, das verwendet wird, um eine Reihe von Einträgen in einer strukturierten, leicht lesbaren Weise anzuzeigen. Sie findet Anwendung in verschiedenen Kontexten wie Aufgabenlisten, Menüauswahlen und Datenanzeigen, wodurch Benutzer Informationen effizient durchsuchen und auswählen können.";
var text5 = "Die Swipefunktion ermöglicht es Benutzern, durch horizontales oder vertikales Wischen auf einem Touchscreen verschiedene Inhalte oder Aktionen auszulösen. Diese Geste wird häufig in Galerien, Nachrichtenseiten und mobilen Apps verwendet, um eine intuitive und flüssige Navigation zu gewährleisten.";
var text6 = "Mobile Rotation bezieht sich auf die automatische Anpassung des Bildschirms eines mobilen Geräts (wie Smartphones oder Tablets) zwischen Hoch- und Querformat, basierend auf der physischen Ausrichtung des Geräts. Diese Funktion nutzt Sensoren wie den Beschleunigungsmesser und das Gyroskop, um die Position des Geräts zu erkennen und den Bildschirminhalt entsprechend zu drehen."
var text7 = "Du bist am Ende des Levels angekommen. Über den Pfeil in der oberen linken Ecke kommst du wieder zur Startseite"

var title_bild1 = "Hamburger-Menüleiste";
var title_bild2 = "Listenfunktion";
var title_bild3 = "Swipefunktion";
var title_bild4 = "Mobile Rotation"
var title_bild5 = "Vielen Dank!"


gsap.registerPlugin(TextPlugin);

localStorage.setItem("lastLevel", "ma2");
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
    initializeModeSwitching();
    mobileSwipe();
});

document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textElement.innerText === text1) {
            clearText();
            showNextText(text2);
        } else if (textElement.innerText === text2) {
            clearText();
            showNextText(text3, ".bild1");
            updateTitleText(title_bild1)
        } else if (textElement.innerText === text3) {
            clearText();
            showNextText(text4, ".bild2"); // Hier Bild 1 einblenden
            updateTitleText(title_bild2); // Titeltext aktualisieren
        } else if (textElement.innerText === text4) {
            clearText();
            showNextText(text5, ".bild3"); // Hier Bild 2 einblenden
            updateTitleText(title_bild3); // Titeltext aktualisieren
        } else if (textElement.innerText === text5) {
            clearText();
            showNextText(text6, ".bild4"); // Hier Bild 2 einblenden
            updateTitleText(title_bild4); // Titeltext aktualisieren
        } else if (textElement.innerText === text6) {
            clearText();
            showNextText(text7, ".bild5"); // Hier Bild 2 einblenden
            updateTitleText(title_bild5); // Titeltext aktualisieren
            console.log("MA Level 2 fertig");
            localStorage.setItem("ma_level2_done", 'true');
        }
    });
});

//Funktionen ---------------------------------------------------

// Funktion zum Aktualisieren des Titeltexts
function updateTitleText(text) {
    gsap.to(".h1-bilder", {
        duration: 0.5,
        opacity: 0,
        onComplete: function() {
            document.querySelectorAll(".h1-bilder").forEach(function(el) {
                el.innerText = text;
            });
            gsap.to(".h1-bilder", { duration: 0.5, opacity: 1 });
        }
    });
}


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
    gsap.from(".modes_container", {
        duration: 3,
        opacity: 0,
        delay: 2,
        ease: "power1.inOut"
    });
    gsap.from(".arrows_container", {
        duration: 3,
        opacity: 0,
        delay: 2,
        ease: "power1.inOut"
    });

    showImage(".bild");
}

// Funktion zum Anzeigen des nächsten Textes
function showNextText(text, imageSelector) {
    // Zuerst das Text-Element aktualisieren
    gsap.to("#text", {
        duration: 3,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation(text3); // Hier entsprechenden letzten Text übergeben
            console.log("Text wird ausgeführt");
        }
    });

    // Dann das Bild entsprechend einblenden und das vorherige ausblenden
    showImage(imageSelector);
}


function showImage(imageSelector) {
    // Alle Bilder ausblenden
    gsap.set(".bild1, .bild2, .bild3, .bild4, .bild5", { display: "none" });

    // Gewünschtes Bild animiert einblenden
    gsap.fromTo(imageSelector, { opacity: 0, scale: 0.5 }, { display: "block", opacity: 1, scale: 1, duration: 1 });
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
