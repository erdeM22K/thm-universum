document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Überprüfen, ob die Enter-Taste gedrückt wurde
        var text = event.target.value;
        
        // SVG-Elemente auswählen
        var shadow = document.getElementsByClassName('cls-7')[0];
        var reflection = document.getElementsByClassName('cls-9')[0];
        var color = document.getElementsByClassName('cls-11')[0];

        if (text === 'red') {
            changeColor('.cls-7', '#AA1A1A')
            changeColor('.cls-9', '#E22424')
            changeColor('.cls-11', '#C40808') 
            clearText();
            showNextText(text5);
            showInputField("off");
            localStorage.setItem("wpr_level2_done", 'true');
        } else if (text === 'blue') {
            changeColor('.cls-7', '#4B69E2')
            changeColor('.cls-9', '#8DABFF')
            changeColor('.cls-11', '#5A89FF') 
            clearText();
            showNextText(text5);
            showInputField("off");
            localStorage.setItem("wpr_level2_done", 'true');
        } else if (text === 'yellow') {
            changeColor('.cls-7', '#EDD529')
            changeColor('.cls-9', '#FFF86C')
            changeColor('.cls-11', '#FCEB1D') 
            clearText();
            showNextText(text5);
            showInputField("off");
            localStorage.setItem("wpr_level2_done", 'true');
        } else if (text === 'green') {
            changeColor('.cls-7', '#47D647')
            changeColor('.cls-9', '#95FF83')
            changeColor('.cls-11', '#4BF752') 
            clearText();
            showNextText(text5);
            showInputField("off");
            localStorage.setItem("wpr_level2_done", 'true');
        } else if (text === 'orange') {
            changeColor('.cls-7', '#F2AE40')
            changeColor('.cls-9', '#FFD85C')
            changeColor('.cls-11', '#FFC840') 
            clearText();
            showNextText(text5);
            showInputField("off");
            localStorage.setItem("wpr_level2_done", 'true');
        }
    }
});

function changeColor(selector, color) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.style.fill = color;
    });
}
