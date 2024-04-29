import { genererProjets } from "/scripts/gallerie.js";
import { initLogin, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, ouvertureModal } from "/scripts/modal.js";
import { cliqueSurCorbeilles } from "/scripts/suppress-work.js";
// ******** Main ********
export const workPath = "http://localhost:5678/api/works";
export const catPath = "http://localhost:5678/api/categories";

let travaux = await genererProjets(); // pour générer la page de base

initLogin(); // On réagi à l'appui sur l'onglet login

//On réagi à l'appui sur le bouton "Se connecter"
let baliseFormulaire = document.querySelector("#formulaire");
baliseFormulaire.addEventListener("submit", async function (event) {
    testerConnexion(event); // on récupère le token
});

// ******** Modal ********
ouvertureModal();
let baliseMiniTravaux = await afficherMiniTravaux(travaux);
cliqueSurCorbeilles(baliseMiniTravaux, travaux);
