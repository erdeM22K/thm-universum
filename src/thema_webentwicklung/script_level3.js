document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Überprüfen, ob die Enter-Taste gedrückt wurde
        var text = event.target.value;

        if (text === "startRocket();") {
            gsap.to(".rocket_container", {
                x: 1500,
                y: -1500,
                duration: 5, 
                ease: "power1.inOut" 
            });
            gsap.to(".rocket_container", {
                duration: 2.5,
                rotation: 40, // degrees
                ease: "power1.inOut" 
            });
            clearText();
            showNextText(text5);
            showInputField("off");
        } else {
            image.src = './bilder/rocket.svg';
        }
    }
});

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