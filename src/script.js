document.addEventListener('DOMContentLoaded', function () {
    const feed = document.getElementById('planeten_container');
    const textfeld = document.querySelector(".textfeld");
    const copilotContainer = document.querySelector(".copilot_container");
    let skillIcon = document.querySelector("#skillbars");
    let closeSkills = document.querySelector("#close");
    const text1 = "Willkommen an Bord unseres Raumschiffs, Entdecker des Medieninformatik-Universums! Ich bin dein Copilot und freue mich, dich auf dieser spannenden Reise zu begleiten. Gemeinsam werden wir die vielfältigen Welten der Medieninformatik erkunden.";
    const text2 = "Jeder Planet in diesem Universum repräsentiert einen einzigartigen Bereich der Medieninformatik, den es zu erkunden gilt. Mehr zu dem jeweiligen Bereich erzähle ich dir auf den Planeten.";
    const text3 = "Oh, ein Fehler im Raumschiff hat die Koordinaten zum Planeten des Gamedevelopments gelöscht... Wir müssen wohl erst die anderen Planeten bereisen, um die benötigten Koordinaten wiederzufinden."
    const text4 = "Bist du bereit? Setze dich ans Steuer, aktiviere die Antriebe und lass uns gemeinsam die unendlichen Möglichkeiten der Medieninformatik erkunden!";
    const text5 = "Herzlichen Glückwunsch, du hast das gesamte Medieninformatik-Universum erkundet! :) Ich muss leider schon dem nächsten Entdecker helfen, aber schau dich gern noch etwas um und bis bald!"
    const textAnimation = gsap.timeline();
    const whiteOverlayStart = document.querySelector('.white-overlay-start');

    gsap.registerPlugin(TextPlugin);

    gsap.to(".white-overlay-start", {
        y: 0,
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
        onComplete: () => {
            whiteOverlayStart.style.display ="none";
        }
    });

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
        const skills = ["Webentwicklung", "Audiovisuelle Medien", "Grafische Datenverarbeitung", "Mobile Apps", "Mediendesign", "Game Development"];
        const skillsShort = ["wpr", "av", "gd", "ma", "md", "gamedev"];
        const levelCounts = [3, 4, 3, 3, 3, 1];
        const baseSkillValue = 0.05;
        const totalSkillValue = 0.95;
        const gameDesignIndex = 5;

        let totalLevels = calculateTotalLevels(levelCounts);
        let skillValues = initializeSkillValues(skills.length, baseSkillValue);

        createSkillDisplay(skills);
        updateSkillValues(skills, skillsShort, levelCounts, skillValues, totalSkillValue, totalLevels, gameDesignIndex);
        animateSkills(delay, skillValues);
    }

    function calculateTotalLevels(levelCounts) {
        return levelCounts.reduce((total, count) => total + count, 0);
    }

    function initializeSkillValues(length, baseValue) {
        return Array(length).fill(baseValue);
    }

    function createSkillDisplay(skills) {
        const skillHeadline = document.createElement('h1');
        skillHeadline.id = "skillHeadline";
        skillHeadline.innerHTML = "Deine Skills";
        document.body.appendChild(skillHeadline);

        const skillContainer = document.createElement('div');
        skillContainer.id = "skillContainer";
        document.body.appendChild(skillContainer);

        skills.forEach(skill => {
            let skillName = document.createElement('div');
            skillName.className = "skillName";
            skillName.innerHTML = skill;
            skillContainer.appendChild(skillName);

            let skillValue = document.createElement('div');
            skillValue.className = "skillValue";
            skillContainer.appendChild(skillValue);
        });
    }

    function updateSkillValues(skills, skillsShort, levelCounts, skillValues, totalSkillValue, totalLevels, gameDesignIndex) {
        let skillBonus = totalSkillValue / totalLevels;

        for (let i = 0; i < skills.length; i++) {
            for (let level = 1; level <= levelCounts[i]; level++) {
                if (localStorage.getItem(`${skillsShort[i]}_level${level}_done`)) {
                    console.log(`${skills[i]} Level ${level} fertig.`);
                    skillValues[i] += totalSkillValue / levelCounts[i];
                    skillValues[gameDesignIndex] += skillBonus;
                }
            }
        }
    }

    function animateSkills(delay, skillValues) {
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
            gsap.to(`.skillValue:nth-child(${i * 2 + 2})`, {
                delay: delay + 0.3 + i * staggerFactor,
                width: skillValues[i] * 100 + "%",
                duration: 0.5,
                ease: "power2.out"
            });
        }
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

    if(!localStorage.getItem("landingpage_visited")) {
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
    } else if (localStorage.getItem("gamedev_done") && !localStorage.getItem("finaltext_read")) {
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
            text: text5,
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

    $(document).ready(function() {
        function loadPlanets() {
            $.ajax({
                type: "GET",
                url: "data.xml",
                dataType: "xml",
                success: function(xml) {
                    // Body
                    $('#body').css('background-image', 'url(' + $(xml).find('background').text() + ')');

                    // Header
                    $('#logo').attr('src', $(xml).find('logo').text());
                    $('#title2').text($(xml).find('title1').text());
                    $('#title').text($(xml).find('title2').text());

                    // Clouds
                    var cloudsSvg = $(xml).find('clouds').html(); // Get the SVG content as HTML string
                    $('.clouds-wrapper').html(cloudsSvg); // Inject SVG into the clouds-wrapper

                    // Planets
                    $(xml).find('planet').each(function(index) {
                        var id = $(this).attr('id');
                        var title = $(this).find('title').text();
                        var image = $(this).find('image').text();
                        var link = $(this).find('link').text(); // Link aus XML holen

                        var onClickFunction;
                        if (id == 6) {
                            onClickFunction = "showCoordinateInput()";
                        } else {
                            onClickFunction = "openPlanet('" + link + "')";
                        }

                        // Create planet container
                        var planetContainer = $('<div>', { class: 'planet_container', onclick: onClickFunction }).append(
                            $('<h1>', { class: 'planet_title', text: title }),
                            $('<div>', { class: 'planet', id: 'planet' + id }).css('background-image', 'url(' + image + ')')
                        );

                        $('#planeten_container').append(planetContainer);
                    });

                    // Footer
                    $('#copyright').text($(xml).find('links > copyright').text());
                    $('#impressum').text($(xml).find('links > impressum').text());

                    // Call animation functions based on media queries
                    const mediaQuery = window.matchMedia('(max-width: 480px)');
                    const mediaQuery2 = window.matchMedia('(min-width: 481px)');

                    function handleMediaQueryChange(event) {
                        if (event.matches) {
                            animatePlanetsMobile();
                        }
                    }

                    function handleMediaQueryChange2(event) {
                        if (event.matches) {
                            animatePlanetsDesktop();
                        }
                    }

                    if (mediaQuery.matches) {
                        animatePlanetsMobile();
                    }
                    mediaQuery.addListener(handleMediaQueryChange);

                    if (mediaQuery2.matches) {
                        animatePlanetsDesktop();
                    }
                    mediaQuery2.addListener(handleMediaQueryChange2);

                    // Infinite scroll
                    let loading = false;
                    $(window).on('scroll', function() {
                        if (!loading && $(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
                            loading = true;
                            setTimeout(function() {
                                $('#planeten_container .planet_container').each(function() {
                                    var clone = $(this).clone(true);
                                    $('#planeten_container').append(clone);
                                });
                                loading = false;
                            }, 500);
                        }
                    });
                },
                error: function() {
                    console.log("Failed to load XML file.");
                }
            });
        }

        // Function to start animation on desktop
        function animatePlanetsDesktop() {
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
                    duration: 2.5,
                    stagger: 0.5,
                    ease: 'power4.out',
                    delay: 3
                });
            }
        }

        // Function to start animation on mobile
        function animatePlanetsMobile() {
            if(!localStorage.getItem("landingpage_visited")) {
                gsap.from('.planet', {
                    x: -2500,
                    duration: 2,
                    stagger: 0.5,
                    ease: 'power4.out',
                    delay: 1.5
                });
                gsap.from('.planet_title', {
                    x: -2500,
                    duration: 2.5,
                    stagger: 0.5,
                    ease: 'power4.out',
                    delay: 1.5
                });
            }
        }

        // Call the function to load planets and initiate animations
        loadPlanets();
    });

    function addResetButton() {
        let resetButton = document.createElement('button');
        resetButton.id = "resetButton";
        resetButton.innerText = "Zurücksetzen";
        document.querySelector("body").appendChild(resetButton);

        gsap.from('#resetButton', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        setButtonAnimation("#resetButton", resetButton);

        resetButton.addEventListener('click', function() {
            const confirmation = confirm("Bist du sicher, dass du deinen Fortschritt zurücksetzen willst?");
            if (confirmation) {
                localStorage.clear();
                window.location.href = "index.html";
            }
        });
    }

    function removeResetButton() {
        document.querySelector('#resetButton').remove();
        gsap.to('#resetButton', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function () {
                document.querySelector('#resetButton').remove();
            }
        });
    }


    skillIcon.addEventListener('click', function () {
        showSkills(0);

        addResetButton();

        skillIcon.style.display = "none";
        closeSkills.style.display = "block";
    });

    closeSkills.addEventListener('click', function () {
        hideSkills();

        removeResetButton();

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
                else if (textElement.innerHTML === text4 || textElement.innerHTML === text5) {
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
                    if (textElement.innerHTML === text5) {
                        localStorage.setItem("finaltext_read", "true");
                    }
                }
            }
        });
    });
});

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

function showCoordinateInput() {
    const coordinates = [6, 1, 1, 6, 9];
    const totalCoordinates = 5;

    createCoordinateWindow();
    const coordinateInputs = createCoordinateInputs(totalCoordinates, coordinates);
    setInputFocusAndNavigation(coordinateInputs);
    createCoordinateSubmitButton(coordinates, coordinateInputs);
    createCoordinateCloseButton();
    showOverlay();
}

function createCoordinateWindow() {
    const coordinateWindow = document.createElement('div');
    coordinateWindow.id = "coordinateWindow";
    document.body.appendChild(coordinateWindow);

    const coordinateHeadline = document.createElement('h1');
    coordinateHeadline.id = "coordinateHeadline";
    coordinateHeadline.innerHTML = "Koordinaten";
    coordinateWindow.appendChild(coordinateHeadline);

    const coordinateContainer = document.createElement('div');
    coordinateContainer.id = "coordinateContainer";
    coordinateWindow.appendChild(coordinateContainer);
}

function createCoordinateInputs(totalCoordinates, coordinates) {
    const coordinateContainer = document.getElementById('coordinateContainer');

    for (let i = 0; i < totalCoordinates; i++) {
        let coordinateInput = document.createElement('input');
        coordinateInput.className = "coordinateInput";
        coordinateInput.maxLength = 1;
        coordinateInput.type = "number";
        coordinateInput.pattern = "[0-9]";
        if (localStorage.getItem(`module${i}_done`)) {
            coordinateInput.value = coordinates[i];
        }
        coordinateContainer.appendChild(coordinateInput);
    }

    let coordinateInputs = document.querySelectorAll('.coordinateInput');
    coordinateInputs[0].focus();
    return coordinateInputs;
}

function setInputFocusAndNavigation(coordinateInputs) {
    coordinateInputs.forEach((input, index) => {
        input.addEventListener('input', function (ev) {
            limitInputToSingleDigit(this);
            focusNextInput(ev, index, coordinateInputs);
        });

        input.addEventListener('keydown', function (event) {
            handleArrowKeys(event, index, coordinateInputs);
            if (event.key === 'Enter') {
                event.preventDefault();
                checkCoordinates(coordinates, coordinateInputs);
            }
            console.log(event.key);
        });
    });
}

function limitInputToSingleDigit(input) {
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
}

function focusNextInput(ev, index, coordinateInputs) {
    if (index < coordinateInputs.length - 1 && !ev.inputType.includes('deleteContent')) {
        coordinateInputs[index + 1].focus();
    }
}

function handleArrowKeys(event, index, coordinateInputs) {
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
}

function createCoordinateSubmitButton(coordinates, coordinateInputs) {
    const coordinateSubmit = document.createElement('button');
    coordinateSubmit.id = "coordinateSubmit";
    coordinateSubmit.innerHTML = "Prüfen";
    document.getElementById('coordinateWindow').appendChild(coordinateSubmit);
    setButtonAnimation("#coordinateSubmit", coordinateSubmit);

    coordinateSubmit.addEventListener('click', function () {
        checkCoordinates(coordinates, coordinateInputs);
    });
}

function createCoordinateCloseButton() {
    const coordinateClose = document.createElement('a');
    coordinateClose.className = "menu";
    coordinateClose.id = "coordinateClose";
    coordinateClose.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>`;
    document.getElementById('coordinateWindow').appendChild(coordinateClose);

    coordinateClose.addEventListener('click', function () {
        hideCoordinateInput();
    });
}

function showOverlay() {
    document.querySelector("#overlay").style.display = "block";
    gsap.from('#coordinateWindow', {
        y: -50,
        opacity: 0,
        duration: 0.5
    });

    document.querySelector("#overlay").addEventListener('click', function () {
        hideCoordinateInput();
    });
}


function checkCoordinates(coordinates, coordinateInputs) {
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
                        hideCoordinateInput();
                        openPlanet("thema_gamedev/level1.html");
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
function openPlanet(relativeUrl) {
    // Holen der Basis-URL des aktuellen Dokuments
    var baseUrl = window.location.href.split('/').slice(0, -1).join('/');

    // Verwandeln des relativen Links in einen absoluten Link
    var absoluteUrl = baseUrl + '/' + relativeUrl;
    const whiteOverlay = document.querySelector('.white-overlay');
    const stars = document.querySelector('.star');
    whiteOverlay.style.display ="block";
    stars.style.display ="block";
    // Animation und Weiterleitung
    const overlay = document.querySelector('.transition-overlay');
    const clouds = document.querySelector('.clouds');
    overlay.style.display ="block";
    clouds.style.display ="block";
    gsap.to(overlay, {
        y: -2200,
        duration: 1.5,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
        }
    });
    gsap.to(".clouds", {
        y: -300,
        duration: 1.5,
        opacity: 1,
        ease: "power1.inOut",
        onComplete: () => {
            console.log('Navigating to: ' + absoluteUrl);
            clouds.style.display ="none";
        }
    })
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

function showQr() {
    var qrcodeContainer = document.getElementById('qrcode-container');
    var qrcode = document.getElementById('qrcode');
    var qrTitle = document.getElementById('qrtitle');
    qrcode.style.display = "block";
    qrTitle.style.display = "block";

    // Den QR-Code unsichtbar machen und Container einblenden
    qrcode.style.transform = 'scale(0)';
    qrTitle.style.transform = 'scale(0)';
    qrcodeContainer.style.display = 'flex';

    // Timeout verwenden, um die Skalierung nach der Anzeige zu animieren
    setTimeout(function() {
        // Skalierung des QR-Codes auf 1 für die volle Größe
        qrcode.style.transform = 'scale(2)';
        qrTitle.style.transform = 'scale(1)';
    }, 50); // Eine kurze Verzögerung für die Animation
}

// Event-Listener hinzufügen, um den QR-Code beim Klick außerhalb des QR-Codes zu schließen
document.getElementById('qrcode-container').addEventListener('click', function(e) {
    if (e.target === this) {
        hideQr();
    }
});




// Funktion, um den QR-Code zu verbergen
function hideQr() {
    var qrcodeContainer = document.getElementById('qrcode-container');
    var qrcode = document.getElementById('qrcode');
    var qrTitle = document.getElementById('qrtitle');

    // Skalierung des QR-Codes auf 0 für das Verstecken
    qrcode.style.transform = 'scale(0)';
    qrTitle.style.transform = 'scale(0)';

    // Den Container nach einer kurzen Verzögerung ausblenden, um die Animation abzuschließen
    setTimeout(function() {
        qrcodeContainer.style.display = 'none';
    }, 150); // Zeit entsprechend der CSS-Transition-Dauer anpassen
}

document.getElementById('qrbutton').addEventListener('mouseenter', function() {
    showQr();

});

document.getElementById('qrbutton').addEventListener('mouseleave', function() {
    hideQr();
});

function adjustLayout() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustLayout);
window.addEventListener('load', adjustLayout);
