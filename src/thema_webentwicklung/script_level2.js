document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Überprüfen, ob die Enter-Taste gedrückt wurde
        var text = event.target.value;
        var image = document.getElementById('rocket');

        if (text === 'yellow;') {
            image.src = './bilder/rocket_yellow.svg';
            clearText();
            showNextText(text5);
            showInputField("off");
        } else {
            image.src = './bilder/rocket.svg';
        }
    }
});