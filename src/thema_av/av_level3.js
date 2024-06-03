tilo.jkl
tilo.jkl
Unsichtbar

erdeM
 hat einen Anruf gestartet, der 3 Stunden gedauert hat.
 — 05.10.2022 14:02
tilo.jkl
 hat einen Anruf gestartet, der ein paar Sekunden gedauert hat.
 — 01.11.2022 17:12
tilo.jkl
 hat einen Anruf gestartet, der eine Minute gedauert hat.
 — 09.11.2022 16:10
tilo.jkl
 hat einen Anruf gestartet, der eine Minute gedauert hat.
 — 09.11.2022 16:11
tilo.jkl
 hat einen Anruf gestartet, der ein paar Sekunden gedauert hat.
 — 09.11.2022 16:13
erdeM
 hat einen Anruf gestartet, der 3 Stunden gedauert hat.
 — 09.11.2022 16:16
erdeM — 09.11.2022 17:18
https://www.youtube.com/watch?v=gEMs4UBVaY4&ab_channel=erdeM
YouTube
erdeM
Übung 2: Kamera setzen - Erdem Kardas
Bild
erdeM — 09.11.2022 18:50
Anhand dessen spielt es bei der Blende und Brennweite keine Rolle, wie weit oder wie nah das aufgenommene Objekt von der Kamera entfernt ist, da man anhand der Brennweite und Blende den Bildausschnitt und Schärfe zum Objekt beliebig einstellen kann.
tilo.jkl — 09.11.2022 18:52
Anhand dessen spielt es keine Rolle, wie weit oder wie nah das aufgenommene Objekt von der Kamera entfernt ist, da man anhand der Brennweite und Blende den Bildausschnitt und die Schärfe des Objekts beliebig einstellen kann. 
erdeM — 09.11.2022 19:15
https://www.youtube.com/watch?v=d2EibmOHmKA&ab_channel=erdeM
YouTube
erdeM
Übung - Kamera setzen - Erdem Kardas
Bild
erdeM — 14.11.2022 20:26
https://discord.gg/DuxpKpns
erdeM — 06.08.2023 17:33
Dateityp des Anhangs: unknown
Webseitenlayout.fig
7.32 MB
erdeM — 21.05.2024 13:21
https://chatgpt.com/share/dbba1cb5-84ae-4b30-9291-9dcf5c5f9902
ChatGPT
A conversational AI system that listens, learns, and challenges
Bild
erdeM — 28.05.2024 10:48
Dateityp des Anhangs: acrobat
V2_-_CrypTool.pdf
4.20 MB
tilo.jkl — 31.05.2024 11:56
Dateityp des Anhangs: archive
mpm.zip
217.85 KB
erdeM — 31.05.2024 11:57
Danke
tilo.jkl — heute um 20:42 Uhr
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
Mehr anzeigen
css
3 kB
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">... (4 kB verbleibend)
Mehr anzeigen
html
54 kB
//Grundstruktur Animation + Interaktion

let currentSpeaker = 0;
let speakerConnected = [false, false];
const speaker = document.querySelectorAll(".speaker");
const steckplatz = document.querySelectorAll(".hitbox");

var text1 = "Willkommen im zweiten Level \"Audio\". In diesem Level besteht deine Aufgabe darin, die beiden Lautsprecher an den richtigen Steckplätzen am Mischpult anzuschließen.";
var text2 = "Klicke dazu zuerst auf den Lautsprecher und anschließend auf den Steckplatz.";
var textFehler = "Hoppla, da gehört das aber nicht hin. Versuch's nochmal!"
var textRichtig = "Super, weiter so!";


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
        }
    });
});

speaker.forEach(function(element) {
   element.addEventListener('click', function () {
       if (speaker[0] === element && !speakerConnected[0] && currentSpeaker != 1) {
           currentSpeaker = 1;
           stopSelectionAnimation("#Speaker_1");
           startSelectionAnimation("#Speaker_2");
           startSelectionAnimation(".steckplatz");
       } else if (speaker[1] === element && !speakerConnected[1] && currentSpeaker != 2) {
           currentSpeaker = 2;
           stopSelectionAnimation("#Speaker_2");
           startSelectionAnimation("#Speaker_1");
           startSelectionAnimation(".steckplatz");
       } else {
           stopSelectionAnimation("#Speaker_1");
           stopSelectionAnimation("#Speaker_2");
           stopSelectionAnimation(".steckplatz");
       }
   })
});

steckplatz.forEach(function (element) {
   element.addEventListener('click', function () {
       switch (currentSpeaker) {
           case 1:
               console.log(element);
               if (steckplatz[0] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[1] === element) {
                   speakerConnected[0] = true;
                   clearText();
                   testBeideVerbunden();
                   showNextText(textRichtig);
                   gsap.to("#SteckerR", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   gsap.to("#KabelR", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   stopSelectionAnimation("#Speaker_2");
                   stopSelectionAnimation(".steckplatz");
               } else if (steckplatz[2] === element) {
                   clearText();
                   showNextText(textFehler);
               }
               break;
           case 2:
               console.log(element);
               if (steckplatz[0] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[1] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[2] === element) {
... (126 Zeilen verbleibend)
Einklappen
javascript
8 kB
erdeM — heute um 20:44 Uhr
dankeeee
😗
tilo.jkl — heute um 20:44 Uhr
kein diing
﻿
//Grundstruktur Animation + Interaktion

let currentSpeaker = 0;
let speakerConnected = [false, false];
const speaker = document.querySelectorAll(".speaker");
const steckplatz = document.querySelectorAll(".hitbox");

var text1 = "Willkommen im zweiten Level \"Audio\". In diesem Level besteht deine Aufgabe darin, die beiden Lautsprecher an den richtigen Steckplätzen am Mischpult anzuschließen.";
var text2 = "Klicke dazu zuerst auf den Lautsprecher und anschließend auf den Steckplatz.";
var textFehler = "Hoppla, da gehört das aber nicht hin. Versuch's nochmal!"
var textRichtig = "Super, weiter so!";


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
        }
    });
});

speaker.forEach(function(element) {
   element.addEventListener('click', function () {
       if (speaker[0] === element && !speakerConnected[0] && currentSpeaker != 1) {
           currentSpeaker = 1;
           stopSelectionAnimation("#Speaker_1");
           startSelectionAnimation("#Speaker_2");
           startSelectionAnimation(".steckplatz");
       } else if (speaker[1] === element && !speakerConnected[1] && currentSpeaker != 2) {
           currentSpeaker = 2;
           stopSelectionAnimation("#Speaker_2");
           startSelectionAnimation("#Speaker_1");
           startSelectionAnimation(".steckplatz");
       } else {
           stopSelectionAnimation("#Speaker_1");
           stopSelectionAnimation("#Speaker_2");
           stopSelectionAnimation(".steckplatz");
       }
   })
});

steckplatz.forEach(function (element) {
   element.addEventListener('click', function () {
       switch (currentSpeaker) {
           case 1:
               console.log(element);
               if (steckplatz[0] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[1] === element) {
                   speakerConnected[0] = true;
                   clearText();
                   testBeideVerbunden();
                   showNextText(textRichtig);
                   gsap.to("#SteckerR", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   gsap.to("#KabelR", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   stopSelectionAnimation("#Speaker_2");
                   stopSelectionAnimation(".steckplatz");
               } else if (steckplatz[2] === element) {
                   clearText();
                   showNextText(textFehler);
               }
               break;
           case 2:
               console.log(element);
               if (steckplatz[0] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[1] === element) {
                   clearText();
                   showNextText(textFehler);
               } else if (steckplatz[2] === element) {
                   speakerConnected[1] = true;
                   clearText();
                   testBeideVerbunden();
                   showNextText(textRichtig);
                   gsap.to("#SteckerL", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   gsap.to("#KabelL", {
                       opacity: 1,
                       duration: 0.5,
                       ease: "elastic.out(1,0.5)",
                   });
                   stopSelectionAnimation("#Speaker_1");
                   stopSelectionAnimation(".steckplatz");
               }
           break;
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
            startDotsAnimation(text);
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

function setSpeakerHoverAnimation(id, speaker) {
    speaker.addEventListener("mouseenter", function () {
        gsap.to(id, {
            scale: 1.05,
            duration: 0.2,
        });
    });

    speaker.addEventListener("mouseleave", function () {
        gsap.to(id, {
            scale: 1,
            duration: 0.2,
        });
    });
}

function startSelectionAnimation(id) {
    gsap.to(id, {
        duration: 1,
        scale: 1.05,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 50%"
    });
}

function stopSelectionAnimation(id) {
    gsap.set(id, {
        scale: 1,
    });
    gsap.killTweensOf(id);
}

function testBeideVerbunden() {
    if (speakerConnected[0] && speakerConnected[1]) {
        textRichtig = "Herzlichen Glückwunsch, du hast es geschafft!";
    }
}