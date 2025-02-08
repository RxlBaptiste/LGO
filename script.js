const debugMode = true;

document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const lines = document.querySelectorAll(".line");
  const title = document.getElementById("title");
  const constellation = document.querySelector(".constellation");
  const miniconstellation = document.querySelector(".constellation");
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const content = document.querySelector(".content");
  const navbar = document.querySelector(".navbar");
  const img = document.querySelector(".imgFace");
  const body = document.body;
  /* 
  if (debugMode) {
    // 🛑 Désactiver toutes les animations immédiatement
    title.classList.add("mini-title");
    constellation.classList.add("mini-constellation");
    navbar.classList.add("show-navbar");
    fullscreenContainer.style.opacity = "0";
    body.style.overflow = "auto";
    content.classList.add("show-content");
    return; // Arrêter ici pour ne pas lancer les animations
  } */

  let delay = 500; // Délai initial pour éviter un affichage brusque

  // Cacher les étoiles au départ (assuré aussi par le CSS)
  stars.forEach((star) => {
    star.style.opacity = "0";
  });

  // Cacher complètement les lignes au départ et définir leurs longueurs
  lines.forEach((line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.opacity = "0"; // Assurer qu'elles ne sont pas visibles au début
  });

  // Faire apparaître les étoiles une par une AVANT que la ligne correspondante ne se trace
  stars.forEach((star, index) => {
    setTimeout(() => {
      star.style.opacity = "1"; // Apparition progressive
    }, delay);
    delay += 500; // Décalage progressif
  });

  // Cacher complètement les lignes AVANT l'animation
  lines.forEach((line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.opacity = "0"; // Assurer qu'elles sont totalement invisibles
  });

  // Animer les 3 premières lignes une par une
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      lines[i].style.opacity = "1"; // Afficher seulement au début de l'animation
      lines[i].style.transition =
        "stroke-dashoffset 1s linear, opacity 0.3s linear"; // Réactiver la transition
      lines[i].style.strokeDashoffset = "0";
    }, delay);
    delay += 1000;
  }

  // Animer les 4 dernières lignes par paires
  for (let i = 3; i < lines.length; i += 2) {
    setTimeout(() => {
      lines[i].style.opacity = "1";
      lines[i].style.transition =
        "stroke-dashoffset 1s linear, opacity 0.3s linear";
      lines[i].style.strokeDashoffset = "0";
    }, delay);

    setTimeout(() => {
      if (lines[i + 1]) {
        lines[i + 1].style.opacity = "1";
        lines[i + 1].style.transition =
          "stroke-dashoffset 1s linear, opacity 0.3s linear";
        lines[i + 1].style.strokeDashoffset = "0";
      }
    }, delay + 500); // Léger décalage pour une animation plus fluide

    delay += 1000;
  }

  // Afficher le titre avec l'animation de descente après l'animation complète
  setTimeout(() => {
    title.classList.add("show-title");
  }, delay + 1500); // Ajout d'un délai pour la synchronisation

  // Lancer l'animation de réduction après l'affichage complet de la constellation
  setTimeout(() => {
    console.log("Animate");
    constellation.classList.add("animate");
  }, delay + 1500); // Délai supplémentaire avant la réduction

  // Déplacement vers la navbar
  setTimeout(() => {
    title.classList.add("mini-title"); // Déplacer le titre vers la navbar
    constellation.classList.add("mini-constellation"); // Réduire et déplacer la constellation
    navbar.classList.add("show-navbar"); // Afficher la navbar
  }, delay + 2000);

  // Garder le titre et la constellation dans la navbar après le scroll
  setTimeout(() => {
    fullscreenContainer.style.width = "0"; /* 
    body.style.overflow = "auto"; */
  }, delay + 4500);

  setTimeout(() => {
    console.log("AnimateNav");
    constellation.classList.add("animateNav");
    title.classList.add("animateTitle");
  }, delay + 5000);

  setTimeout(() => {
    content.classList.add("show-content"); // Afficher le contenu
    img.style.display = "flex";
  }, delay + 6000);
});

document.getElementById("toggleButton").addEventListener("click", function () {
  var text = document.getElementById("hiddenMention");
  if (text.style.display === "none" || text.style.display === "") {
    text.style.display = "block"; // Afficher le texte
    text.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Scroll vers l'élément
  } else {
    text.style.display = "none"; // Cacher le texte
  }
});
