import { genererProjets } from "/scripts/gallerie.js";
import { initLogin, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, setModalToAddPicture, ouvertureModal } from "/scripts/modal.js";

// ******** Main ********
let travaux = await genererProjets(); // pour générer la page de base

initLogin(); // On réagi à l'appui sur l'onglet login

//On réagi à l'appui sur le bouton "Se connecter"
let baliseFormulaire = document.querySelector("#formulaire");
baliseFormulaire.addEventListener("submit", async function (event) {
    testerConnexion(event); // on récupère le token
});

// ******** Modal ********
ouvertureModal();
afficherMiniTravaux(travaux);
