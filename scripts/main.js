import { genererProjets, recupererTravauxEtCategories, afficherTravaux, viderGallery } from "/scripts/gallerie.js";
import { initLogin, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, setModalToAddPicture, ouvertureModal, viderMinyGallery } from "/scripts/modal.js";
import { supprimerTravail } from "/scripts/suppress-work.js";
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
cliqueSurCorbeilles();

/**
 * Fonction qui permet de renvoyer l'id d'un travail que l'on souhaite supprimer en fonction de l'url de l'image de ce meme travail
 * @param {string} url l'url de la photo du travail que l'on souhaite supprimer
 * @returns l'Id du l'objet travaux que l'on souhaite supprimer
 */
function renvoyerIdFromUrl(url) {
    const myImg = travaux.filter(function (travail) {
        return travail.imageUrl === url;
    });
    return myImg[0].id;
}

function cliqueSurCorbeilles() {
    for (let i = 0; i < baliseMiniTravaux.length; i++) {
        const element = baliseMiniTravaux[i];
        element.addEventListener("click", async function (event) {
            await supprimerTravail(event, travaux);
            let tandc = await recupererTravauxEtCategories(workPath, catPath);
            const newTravaux = await tandc[0];
            viderGallery();
            viderMinyGallery();
            await afficherTravaux(newTravaux);
            baliseMiniTravaux = await afficherMiniTravaux(newTravaux);
            cliqueSurCorbeilles();
        });
    }
}
