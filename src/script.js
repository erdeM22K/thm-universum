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
    const whiteOverlay = document.querySelector('.white-overlay-start');
    function startAnimationDesktop() {
        gsap.to(".white-overlay-start", {
            y: 0,
            duration: 1,
            opacity: 0,
            ease: "power1.inOut",
            onComplete: () => {
                whiteOverlay.style.display ="none";
        }
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

    function startAnimationMobile() {
        gsap.to(".white-overlay-start", {
            y: 0,
            duration: 1,
            opacity: 0,
            ease: "power1.inOut",
            onComplete: () => {
                whiteOverlay.style.display ="none";
        }
    });
        gsap.from('#title', {
            y: -2500,
            duration: 2,
            ease: 'power4.out',
            delay: 1
        });
        gsap.from('#title2', {
            y: -2500,
            duration: 2,
            ease: 'power4.out',
            delay: 0.5
        });
        gsap.from('#logo', {
            x: 500,
            duration: 1.5,
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

                    // Create planet container
                    var planetContainer = $('<div>', { class: 'planet_container', onclick: "openPlanet('" + link + "')" }).append(
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

    // Function to start animation on mobile
    function animatePlanetsMobile() {
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

    // Call the function to load planets and initiate animations
    loadPlanets();
});


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