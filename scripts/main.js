import { genererProjets } from "/scripts/gallerie.js";
import { initLogin } from "/scripts/login.js";
import {} from "/scripts/modal.js";
import {} from "/scripts/suppress-work.js";
import {} from "/scripts/add-work.js";

// ******** Main ********
export const workPath = "http://localhost:5678/api/works";
export const catPath = "http://localhost:5678/api/categories";
export const addPath = "http://localhost:5678/api/works";
export const loginPath = "http://localhost:5678/api/users/login";

await genererProjets(); // pour générer la page de base

initLogin(); // On réagi à l'appui sur l'onglet login

/*
// ******** Modal ********
ouvertureModal();
let baliseMiniTravaux = await afficherMiniTravaux();
cliqueSurCorbeilles(baliseMiniTravaux);
*/
