

function shuffleList() {
    const ul = document.getElementById('columns');
    const lis = Array.from(ul.children);

    // Setze die data-original-index initial
    lis.forEach((li, index) => {
        li.setAttribute('data-original-index', index);
    });

    // Mische die Liste
    for (let i = lis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lis[i], lis[j]] = [lis[j], lis[i]];
    }

    // Entferne alle Listenelemente aus dem DOM und füge sie in gemischter Reihenfolge wieder ein
    ul.innerHTML = '';
    lis.forEach(li => {
        ul.appendChild(li);
    });

    // Aktualisiere die data-original-index nach dem Mischen
    const newLis = Array.from(ul.children);
    newLis.forEach((li, index) => {
        li.setAttribute('data-original-index', index);
    });
}

function enableDragAndDrop() {
    var dragSrcEl = null;

    function handleDragStart(e) {
        this.classList.add('dragging');
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnter(e) {
        this.classList.add('dragover');
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragLeave(e) {
        this.classList.remove('dragover');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

            // Aktualisiere die data-original-index nach dem Drop
            const srcIndex = parseInt(dragSrcEl.getAttribute('data-original-index'));
            const destIndex = parseInt(this.getAttribute('data-original-index'));
            dragSrcEl.setAttribute('data-original-index', destIndex);
            this.setAttribute('data-original-index', srcIndex);
        }
        return false;
    }

    function handleDragEnd(e) {
        const cols = document.querySelectorAll('#columns .list-element');
        cols.forEach(col => {
            col.classList.remove('dragover');
            col.classList.remove('dragging');
        });
    }

    var cols = document.querySelectorAll('#columns .list-element');
    cols.forEach(col => {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });

    // Mobile touch events
    cols.forEach(col => {
        col.addEventListener('touchstart', handleTouchStart, false);
        col.addEventListener('touchmove', handleTouchMove, false);
        col.addEventListener('touchend', handleTouchEnd, false);
    });

    function handleTouchStart(e) {
        e.preventDefault();
        dragSrcEl = this;
        this.classList.add('dragging');
    }

    function handleTouchMove(e) {
        e.preventDefault();
        var touchLocation = e.targetTouches[0];
        var element = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
        if (element && element.tagName === 'LI' && element !== dragSrcEl) {
            [].forEach.call(cols, col => col.classList.remove('dragover'));
            element.classList.add('dragover');
        }
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        var touchLocation = e.changedTouches[0];
        var element = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
        if (element && element.tagName === 'LI' && element !== dragSrcEl) {
            let temp = dragSrcEl.innerHTML;
            dragSrcEl.innerHTML = element.innerHTML;
            element.innerHTML = temp;

            // Aktualisiere die data-original-index nach dem Touch-Ende
            const srcIndex = parseInt(dragSrcEl.getAttribute('data-original-index'));
            const destIndex = parseInt(element.getAttribute('data-original-index'));
            dragSrcEl.setAttribute('data-original-index', destIndex);
            element.setAttribute('data-original-index', srcIndex);
        }
        dragSrcEl.classList.remove('dragging');
        cols.forEach(col => col.classList.remove('dragover'));
    }
}

function checkOrder() {
    const col = document.querySelectorAll('#columns .list-element');
    // Vordefinierte Reihenfolge
    var expectedOrder = ['<div class="rocket_head"></div>', '<div class="rocket_body"></div>', '<div class="rocket_wings"></div>', '<div class="rocket_engine"></div>'];

    // Aktuelle Reihenfolge aus der Liste lesen
    var items = document.querySelectorAll('ul li');
    var currentOrder = Array.from(items).map(item => item.textContent.trim());

    // Überprüfen, ob die aktuelle Reihenfolge mit der erwarteten Reihenfolge übereinstimmt
    var isEqual = arraysEqual(currentOrder, expectedOrder);
    
    if (isEqual) {
        applyCorrectStyle();
      console.log('Die Reihenfolge stimmt mit der erwarteten Reihenfolge überein.');
    } else {
        applyInCorrectStyle();
      console.log('Die Reihenfolge stimmt NICHT mit der erwarteten Reihenfolge überein.');
    }
  }

  // Hilfsfunktion zur Überprüfung der Gleichheit von Arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  function applyCorrectStyle() {
    const lis = document.querySelectorAll('#columns li');
    lis.forEach(li => {
        li.style.border = '0.5vh solid #32CD32';
    });
}

function applyInCorrectStyle() {
    const lis = document.querySelectorAll('#columns li');
    lis.forEach(li => {
        li.style.border = '0.5vh solid #FF0000';
    });
}

function showButton() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.style.display = 'block';
    });
    gsap.fromTo("button", { opacity: 0 }, { opacity: 1, duration: 1 });
}

function showElements() {
    const elements = document.querySelectorAll('.list-element');

    elements.forEach(element => {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        
    });
    gsap.fromTo(".list-element", { opacity: 0 }, { opacity: 1, duration: 1 });
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
        y: 2200,
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