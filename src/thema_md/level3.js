var text1 = "Willkommen beim dritten Level des Moduls Mediendesign! In diesem Level wirst du dein Wissen über mobile Formen und die dazugehörigen Marken testen. Es geht darum, wie gut du verschiedene Marken und deren Produkte anhand von Bildern und Logos erkennen kannst.";
var text2 = "Wir alle erkennen inzwischen viele Produkte und Marken allein anhand ihrer Form oder ihres Logos. Du wirst hier mehrere Produkte und Elemente gezeigt bekommen, die dir bestimmt bekannt vorkommen. Deine Aufgabe ist es, die richtige Marke oder das richtige Unternehmen zu identifizieren.";
var text3 = "Dieses Level soll dir zeigen, wie sehr wir Menschen uns Logos und Marken einprägen und wie wir oft nur durch die Form eines Produktes den Namen oder den Hersteller erkennen können. Tauche ein in die Welt der visuellen Identität und vertiefe dein Verständnis für Marken und ihre Erkennungsmerkmale im Modul Mediendesign!";


var questions = [
    {
        question: "1. An welche Marke denkst du, wenn du dieses Bild siehst?",
        answers: ["Pepsi", "Coca-Cola", "Fritz-Cola"],
        correct: 1,
        logo: "../bilder/cola_logo.png",
        explanation: "Richtig! <br> Das abgebildete Logo gehört zu Coca-Cola. Die Marke ist weltweit bekannt und das rote, weiße Design ihres Logos sowie die ikonische Flaschenform sind sofort erkennbar. Coca-Cola hat es geschafft, dass wir allein durch die Silhouette der Flasche und die Farbgebung die Marke direkt identifizieren können.<br>"
    },
    {
        question: "2. An welche Marke denkst du, wenn du dieses Bild siehst?",
        answers: ["Nutella", "Mr.Choc", "NussPli"],
        correct: 0,
        logo: "../bilder/nutella_logo.png",
        explanation: "Richtig! <br> Das Logo gehört zu Nutella. Die Marke ist berühmt für ihre unverwechselbare Glasform und das markante Design des Etiketts. Nutella ist leicht an der weißen Kappe, dem breiten Glas und den roten und weißen Farbtönen des Logos zu erkennen. Diese visuellen Merkmale machen es einfach, Nutella im Supermarktregal sofort zu finden.<br>"
    },
    {
        question: "3. An welche Marke denkst du, wenn du dieses Bild siehst?",
        answers: ["ChipZ", "Chip-Star", "Pringles"],
        correct: 2,
        logo: "../bilder/pringels_logo.png",
        explanation: "Richtig! <br> Das Logo gehört zu Pringles. Pringles ist bekannt für seine unverwechselbare zylindrische Verpackung und das Gesicht des Pringles-Maskottchens auf der Dose. Die Form der Dose und das lächelnde Gesicht machen die Marke sofort erkennbar, selbst ohne den Schriftzug zu lesen. Die stapelbaren Chips in der ikonischen Röhre sind ein weiteres einzigartiges Merkmal der Marke.<br>"
    },
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
                    showNextText(currentQuestion.explanation + " " + "Klicke unten, um die nächste Frage zu sehen.");
                } else {
                    currentQuestionIndex = 0;
                    gsap.to("#text", {
                        duration: 3,
                        delay: 15,
                        text: "Du hast alle Fragen richtig beantwortet und somit das erste Level erfolgreich beendet! Du kannst entweder mit einem Klick hier die Fragen wieder von vorne beginnen oder Über den Pfeil in der oberen linken Ecke kommst du auf die Startseite zurück"
                    });
                }
            }
        }
    });
}
