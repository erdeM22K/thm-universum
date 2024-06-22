
var text1 = "Willkommen zu unserem interaktiven Tutorial! Heute werden wir verschiedene Sensoren von Handys untersuchen, die in modernen Smartphones verwendet werden. Unser Ziel ist es, dir einen klaren Überblick über diese wichtigen Sensoren zu geben und ihre Einsatzmöglichkeiten zu zeigen.";
var text2 = "In dieser Sitzung wirst du mehrere wichtige Sensoren und deren Funktionen kennenlernen, die eine zentrale Rolle in modernen Smartphones spielen. Durch Klicken auf die Textbox kannst du schrittweise die nächsten Themen anzeigen und dich durch die Inhalte navigieren. Viel Spaß!";
var text3 = "Das Handy-GPS ist eine Funktion, die Satellitensignale nutzt, um den genauen Standort eines mobilen Geräts zu bestimmen. GPS ermöglicht Navigation, Standortverfolgung und ortsbasierte Dienste wie Kartenanwendungen, Wetterberichte und Notfallhilfe. Es arbeitet unabhängig von Mobilfunknetzen und bietet weltweit präzise Standortinformationen.";
var text4 = "Face ID ist eine biometrische Authentifizierungsmethode, die Gesichtserkennungstechnologie verwendet, um das Gerät zu entsperren und sichere Transaktionen zu autorisieren. Mithilfe einer Kombination aus Infrarotkamera und Punktprojektor erstellt Face ID eine detaillierte 3D-Karte des Gesichts des Benutzers. Diese Technologie bietet eine hohe Sicherheit und Benutzerfreundlichkeit.";
var text5 = "Der Fingerabdrucksensor ist eine weitere biometrische Authentifizierungsmethode, die den einzigartigen Abdruck eines Fingers verwendet, um das Gerät zu entsperren oder Zahlungen zu bestätigen. Der Sensor scannt und speichert die Fingerabdruckdaten des Benutzers und vergleicht diese bei jeder Nutzung. Diese Methode ist schnell, bequem und bietet eine hohe Sicherheit.";
var text6 = "Ein Pulsmesser im Handy verwendet optische Sensoren oder Infrarotsensoren, um den Herzschlag des Benutzers zu messen. Diese Funktion findet sich häufig in Fitness- und Gesundheits-Apps und ermöglicht die Überwachung der Herzfrequenz in Echtzeit. Sie hilft Benutzern, ihre Fitnessaktivitäten zu verfolgen, ihre Gesundheit zu überwachen und ihre Trainingsintensität zu optimieren."

var textende = "Du bist am Ende des Levels angekommen. Über den Pfeil in der oberen linken Ecke kommst du wieder zur Startseite"

//-----------------------------------------------------------------

var title_bild1 = "GPS";
var title_bild2 = "Face-ID";
var title_bild3 = "Finger-Scan";
var title_bild4 = "Pulsmesser"

var title_bildende = "Vielen Dank!"

const textAnimation = gsap.timeline();

gsap.registerPlugin(TextPlugin);

localStorage.setItem("lastLevel", "av1");
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

document.addEventListener('DOMContentLoaded', (event) => {
    startLevel();
    initializeModeSwitching();
    mobileSwipe();
});

document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textAnimation.isActive() && textAnimation.progress() < 1) {
            textAnimation.progress(1);
        }
        else {
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
                showNextText(textende, ".bild5"); // Hier Bild 2 einblenden
                updateTitleText(title_bildende); // Titeltext aktualisieren
                console.log("MA Level 3 fertig");
                localStorage.setItem("ma_level3_done", 'true');
            }
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
    textAnimation.to("#text", {
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
