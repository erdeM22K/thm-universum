
var text1 = "Willkommen im letzten Level des Medieninformatik-Studiums an der THM. Die Themen, die du bisher behandelt hast, sind von entscheidender Bedeutung für die Welt des Game Developments. Im finalen Abschnitt wirst du erfahren, wie diese Konzepte und Techniken in der Praxis angewendet werden können.";var text2 = "THM bietet eine breite Palette an Kursen für Game Development, insbesondere für die Entwicklung von Indie Games. Diese beinhalten spezialisierte Workshops, die alle Aspekte der Spieleentwicklung abdecken – von der Konzeption bis zur Programmierung. Du profitierst von modernster Software und Hardware sowie der Unterstützung erfahrener Dozenten und Gastredner aus der Industrie, um eigene Indie Games erfolgreich zu entwickeln.";
var text3 = "Programmierung ist in der Spieleentwicklung unverzichtbar, um die Logik, Mechanik und Interaktivität der Spiele zu gestalten. Sie ermöglicht Charakterbewegungen, Spielwelt-Reaktionen und die Implementierung komplexer Algorithmen wie KI und Physik. Die erlernten Fähigkeiten in Web-Programmierung und Software Engineering (SWE) sind ebenfalls entscheidend. Web-Programmierkenntnisse unterstützen bei der Entwicklung von Online-Multiplayer-Funktionen und webbasierten Spielen, während SWE-Prinzipien wie Softwarearchitektur und Qualitätssicherung eine effiziente und fehlerfreie Entwicklung gewährleisten.";
var text4 = "In der Spieleentwicklung spielt audiovisuelles Design (AV) eine zentrale Rolle bei der Schaffung der visuellen und akustischen Atmosphäre eines Spiels. AV umfasst Grafikdesign, Animationen, Soundeffekte und Musik, die das Spielerlebnis entscheidend beeinflussen. Die erlernten AV-Fähigkeiten in Grafikdesign, Animation, Sounddesign und Musikkomposition sind wertvoll für die Entwicklung ansprechender visueller und auditiver Inhalte, die ein fesselndes Spielerlebnis ermöglichen.";
var text5 = "Grafikdesign (GD) ist in der Spieleentwicklung von großer Bedeutung, um visuell ansprechende und benutzerfreundliche Spieloberflächen zu gestalten. GD umfasst die Gestaltung von Charakteren, Umgebungen, Benutzeroberflächen und visuellen Effekten, die das Spielerlebnis maßgeblich prägen. Die erlernten GD-Fähigkeiten in Farbtheorie, Typografie und Layout sowie im Umgang mit Design-Software sind essenziell für die Erstellung hochwertiger Grafiken und Animationen.";
var text6 = "Mediendesign (MD) ist entscheidend für die ästhetische Gestaltung und visuelle Kommunikation in der Spieleentwicklung. MD umfasst die Erstellung von Grafiken, Animationen und Benutzeroberflächen, die das Spielerlebnis verbessern. Die erlernten MD-Fähigkeiten in Designprinzipien, Farbtheorie und Typografie sowie im Einsatz von Designsoftware sind unerlässlich für die Entwicklung professioneller Grafiken und Animationen.";
var text7 = "Ich hoffe, diese Anwendung hat dir einen tiefen Einblick in den Studiengang Medieninformatik (IEM) an der THM gegeben. Medieninformatik bietet vielversprechende Zukunftsaussichten, da sie wesentliche Fähigkeiten in Bereichen wie Game Development, Grafikdesign, audiovisuelle Gestaltung und mehr vermittelt. Diese Kompetenzen sind von entscheidender Bedeutung für die Gestaltung zukünftiger digitaler Medienlandschaften.";

var title_bild1 = "Programmierung";
var title_bild2 = "Aduio-Visuelle Medien";
var title_bild3 = "Grafische Datenverarbeitung";
var title_bild4 = "Mediendesign"
var title_bild5 = "Game Development"


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
