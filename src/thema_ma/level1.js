const textAnimation = gsap.timeline();

var text1 = "Willkommen beim ersten Level des Moduls Mobile Apps. Hier kannst du dein Wissen über mobile Softwareplattformen testen!";
var text2 = "Dieses Level beinhaltet mehrere Fragen zu verschiedenen Softwareplattformen. Jede Frage hat drei Antwortmöglichkeiten, jedoch ist immer nur eine Antwort korrekt.";
var text3 = "Lass uns mit der ersten Frage beginnen und dein Wissen über Softwareplattformen vertiefen!";
const whiteOverlay = document.querySelector('.white-overlay-start');


var questions = [
    {
        question: "1. Was ist eine Softwareplattform von Google?",
        answers: ["Android", "iOS", "Windows"],
        correct: 0,
        explanation: "Richtig! <br> Android ist ein Betriebssystem von Google, das auf Mobilgeräten weit verbreitet ist. Es bietet eine offene Plattform für Entwickler und eine Vielzahl von Anpassungsmöglichkeiten.<br>"
    },
    {
        question: "2. Welches Betriebssystem wird von Apple verwendet?",
        answers: ["Android", "iOS", "Linux"],
        correct: 1,
        explanation: "Richtig! <br> iOS ist das Betriebssystem von Apple, das auf iPhones, iPads und iPods verwendet wird. Es zeichnet sich durch eine hohe Benutzerfreundlichkeit und ein geschlossenes Ökosystem aus.<br>"
    },
    {
        question: "3. Wer entwickelt das Android-Betriebssystem?",
        answers: ["Apple", "Microsoft", "Google"],
        correct: 2,
        explanation: "Richtig! <br> Google entwickelt das Android-Betriebssystem und ist für dessen Weiterentwicklung verantwortlich. Es wird auf einer Vielzahl von Geräten verschiedener Hersteller eingesetzt.<br>"
    },
    {
        question: "4. Welche Programmiersprache wird hauptsächlich für iOS-Apps verwendet?",
        answers: ["Java", "Swift", "Python"],
        correct: 1,
        explanation: "Richtig! <br> Swift ist eine von Apple entwickelte Programmiersprache, die hauptsächlich für die Entwicklung von iOS- und macOS-Apps verwendet wird. Sie kombiniert Leistungsfähigkeit mit Sicherheit und Modernität.<br>"
    },
    {
        question: "5. Welche Plattform hat den größten Marktanteil im Bereich mobiler Betriebssysteme?",
        answers: ["Android", "iOS", "Windows Phone"],
        correct: 0,
        explanation: "Richtig! <br> Android hat weltweit den größten Marktanteil im Bereich mobiler Betriebssysteme. Dies liegt an seiner Vielseitigkeit, der Unterstützung durch eine Vielzahl von Geräten und einer großen Entwicklergemeinschaft.<br>"
    }
];

var currentQuestionIndex = 0;
var feedbackGiven = false;
var retryMode = false; // Variable für den Wiederholungsmodus

gsap.registerPlugin(TextPlugin);

localStorage.setItem("lastLevel", "ma1");
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

//blockiert das selectstart-Ereignis
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
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
        }
        else {
            if (textElement.innerText === text1) {
                clearText();
                showNextText(text2);
            } else if (textElement.innerText === text2) {
                clearText();
                showNextText(text3);
            } else if (textElement.innerText === "Du hast alle Fragen richtig beantwortet und somit das Level erfolgreich beendet! Du kommst entweder mit einem Klick oder Über den Pfeil in der oberen linken Ecke zur Levelauswahl zurück.") {
                backPlanet("ma.html");
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
            console.log(textAnimation.progress() + "progress");
        }
    });
});

// Funktion, um zu prüfen, ob der Text gerade animiert wird geskippt werden kann + Skippen
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
                    currentQuestionIndex = 0;
                    console.log("MA Level 1 fertig");
                    localStorage.setItem("ma_level1_done", 'true');
                    textAnimation.to("#text", {
                        duration: 3,
                        delay: 10,
                        text: "Du hast alle Fragen richtig beantwortet und somit das Level erfolgreich beendet! Du kommst entweder mit einem Klick oder Über den Pfeil in der oberen linken Ecke zur Levelauswahl zurück."
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
