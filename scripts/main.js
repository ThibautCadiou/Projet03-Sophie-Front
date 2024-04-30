import { genererProjets } from "/scripts/gallerie.js";
import { initLogin } from "/scripts/login.js";
import { creerMiniTravaux } from "/scripts/modal.js";
import { supprimerTravail, majGalleries } from "/scripts/suppress-work.js";

/*
import {} from "/scripts/add-work.js";
*/

// ******** Paths ********
export const workPath = "http://localhost:5678/api/works";
export const catPath = "http://localhost:5678/api/categories";
export const addPath = "http://localhost:5678/api/works";
export const loginPath = "http://localhost:5678/api/users/login";

// ******** Main ********
await genererProjets(); // pour générer la page de base
initLogin(); // On réagi à l'appui sur l'onglet login
let balisesMiniPoubelles = await creerMiniTravaux();

for (let i = 0; i < balisesMiniPoubelles.length; i++) {
    const poubelle = balisesMiniPoubelles[i];
    poubelle.addEventListener("click", async function (event) {
        await supprimerTravail(event);
        await majGalleries();
        balisesMiniPoubelles = document.querySelectorAll(".myCard .fa-trash-can");
        console.log(balisesMiniPoubelles);
    });
}
