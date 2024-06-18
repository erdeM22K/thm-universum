document.addEventListener('DOMContentLoaded', function () {
    const feed = document.getElementById('planeten_container');

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
        gsap.from('.planet', {
            y: -2500,
            duration: 6,
            stagger: 2,
            ease: 'power4.out',
            delay: 5
        });
        gsap.from('.planet_title', {
            y: -2500,
            duration: 6,
            stagger: 2,
            ease: 'power4.out',
            delay: 5
        });
        gsap.from('#title', {
            y: -1500,
            duration: 4,
            ease: 'power4.out',
            delay: 2
        });
        gsap.from('#title2', {
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

    function startAnimationMobile() {
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

    if (mediaQuery.matches) {
        init();
        startAnimationMobile();
    }
    mediaQuery.addListener(handleMediaQueryChange);

    if (mediaQuery2.matches) {
        startAnimationDesktop();
    }
    mediaQuery2.addListener(handleMediaQueryChange2);
});
