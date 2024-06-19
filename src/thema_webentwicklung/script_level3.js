<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles_webentwicklung.css">
    <title>Webentwicklung Level 1: HTML</title>
</head>
<body>
    <div class="black_transparent">

        <a href="../thema_webentwicklung/wpr.html" class="back-to-home" title="Zurück zur Startseite">
            &#8592;
        </a>

        <div class="rocket_container">
            <div class="content_container">
            </div>
            <img id="rocket" src="..\bilder\rocket.svg" alt="rocket">
        </div>
        <div class="copilot_container">
            <img class="copilot" src="..\bilder\copilot_lachen.svg" alt="copilot_sad">
        </div>
        <div class="textfeld">
            <div id="text">
            </div>
            <input class="input_feld" type="text" id="textInput" placeholder="">
            <div id="dots"></div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/TextPlugin.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/Draggable.min.js"></script>
    <script src="script_level3.js"></script>

    <script>
        var text1 = "Hallo ich bin Copilot, Willkommen auf dem Level!";
        var text2 = "Dies ist eine Grundstruktur.";
        var text3 = "Rufe mit JS die Funktion 'function startRocket(){...}' auf, um die Rakete zu starten";
        var text5 = "Rakete Startet!";
        var text4 = "Rufe hier die Funktion auf:" ;
    
        gsap.registerPlugin(TextPlugin);

        document.addEventListener('DOMContentLoaded', (event) => {
            startLevel();
        });
    
        // Initial Text anzeigen
        gsap.to("#text", {
            duration: 3,
            text: text1,
            delay: 2,
            onComplete: function() {
                startDotsAnimation();
                console.log("Text 1 ausgeführt");
            }
        });
    
        // Klick-Eventhandler für das Dokument
        document.querySelectorAll('.textfeld').forEach(function(element) {
            element.addEventListener('click', function() {
                const textElement = document.getElementById("text");
                if (textElement.innerText === text1) {
                    clearText();
                    showNextText(text2, 3);
                } else if (textElement.innerText === text2) {
                    clearText();
                    showNextText(text3, 4);
                } else if (textElement.innerText === text3) {
                    clearText();
                    showNextText(text4, 1);
                    showInputField("on");
                }
            });
        });

        function startLevel() {
            gsap.to(".black_transparent", {
            duration: 3, 
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Endfarbe mit Transparenz
            ease: "power1.inOut" 
        });
        gsap.from(".content", {
            x: 1500,
            duration: 3,
            stagger: 1,
            delay:4,
            ease: 'power4.out',
        });
        gsap.from(".textfeld", {
            y: 1500,
            duration: 3,
            stagger: 1,
            ease: 'power4.out',
        });
        gsap.from(".rocket_container", {
            y: -1500,
            duration: 10,
            stagger: 3,
            ease: 'power4.out',
        });
        gsap.from(".copilot_container", {
            x: 1500,
            duration: 3,
            stagger: 2,
            ease: 'power4.out',
        });
        }
    
        // Funktion zum Anzeigen des nächsten Textes
        function showNextText(text, zahl) {
            gsap.to("#text", {
                duration: zahl,
                delay: 1,
                text: text,
                onComplete: function() {
                    startDotsAnimation();
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

    function startDotsAnimation() {
        if (document.getElementById("text").innerText === text5) {
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

    function showInputField(onOff){
        if(onOff == "on") {
            document.getElementById("textInput").style.display = "block";
        } else if (onOff == "off"){
            document.getElementById("textInput").style.display = "none";
        }
    }
    </script>
</body>
</html>