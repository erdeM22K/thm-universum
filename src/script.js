

document.addEventListener('DOMContentLoaded', function () {
    const feed = document.getElementById('planeten_container');



    // Funktion, um die Inhalte am Ende zu duplizieren
    function duplicateContent() {
        const containers = feed.querySelectorAll('.planet_container');
        containers.forEach(container => {
            const clone = container.cloneNode(true);
            feed.appendChild(clone);
        });
    }

    // Funktion zur Initialisierung des Skripts
    function init() {
        // Initiale Duplizierung der Inhalte
        duplicateContent();

        feed.addEventListener('scroll', () => {
            // Wenn der Benutzer sich dem Ende nähert, weitere Inhalte hinzufügen
            if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 50) {
                duplicateContent();
            }
        });
    }



    function starAnimationDesktop () {
        gsap.from('.planet', {
            y: -1500,
            duration: 6,
            stagger: 2,
            ease: 'power4.out',
            delay: 3
        });
        gsap.from('.planet_title', {
            y: -1500,
            duration: 6,
            stagger: 2,
            ease: 'power4.out',
            delay: 3
        });
        gsap.from('#title', {
            y: -1500,
            duration: 4,
            ease: 'power4.out',
            delay: 1
        });
        gsap.from('#logo', {
            x: 1500,
            duration: 3,
            ease: 'power4.out'
        });
    }
    function starAnimationMobile () {
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
        gsap.from('#logo', {
            x: 500,
            duration: 3,
            ease: 'power4.out'
        });
    }

    // Medienabfrage für Bildschirmbreiten ab 768px
    const mediaQuery = window.matchMedia('(max-width: 480px)');

    // Eventlistener, um die Funktion zu initialisieren, wenn die Medienabfrage erfüllt ist
    function handleMediaQueryChange(event) {
        if (event.matches) {
            init();
            starAnimationMobile ()
            
        }
    }

    // Initialer Check und Hinzufügen des Eventlisteners
    if (mediaQuery.matches) {
        init();
        starAnimationMobile ()
    }
    mediaQuery.addListener(handleMediaQueryChange);

    const mediaQuery2 = window.matchMedia('(min-width: 481px)');

    // Eventlistener, um die Funktion zu initialisieren, wenn die Medienabfrage erfüllt ist
    function handleMediaQueryChange2(event) {
        if (event.matches) {
        starAnimationDesktop ()
            
        }
    }

    // Initialer Check und Hinzufügen des Eventlisteners
    if (mediaQuery2.matches) {

        starAnimationDesktop ()
    }
    mediaQuery2.addListener(handleMediaQueryChange2);
});
