import { genererProjets } from "/scripts/gallerie.js";

// ******** Main ********
genererProjets(); // pour générer la page de base

// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");

let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");

boutonLogin.addEventListener("click", () => {
    boutonLogin.style.fontWeight = "800";
    boutonProjet.style.fontWeight = "400";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
});

boutonProjet.addEventListener("click", (event) => {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
});
