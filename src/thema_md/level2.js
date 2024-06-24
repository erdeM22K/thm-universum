const whiteOverlay = document.querySelector('.white-overlay-start');
var text1 = "Willkommen beim zweiten Level des Moduls Mediendesign! In diesem Abschnitt wirst du dein Wissen über die verschiedenen Logos und ihre charakteristischen Farben testen. Tauche ein in die faszinierende Welt der Markenidentität und sieh, wie gut du die Logos bekannter Unternehmen erkennst.";
var text2 = "Wir alle kennen das Phänomen: Viele Produkte und Marken können wir allein anhand ihrer Form oder ihres Logos sofort identifizieren. In diesem Level wirst du auf mehrere bekannte Produkte und Designelemente stoßen, die dir wahrscheinlich vertraut sind. Deine Aufgabe wird es sein, die richtige Marke oder das richtige Unternehmen zu identifizieren, die hinter diesen Symbolen stehen.";
var text3 = "Dieses Level ist darauf ausgelegt, dir zu zeigen, wie tief sich Logos und Marken in unser Gedächtnis eingebrannt haben. Oftmals genügt schon ein kurzer Blick auf die Form oder Farbe eines Produkts, um den Namen des Herstellers zu erkennen. Tauche ein in die Welt der visuellen Identität und vertiefe dein Verständnis für die Erkennungsmerkmale und Markenidentitäten im Modul Mediendesign!";

const textAnimation = gsap.timeline();

var questions = [
    {
        question: "1. An welches Unternehmen denkst du, wenn du dieses Bild siehst?",
        answers: ["Xiaomi", "Samsung", "Apple"],
        correct: 2,
        logo: "../bilder/apfel_logo.png",
        explanation: "Richtig! <br> Das abgebildete Logo gehört zu Apple. Der ikonische Apfel mit dem Biss steht für innovative Technologie und hochwertigen Minimalismus. Apples einprägsames Logo in Verbindung mit seiner schlichten Farbpalette trägt dazu bei, dass es leicht wiedererkannt und mit Qualität und Innovation assoziiert wird.<br>"
    },
    {
        question: "2. An welches Unternehmen denkst du, wenn du dieses Bild siehst?",
        answers: ["FILA", "Adidas", "Puma"],
        correct: 1,
        logo: "../bilder/adidas_logo.png",
        explanation: "Richtig! <br> Das Logo gehört zu Adidas. Die drei Streifen sind ein einfaches, aber starkes Symbol, das weltweit bekannt ist. Die klare und konsistente Verwendung der Streifen und die typischen Farben Schwarz und Weiß machen es unverwechselbar und leicht erkennbar.<br>"
    },
    {
        question: "3. An welches Unternehmen denkst du, wenn du dieses Bild siehst?",
        answers: ["Reebok", "Wilson", "Nike"],
        correct: 2,
        logo: "../bilder/nike_logo.png",
        explanation: "Richtig! <br> Das bekannte 'Swoosh'-Logo gehört zu Nike. Der einfache, geschwungene Haken ist eines der bekanntesten Symbole der Welt. Nikes cleveres Branding und die wiederkehrende Verwendung des Swoosh in Kombination mit der dominanten Farbe Schwarz tragen dazu bei, dass das Logo sofort wiedererkannt wird und für sportliche Leistung und Stil steht.<br>"
    },
    {
        question: "4. An welches Unternehmen denkst du, wenn du dieses Bild siehst?",
        answers: ["IKEA", "XXXLutz", "Bauhaus"],
        correct: 0,
        logo: "../bilder/ikea_logo.png",
        explanation: "Richtig! <br> Das Logo gehört zu IKEA. Die blaue und gelbe Farbpalette spiegelt die schwedischen Wurzeln des Unternehmens wider und macht das Logo leicht wiedererkennbar. IKEAs Logo steht für erschwingliche, gut gestaltete Möbel und hat durch seine Farbkombination und Klarheit eine starke visuelle Identität geschaffen.<br>"
    },
    {
        question: "5. An welches Unternehmen denkst du, wenn du dieses Bild siehst?",
        answers: ["Fritz-Cola", "Pepsi", "Coca-Cola"],
        correct: 1,
        logo: "../bilder/pepsi_logo.png",
        explanation: "Richtig! <br> Das abgebildete Logo gehört zu Pepsi. Die markante Kombination aus Rot, Weiß und Blau ist weltweit bekannt und vermittelt Frische und Lebendigkeit. Pepsis Logo, zusammen mit den Farben, ist so einprägsam, dass es oft sofort mit dem Erfrischungsgetränk assoziiert wird und sich stark von Konkurrenten abhebt.<br>"
    }
];


var currentQuestionIndex = 0;
var feedbackGiven = false;
var retryMode = false; // Variable für den Wiederholungsmodus

gsap.registerPlugin(TextPlugin);

localStorage.setItem("lastLevel", "md2");

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
});

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text oder Frage)
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
            } else if (textElement.innerText === "Du hast alle Fragen richtig beantwortet und somit das Level erfolgreich beendet! Du kannst mit einem Klick oder Über den Pfeil in der oberen linken Ecke auf die Startseite zurück") {
                backPlanet("md.html");
            } else if (textElement.innerText === text3 || feedbackGiven || retryMode) {
                clearText();
                if (retryMode) {
                    retryMode = false;
                    showQuestion();
                } else {
                    showQuestion();
                    feedbackGiven = false;
                }
            }
        }
    });
});

// Funktion zum Starten des Levels
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

// Funktion zum Anzeigen des nächsten Textes
function showNextText(text) {
    textAnimation.to("#text", {
        duration: 3,
        delay: 1,
        text: text,
        onComplete: function() {
            startDotsAnimation();
            console.log("Text wird ausgeführt");
        }
    });
}

// Funktion zum Leeren des Textfelds
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

// Funktion zur Animation der Punkte
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

// Funktion zum Anzeigen der Frage
function showQuestion() {
    document.getElementById("questionContainer").style.display = "flex";

    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;

    var logoContainer = document.getElementById("logo");
    if (currentQuestion.logo) {
        logoContainer.innerHTML = `<img src="${currentQuestion.logo}" alt="Logo" style="max-width: 185px; max-height: 185px;">`;
    } else {
        logoContainer.innerHTML = "";
    }

    var answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, index) {
        var answerElement = document.createElement("div");
        answerElement.className = "answer";
        answerElement.innerText = answer;
        answerElement.onclick = function() {
            if (!feedbackGiven && !retryMode) {
                checkAnswer(index);
            }
        };
        answersContainer.appendChild(answerElement);
    });

    gsap.from("#questionContainer", {
        y: 1500,
        duration: 2,
        ease: 'power4.out',
    });
}

// Funktion zum Überprüfen der Antwort
function checkAnswer(selectedIndex) {
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        displayFeedback(currentQuestion.explanation, true);
    } else {
        displayFeedback("Falsch! Klicke hier um es erneut zu versuchen.", false);
        retryMode = true; // Aktiviere den Wiederholungsmodus für falsch beantwortete Fragen
    }
    feedbackGiven = true;
}

// Funktion zum Anzeigen des Feedbacks
function displayFeedback(message, isCorrect) {
    var copilotImg = document.getElementById("copilot");
    if (isCorrect) {
        copilotImg.src = "../bilder/copilot_sassy.svg";
    } else {
        copilotImg.src = "../bilder/copilot_sad.svg";
    }

    textAnimation.to("#text", {
        duration: 3,
        delay: 1,
        text: message,
        onComplete: function() {
            startDotsAnimation(); // Punkteanimation starten
            console.log("Feedback angezeigt");
            if (!isCorrect) {
                feedbackGiven = false;
                retryMode = true;
            } else {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    var currentQuestion = questions[currentQuestionIndex - 1];
                } else {
                    localStorage.setItem("md_level2_done", 'true');
                    currentQuestionIndex = 0;
                    textAnimation.to("#text", {
                        duration: 3,
                        delay: 15,
                        text: "Du hast alle Fragen richtig beantwortet und somit das Level erfolgreich beendet! Du kannst mit einem Klick oder Über den Pfeil in der oberen linken Ecke auf die Startseite zurück"
                    });
                }
            }
        }
    });
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