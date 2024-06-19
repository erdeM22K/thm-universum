var text1 = "Willkommen beim ersten Level des Moduls Mobile Apps. Hier kannst du dein Wissen über mobile Softwareplattformen testen!";
var text2 = "Dieses Level beinhaltet mehrere Fragen zu verschiedenen Softwareplattformen. Jede Frage hat drei Antwortmöglichkeiten, jedoch ist immer nur eine Antwort korrekt.";
var text3 = "Lass uns mit der ersten Frage beginnen und dein Wissen über Softwareplattformen vertiefen!";



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

// Klick-Eventhandler für das Textfeld ('Klick' für nächsten Text oder Frage)
document.querySelectorAll('.textfeld').forEach(function(element) {
    element.addEventListener('click', function() {
        const textElement = document.getElementById("text");
        if (textElement.innerText === text1) {
            clearText();
            showNextText(text2);
        } else if (textElement.innerText === text2) {
            clearText();
            showNextText(text3);
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
    });
});


// Funktion zum Starten des Levels
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
            startDotsAnimation();
            console.log("Text wird ausgeführt");
        }
    });
}

// Funktion zum Leeren des Textfelds
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

// Funktion zur Animation der Punkte
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

    gsap.to("#text", {
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
                    gsap.to("#text", {
                        duration: 3,
                        delay: 10,
                        text: "Du hast alle Fragen richtig beantwortet und somit das erste Level erfolgreich beendet! Du kannst entweder mit einem Klick hier die Fragen wieder von vorne beginnen oder Über den Pfeil in der oberen linken Ecke kommst du auf die Startseite zurück"
                    });
                }
            }
        }
    });
}
