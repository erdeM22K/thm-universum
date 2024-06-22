document.addEventListener('DOMContentLoaded', function () {
    const feed = document.getElementById('planeten_container');
    const textfeld = document.querySelector(".textfeld");
    const copilotContainer = document.querySelector(".copilot_container");
    let skillIcon = document.querySelector("#skillbars");
    let closeSkills = document.querySelector("#close");
    const text1 = "Willkommen an Bord unseres Raumschiffs, Entdecker des Medieninformatik-Universums! Ich bin dein Copilot und freue mich, dich auf dieser spannenden Reise zu begleiten. Gemeinsam werden wir die vielfältigen Welten der Medieninformatik erkunden.";
    const text2 = "Jeder Planet in diesem Universum repräsentiert einen einzigartigen Bereich der Medieninformatik, den es zu erkunden gilt. Mehr zu dem jeweiligen Bereich erzähle ich dir, wenn wir zu dem Planeten fliegen.";
    const text3 = "Oh, ein Fehler im Raumschiff hat die Koordinaten zum Planeten des Gamedevelopments gelöscht... Wir müssen wohl erst die anderen Planeten bereisen, um die benötigten Koordinaten wiederzufinden."
    const text4 = "Bist du bereit? Setze dich ans Steuer, aktiviere die Antriebe und lass uns gemeinsam die unendlichen Möglichkeiten der Medieninformatik erkunden!";
    const textAnimation = gsap.timeline();

    gsap.registerPlugin(TextPlugin);

    localStorage.setItem("lastLevel", "0");
    // Funktion, um die Inhalte am Ende zu duplizieren
    function duplicateContent() {
        const containers = feed.querySelectorAll('.planet_container');
        containers.forEach(container => {
            const clone = container.cloneNode(true);
            feed.appendChild(clone);
        });
        console.log('Content duplicated');
    }

    // Funktion zur Initialisierung des Skripts
    function init() {
        // Initiale Duplizierung der Inhalte
        duplicateContent();

        feed.addEventListener('scroll', () => {
            console.log('Scroll event detected');
            console.log('scrollTop:', feed.scrollTop);
            console.log('clientHeight:', feed.clientHeight);
            console.log('scrollHeight:', feed.scrollHeight);

            // Wenn der Benutzer sich dem Ende nähert, weitere Inhalte hinzufügen
            if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 50) {
                console.log('Near bottom, duplicating content');
                duplicateContent();
            }
        });
    }

    function startAnimationDesktop() {
        if(!localStorage.getItem("landingpage_visited")) {
            gsap.from('.planet', {
                y: -2500,
                duration: 2,
                stagger: 0.5,
                ease: 'power4.out',
                delay: 3
            });
            gsap.from('.planet_title', {
                y: -2500,
                duration: 3,
                stagger: 0.5,
                ease: 'power4.out',
                delay: 3
            });
            gsap.from('#title', {
                y: -1500,
                duration: 2,
                ease: 'power4.out',
                delay: 2
            });
            gsap.from('#title2', {
                y: -1500,
                duration: 2,
                ease: 'power4.out',
                delay: 1
            });
            gsap.from('#logo', {
                x: 1500,
                duration: 2,
                ease: 'power4.out'
            });
        }
    }

    function startAnimationMobile() {
        if(!localStorage.getItem("landingpage_visited")) {
            gsap.from('.planet', {
                x: -1500,
                duration: 3,
                stagger: 0.5,
                ease: 'power4.out',
                delay: 4
            });
            gsap.from('.planet_title', {
                x: -1500,
                duration: 3,
                stagger: 0.5,
                ease: 'power4.out',
                delay: 4
            });
            gsap.from('#title', {
                y: -2500,
                duration: 4,
                ease: 'power4.out',
                delay: 1
            });
            gsap.from('#title2', {
                y: -2500,
                duration: 4,
                ease: 'power4.out',
                delay: 1
            });
            gsap.from('#logo', {
                x: 500,
                duration: 3,
                ease: 'power4.out'
            });
        }
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
    function startAnimation() {
        textfeld.style.display = "block";
        copilotContainer.style.display = "block";
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

    function showSkills(delay) {
        let skills = ["Webentwicklung", "Audiovisuelle Medien", "Grafische Datenverarbeitung", "Mobile Apps", "Mediendesign", "Game Development"];
        let skillsShort = ["wpr", "av", "gd", "ma", "md", "gamedev"]
        let levelAnzahl = [3, 4, 3, 3, 3, 1];
        let levelAnzahlGesamt = 0;
        for (let i = 0; i < levelAnzahl.length; i++) {
            levelAnzahlGesamt += levelAnzahl[i];
        }
        let skillValues = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

        const skillHeadline = document.createElement('h1');
        skillHeadline.id = "skillHeadline";
        skillHeadline.innerHTML = "Deine Skills";
        document.querySelector("body").appendChild(skillHeadline);
        const skillContainer = document.createElement('div');
        skillContainer.id = "skillContainer";
        document.querySelector("body").appendChild(skillContainer);

        for (let i = 0; i < skills.length; i++) {
            let skillName = document.createElement('div');
            skillName.className = "skillName";
            skillName.className = "skillName";
            skillName.innerHTML = skills[i];
            skillContainer.appendChild(skillName);
            let skillValue = document.createElement('div');
            skillValue.className = "skillValue";
            skillContainer.appendChild(skillValue);

            //Prüfen, ob ein Modul fertig ist und Eintragen des skillValues


        }
        for (let modul = 0; modul < skills.length - 1; modul++) {
            let skillBonusGameDesign = 0.95/levelAnzahlGesamt;
            for (let level = 1; level <= levelAnzahl[modul]; level++) {
                if(localStorage.getItem(skillsShort[modul] + "_level" + level + '_done')) {
                    console.log(skills[modul] + " Level " + level + " fertig.");
                    skillValues[modul] += 0.95/levelAnzahl[modul];
                    skillValues[5] += skillBonusGameDesign;
                }
            }
        }

        document.querySelector("#overlay").style.display = "block";
        gsap.to("#overlay", {
            duration: 0.5,
            delay: delay,
            opacity: 0.9,

        });

        gsap.from('#skillHeadline', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            delay: delay,
        });

        gsap.from('#skillContainer div:nth-child(odd)', {
            x: -100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            delay: delay,
        });

        for (let i = 0; i < skillValues.length; i++) {
            let staggerFactor = 0.1;
            gsap.to(".skillValue:nth-child(" + (i * 2 + 2) + ")", {
                delay: delay + 0.3 + i * staggerFactor,
                width: skillValues[i] * 100 + "%",
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }

    function setButtonAnimation(id, button) {
        button.addEventListener("mouseenter", function () {
            gsap.to(id, {
                backgroundColor: "#f1f1f1",
                duration: 0.2,
                color: "#80ba24",
            });
            gsap.to(id, {
                delay: 0.2,
                backgroundColor: "#80ba24",
                duration: 0.2,
                color: "#f1f1f1",
            });
            gsap.to(id, {
                scale: 1.05,
                transformOrigin: "center center",
                duration: 0.2,
            });
        });

        button.addEventListener("mouseleave", function () {
            gsap.to(id, {
                scale: 1,
                transformOrigin: "center center",
                duration: 0.2,
            });
        });
    }

    function hideSkills() {
        gsap.to("#overlay", {
            duration: 0.5,
            opacity: 0,
            onComplete: function () {
                document.querySelector("#overlay").style.display = "none";
            }
        });
        gsap.to('#skillContainer div', {
            x: -100,
            opacity: 0,
            stagger: 0.015,
            duration: 0.5,
            onComplete: function () {
                document.querySelector("#skillContainer").remove();
            }
        });
        gsap.to('#skillHeadline', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            onComplete: function () {
                document.querySelector("#skillHeadline").remove();
            }
        });
    }

    function showCoordinateInput() {
        console.log("Koordinaten Hallo");
        const coordinates = [7, 3, 9, 4, 2];
        const coordinateWindow = document.createElement('div');
        const anzahlKoordinaten = 5;
        coordinateWindow.id = "coordinateWindow";
        document.querySelector("body").appendChild(coordinateWindow);

        const coordinateHeadline = document.createElement('h1');
        coordinateHeadline.id = "coordinateHeadline";
        coordinateHeadline.innerHTML = "Koordinaten";
        coordinateWindow.appendChild(coordinateHeadline);

        const coordinateContainer = document.createElement('div');
        coordinateContainer.id = "coordinateContainer";
        coordinateWindow.appendChild(coordinateContainer);

        for (let i = 0; i < anzahlKoordinaten; i++) {
            let coordinateInput = document.createElement('input');
            coordinateInput.className = "coordinateInput";
            coordinateInput.maxLength = 1;
            coordinateInput.type = "number";
            coordinateInput.pattern = "[0-9]";
            if (localStorage.getItem("module" + i + "_done")) {
                coordinateInput.value = coordinates[i];
            }
            coordinateContainer.appendChild(coordinateInput);
        }

        let coordinateInputs = document.querySelectorAll('.coordinateInput');

        coordinateInputs.forEach((input, index) => {
            input.addEventListener('input', function(ev) {
                // Begrenze die Eingabe auf eine Ziffer
                if (this.value.length > 1) {
                    this.value = this.value.slice(0, 1);
                }
                if (index < coordinateInputs.length - 1 && !ev.inputType.includes('deleteContent')) {
                    coordinateInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    if (index > 0) {
                        coordinateInputs[index - 1].focus();
                    }
                }

                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    if (index < coordinateInputs.length - 1) {
                        coordinateInputs[index + 1].focus();
                    }
                }
            });
        });



        const coordinateSubmit = document.createElement('button');
        coordinateSubmit.id = "coordinateSubmit";
        coordinateSubmit.innerHTML = "Prüfen";
        coordinateWindow.appendChild(coordinateSubmit);
        setButtonAnimation("#coordinateSubmit", coordinateSubmit);

        coordinateSubmit.addEventListener('click', function () {
            let coordinateConfirmations = 0;
            for (let i = 0; i < coordinates.length; i++) {
                if (coordinates[i] == coordinateInputs[i].value) {
                    coordinateConfirmations++;
                }
            }
            if (coordinateConfirmations === coordinates.length) {
                gsap.to(".coordinateInput", {
                    color: "#80ba24",
                    borderColor: "#80ba24",
                    duration: 0.2,
                    ease: "power2.out",
                    stagger: 0.1,
                    onComplete: function (){
                        gsap.to("#coordinateContainer", {
                            scale: 1.1,
                            duration: 0.2,
                            ease: "power2.out",
                        })
                        gsap.to("#coordinateContainer", {
                            scale: 1,
                            delay: 0.2,
                            duration: 0.2,
                            ease: "power2.out",
                            onComplete: function () {
                                window.location.href = "thema_gamedev/level1.html";
                            }
                        })
                    }
                });
            }
            else {
                gsap.to("#coordinateSubmit", {
                   backgroundColor: "red",
                   duration: 0.2,
                    ease: "power2.out",
                });
                gsap.to("#coordinateSubmit", {
                    transform: "rotate(5deg)",
                    duration: 0.1,
                    ease: "power2.out",
                });
                gsap.to("#coordinateSubmit", {
                    transform: "rotate(-5deg)",
                    duration: 0.1,
                    ease: "power2.out",
                    delay: 0.1
                });
                gsap.to("#coordinateSubmit", {
                    transform: "rotate(0)",
                    duration: 0.1,
                    ease: "power2.out",
                    delay: 0.2
                });
                gsap.to("#coordinateSubmit", {
                    backgroundColor: "#80ba24",
                    duration: 0.1,
                    delay: 0.5,
                    ease: "power2.out",
                });
            }
        });

        document.querySelector("#overlay").addEventListener('click', function () {
           hideCoordinateInput();
        });

        const coordinateClose = document.createElement('a');
        coordinateClose.className = "menu";
        coordinateClose.id = "coordinateClose";
        coordinateClose.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/></svg>";
        coordinateWindow.appendChild(coordinateClose);

        coordinateClose.addEventListener('click', function () {
           hideCoordinateInput();
        });

        document.querySelector("#overlay").style.display = "block";

        gsap.from('#coordinateWindow', {
            y: -50,
            opacity: 0,
            duration: 0.5
        });
    }

    function hideCoordinateInput() {
        gsap.to('#coordinateWindow', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            onComplete: function () {
                document.querySelector("#coordinateWindow").remove();
                document.querySelector("#overlay").style.display = "none";
            }
        });
    }

    // Medienabfrage für Bildschirmbreiten ab 768px
    const mediaQuery = window.matchMedia('(max-width: 480px)');
    const mediaQuery2 = window.matchMedia('(min-width: 481px)');

    // Initialer Check und Hinzufügen des Eventlisteners
    function handleMediaQueryChange(event) {
        if (event.matches) {
            init();
            startAnimationMobile();
        }
    }

    function handleMediaQueryChange2(event) {
        if (event.matches) {
            startAnimationDesktop();
        }
    }

    if (!localStorage.getItem('landingpage_visited')) {
        document.querySelector("#overlay").style.display = "block";
        gsap.to("#overlay", {
            duration: 1,
            delay: 1,
            opacity: 0.5,
        });
        startAnimation();
        textAnimation.to("#text", {
            duration: 3,
            delay: 2,
            text: text1,
            onComplete: function() {
                startDotsAnimation();
                console.log("Text 1 ausgeführt");
            }
        });
    }

    if (mediaQuery.matches) {
        init();
        startAnimationMobile();
    }
    mediaQuery.addListener(handleMediaQueryChange);

    if (mediaQuery2.matches) {
        startAnimationDesktop();
    }
    mediaQuery2.addListener(handleMediaQueryChange2);

    skillIcon.addEventListener('click', function () {
        showSkills(0);
        skillIcon.style.display = "none";
        closeSkills.style.display = "block";
    });

    closeSkills.addEventListener('click', function () {
        hideSkills();
        skillIcon.style.display = "block";
        closeSkills.style.display = "none";
    });

    document.querySelectorAll('.textfeld').forEach(function(element) {
        element.addEventListener('click', function() {
            const textElement = document.getElementById("text");
            if (textAnimation.isActive() && textAnimation.progress() < 1) {
                textAnimation.progress(1);
            }
            else {
                if (textElement.innerHTML === text1) {
                    clearText();
                    showNextText(text2);
                }
                else if (textElement.innerHTML === text2) {
                    clearText();
                    showNextText(text3);
                }
                else if (textElement.innerHTML === text3) {
                    clearText();
                    showNextText(text4);
                }
                else if (textElement.innerHTML === text4  || textElement.innerHTML === allPlanetsDoneText) {
                    gsap.to(".textfeld", {
                        y: 1500,
                        duration: 3,
                        ease: 'power4.out',
                        opacity: 0,
                        onComplete: function () {
                            textfeld.style.display = "none";
                        }
                    });
                    gsap.to(".copilot_container", {
                        x: 1500,
                        duration: 3,
                        ease: 'power4.out',
                        opacity: 0,
                        onComplete: function () {
                            copilotContainer.style.display = "none";
                        }
                    });
                    localStorage.setItem('landingpage_visited', 'true');
                    gsap.to("#overlay", {
                        duration: 0.5,
                        opacity: 0,
                        onComplete: function () {
                            document.querySelector("#overlay").style.display = "none";
                        }
                    });
                }
            }
        });
    });
});
