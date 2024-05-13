// JavaScript (script.js)
$(document).ready(function() {
      // Event Listener hinzufügen mit jQuery
      $('#planet1').click(function() {
        console.log("Planet wurde geklickt!");
        // Skalieren des Planeten
        gsap.to("#planet1", {duration: 1, scale: 3, ease: "expoScale(1, 5)"});
        // Anzeigen der Vignette
        gsap.to("#vignette", {duration: 1, scale: 5, ease: "expoScale(1, 5)"});

        // Weiterleitung nach einer Verzögerung
        setTimeout(function() {
          console.log("Weiterleitung nach 1 Sekunde...");
           window.location.href = "av.html";
        }, 1000); // Verzögerung: 1000ms (1 Sekunde)
      });
  });
