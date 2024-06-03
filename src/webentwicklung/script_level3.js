document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Überprüfen, ob die Enter-Taste gedrückt wurde
        var text = event.target.value;

        if (text === "startRocket(){}") {
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