let currentIndex = 1;

function initializeModeSwitching() {
    document.getElementById('arrowLeft').addEventListener('click', () => switchMode('left'));
    document.getElementById('arrowRight').addEventListener('click', () => switchMode('right'));
}

function switchMode(direction) {
    const modesContainer = document.querySelector('.modes_container');
    const modes = document.querySelectorAll('.image_container');
    const firstMode = modes[0];
    const lastMode = modes[modes.length - 1];

    if (direction === 'left') {
        modesContainer.insertBefore(lastMode, firstMode);
    } else {
        modesContainer.appendChild(firstMode);
    }

    updateHighlight();
}

function updateHighlight() {
    const modes = document.querySelectorAll('.modes');
    modes.forEach(mode => mode.classList.remove('highlight'));
    modes[1].classList.add('highlight'); // Mittelposition hervorheben
}

