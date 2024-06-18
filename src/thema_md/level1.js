
var text1 = "Willkommen zu unserem interaktiven Tutorial über Typografie! Heute werden wir grundlegende Funktionen und UI-Elemente durchgehen, die oft in modernen Web- und Mobilanwendungen verwendet werden. Unser Ziel ist es, Ihnen einen klaren Überblick über die Bedeutung von Typografie zu geben und deren entscheidenden Einfluss auf das Benutzererlebnis zu zeigen.";
var text2 = "In dieser Sitzung wirst du mehrere wichtige Elemente und Funktionen kennenlernen, die eine zentrale Rolle in modernen Web- und Mobilanwendungen spielen. Durch Klicken auf die Textbox kannst du schrittweise die verschiedenen Aspekte der Typografie erkunden und verstehen, wie sie die Lesbarkeit, Ästhetik und Benutzerinteraktion beeinflussen.";
var text3 = "Serifen-Schriftarten haben kleine Linien oder Verzierungen an den Enden der Buchstabenstriche, die ihnen ein traditionelles und oft elegantes Aussehen verleihen.";
var text4 = "Serifenlose Schriftarten fehlen diese zusätzlichen Linien und sind oft moderner und minimalistischer im Design, was sie für Bildschirmanwendungen gut geeignet macht.";
var text5 = "Handgeschriebene Schriftarten ahmen oft menschliche Handschrift nach und vermitteln ein persönliches und kreatives Gefühl in Designs.";
var text6 = "Monospace-Schriftarten haben eine feste Breite für jeden Buchstaben, was sie ideal für Programmierungen und Quelltexte macht, da sie eine klare Struktur bieten.";
var text7 = "Serifen können einen signifikanten Einfluss auf die Wahrnehmung von Texten und Produkten haben. Sie werden häufig in Printmedien und Logos verwendet, um Eleganz und Tradition zu vermitteln, während serifenlose Schriften für ihre Lesbarkeit auf Bildschirmen geschätzt werden.";

var title_bild1 = "Serifen-Schriftart";
var title_bild2 = "Serifenlose-Schriftart";
var title_bild3 = "Handgeschrieben";
var title_bild4 = "Monospace";
var title_bild5 = "Anwendung in der Praxis";
var title_bild6 = "Vielen Dank!";


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
        } else if (textElement.innerText === text7) {
            clearText();
            showNextText(text8, ".bild6"); // Hier Bild 2 einblenden
            updateTitleText(title_bild6); // Titeltext aktualisieren
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
    gsap.set(".bild1, .bild2, .bild3, .bild4, .bild5, .bild6", { display: "none" });

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