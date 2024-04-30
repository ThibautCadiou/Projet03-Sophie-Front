import { recupererTravaux, recupererTravauxEtCategories, afficherTravaux, viderGallery } from "/scripts/gallerie.js";
import { afficherMiniTravaux, viderMinyGallery } from "/scripts/modal.js";
import { workPath, catPath } from "/scripts/main.js";

/**
 * Fonction qui permet de renvoyer l'id d'un travail que l'on souhaite supprimer en fonction de l'url de l'image de ce meme travail
 * @param {string} url l'url de la photo du travail que l'on souhaite supprimer
 * @returns l'Id du l'objet travaux que l'on souhaite supprimer
 */
function renvoyerIdFromUrl(url, travaux) {
    const myImg = travaux.filter(function (travail) {
        return travail.imageUrl === url;
    });
    return myImg[0].id;
}

/**
 * Fonction qui supprime le travail lors du click sur la poubelle associée
 * @param {*} event l'event lié au click sur une trashcan
 */
export async function supprimerTravail(event) {
    let travaux = recupererTravaux();
    const elementClique = event.target;

    const parent = elementClique.parentElement; // on recupere le parent
    const childImage = parent.firstChild; // dans ses enfants, on trouve le travail qui a ce chemin 'imageUrl'
    const imageUrl = childImage.src;
    const id = renvoyerIdFromUrl(imageUrl, travaux); //on récupère l'id du travail en question

    // on fait la requete pour supprimer le travail
    const fetchPathForDelete = "http://localhost:5678/api/works/" + id;
    const myToken = localStorage.getItem("token");
    let response = await fetch(fetchPathForDelete, {
        method: "DELETE",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${myToken}`,
        },
        body: { id: id },
    });
    console.log(response);
}

/**
 * Fonction qui gère la suppression des travaux lors de lappui sur la petit corbeille dans la modale
 * @param {*} baliseMiniTravaux Les balises des mini travaux affichés dans la modale
 * @param {*} travaux L'ensemble des travaux récupérés depuis l'API
 */
export async function cliqueSurCorbeilles(baliseMiniTravaux) {
    for (let i = 0; i < baliseMiniTravaux.length; i++) {
        const element = baliseMiniTravaux[i];
        element.addEventListener("click", async function (event) {
            await supprimerTravail(event);
            let tandc = await recupererTravauxEtCategories();
            const newTravaux = await tandc[0];
            viderGallery();
            viderMinyGallery();
            await afficherTravaux(newTravaux);
            baliseMiniTravaux = await afficherMiniTravaux(newTravaux);
            cliqueSurCorbeilles(baliseMiniTravaux);
        });
    }
}

export async function majGalleries() {}
