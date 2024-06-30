const whiteOverlay = document.querySelector('.white-overlay-start');
var text1 = "Willkommen im Bereich Shading der Grafischen Datenverarbeitung! Während des Studiums lernst du, wie du digitalen Objekten ein realistisches Aussehen verleihst.";
var text2 = "Shading spielt dabei eine zentrale Rolle, indem es festlegt, wie die Oberfläche des Modells auf Licht reagiert. Dadurch wird das Modell erst lebendig und authentisch.";
var text3 = "Lass mich dir schrittweise zeigen, wie das funktioniert."
var text4 = "Fangen wir mit einem rohen 3D-Modell an. Dieses besitzt zu Beginn keine detaillierten Oberflächeneigenschaften oder Materialien, weshalb die Oberfläche grau ist.";
var text5 = "Im nächsten Schritt erstellen wir Materialien, die Informationen über die Farbe, Textur, Glanz und Lichtdurchlässigkeit enthalten. Diese weisen wir dem Modell zu und definieren so seine Oberflächeneigenschaften.";
var text6 = "Bevor wir das Modell mit seinen Oberflächeneigenschaften sehen können, müssen wir noch Lichtquellen einrichten, um es zu beleuchten.";
var text7 = "Im letzten Schritt berechnet ein Shader, wie die Oberfläche die Lichtstrahlen reflektiert und erzeugt daraus ein fertiges Bild.";
var text8 = "Du bist am Ende des Levels angekommen. Über einen Klick oder den Pfeil in der oberen linken Ecke kommst du zurück zur Levelauswahl.";

var title_bild1 = "Modell";
var title_bild2 = "Shading";
var title_bild3 = "Beleuchtung";
var title_bild4 = "Final Render";
var title_bild5 = "Vielen Dank!";

const textAnimation = gsap.timeline();


gsap.registerPlugin(TextPlugin);

localStorage.setItem("lastLevel", "gd2");

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
        } else {
            if (textElement.innerText === text1) {
                clearText();
                showNextText(text2);
            } else if (textElement.innerText === text2) {
                clearText();
                showNextText(text3);
            } else if (textElement.innerText === text3) {
                clearText();
                showNextText(text4, ".bild1");
                updateTitleText(title_bild1)
            } else if (textElement.innerText === text4) {
                clearText();
                showNextText(text5, ".bild2"); // Hier Bild 1 einblenden
                updateTitleText(title_bild2); // Titeltext aktualisieren
            } else if (textElement.innerText === text5) {
                clearText();
                showNextText(text6, ".bild3"); // Hier Bild 2 einblenden
                updateTitleText(title_bild3); // Titeltext aktualisieren
            } else if (textElement.innerText === text6) {
                console.log("Text6 geklickt");
                clearText();
                showNextText(text7, ".bild4"); // Hier Bild 3 einblenden
                updateTitleText(title_bild4); // Titeltext aktualisieren
            } else if (textElement.innerText === text7) {
                localStorage.setItem("gd_level2_done", "true");
                clearText();
                showNextText(text8); // Hier Bild 4 einblenden
                updateTitleText(title_bild5); // Titeltext aktualisieren
            } else if (textElement.innerText === text8) {
                backPlanet("gd.html");
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
            startDotsAnimation(); // Hier entsprechenden letzten Text übergeben
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