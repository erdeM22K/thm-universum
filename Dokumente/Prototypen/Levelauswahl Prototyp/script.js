document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(TextPlugin);

    let spaceship = document.querySelector("#spaceship");
    // let timeline = gsap.timeline({paused: true});
    let start = 0;
    let level = 0;

    gsap.to("#spaceship", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 0,
        }
    });

    gsap.to("#spaceship", {
        duration: 0.8,
        scale: 1.02,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 50%"
    });

    spaceship.style.setProperty('display', 'block');

    let meteorid1 = document.querySelector("#meteorid1");
    let meteorid1TimelineRel = 0.3;

    let meteorid2 = document.querySelector("#meteorid2");
    let meteorid2TimelineRel = 0.7;
    let meteorid = document.querySelector(".meteorid");
    let levelLabel = document.querySelector("#level");

    meteorid1.addEventListener("click", function () {
        clearSelection();
        gsap.to("#start", {
            opacity: 0,
            scale: 0.5,
            delay: 0,
            duration: 0.2,
            ease: "power1.out",
        });
        if (level != 1) {
            gsap.to("#level", {
                duration: 0.3,
                text: "",
                ease: "power1.inOut",
            });
        }
        level = 1;
        gsap.to("#meteorid1", {
            duration: 1,
            scale: 1.05,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 50%"
        });
        gsap.to("#spaceship", {
            duration: 1,
            ease: "power1.inOut",
            motionPath: {
                path: "#path",
                align: "#path",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                start: start,
                end: meteorid1TimelineRel
            }
        });
        start = meteorid1TimelineRel;
        gsap.to("#level", {
            delay: 0.7,
            duration: 0.3,
            text: "Level 1",
            ease: "power1.inOut",
        });
        gsap.to("#start", {
            opacity: 1,
            scale: 1,
            delay: 0.5,
            duration: 1,
            ease: "elastic.out(1.5,0.5)",
        });
    });

    meteorid2.addEventListener("click", function () {
        clearSelection();
        gsap.to("#start", {
            opacity: 0,
            scale: 0.5,
            delay: 0,
            duration: 0.2,
            ease: "power1.out",
        });
        if (level != 2) {
            gsap.to("#level", {
                duration: 0.3,
                text: "",
                ease: "power1.inOut",
            });
        }
        level = 2;
        gsap.to("#meteorid2", {
            duration: 1,
            scale: 1.05,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 50%"
        });
        gsap.to("#spaceship", {
            duration: 1,
            ease: "power1.inOut",
            motionPath: {
                path: "#path",
                align: "#path",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                start: start,
                end: meteorid2TimelineRel
            }
        });
        start = meteorid2TimelineRel;
        gsap.to("#level", {
            delay: 0.7,
            duration: 0.3,
            text: "Level 2",
            ease: "power1.inOut",
        });
        gsap.to("#start", {
            opacity: 1,
            scale: 1,
            delay: 0.5,
            duration: 1,
            ease: "elastic.out(1.5,0.5)",
        });
    });
});

let button = document.querySelector("#start");
button.addEventListener("mouseenter", function () {
   gsap.to("#start", {
      backgroundColor: "#f1f1f1",
      duration: 0.2,
       color: "#80ba24",
   });
    gsap.to("#start", {
        delay: 0.2,
        backgroundColor: "#80ba24",
        duration: 0.2,
        color: "#f1f1f1",
    });
    gsap.to("#start", {
        scale: 1.2,
        duration: 0.2,
    });
});

button.addEventListener("mouseleave", function () {
    gsap.to("#start", {
        scale: 1,
        duration: 0.2,
    });
});

function clearSelection() {
    gsap.set(".meteorid", {
        scale: 1,
    });
    gsap.killTweensOf("#meteorid1");
    gsap.killTweensOf("#meteorid2");
}