document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Überprüfen, ob die Enter-Taste gedrückt wurde
        var text = event.target.value;
        
        // SVG-Elemente auswählen
        var shadow = document.getElementsByClassName('cls-7')[0];
        var reflection = document.getElementsByClassName('cls-9')[0];
        var color = document.getElementsByClassName('cls-11')[0];

        if (text === 'red' || text === 'rot') {
            changeColor('.cls-7', '#AA1A1A');
            changeColor('.cls-9', '#E22424');
            changeColor('.cls-11', '#C40808');
            localStorage.setItem("wpr_level2_done", "true");
            clearText();
            showNextText(text5, "off", "none");
            showInputField("off");
        } else if (text === 'blue' || text === 'blau') {
            changeColor('.cls-7', '#4B69E2');
            changeColor('.cls-9', '#8DABFF');
            changeColor('.cls-11', '#5A89FF');
            localStorage.setItem("wpr_level2_done", "true");
            clearText();
            showNextText(text5, "off", "none");
            showInputField("off");
        } else if (text === 'yellow' || text === 'gelb') {
            changeColor('.cls-7', '#EDD529');
            changeColor('.cls-9', '#FFF86C');
            changeColor('.cls-11', '#FCEB1D');
            localStorage.setItem("wpr_level2_done", "true");
            clearText();
            showNextText(text5, "off", "none");
            showInputField("off");
        } else if (text === 'green' || text === 'gruen' || text === 'grün') {
            changeColor('.cls-7', '#47D647');
            changeColor('.cls-9', '#95FF83');
            changeColor('.cls-11', '#4BF752');
            localStorage.setItem("wpr_level2_done", "true");
            clearText();
            showNextText(text5, "off", "none");
            showInputField("off");
        } else if (text === 'orange') {
            changeColor('.cls-7', '#F2AE40');
            changeColor('.cls-9', '#FFD85C');
            changeColor('.cls-11', '#FFC840');
            localStorage.setItem("wpr_level2_done", "true");
            clearText();
            showNextText(text5, "off", "none");
            showInputField("off");
        }
    }
});

function changeColor(selector, color) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.style.fill = color;
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
