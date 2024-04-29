import { genererProjets, recupererTravauxEtCategories, afficherTravaux, viderGallery } from "/scripts/gallerie.js";
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
 *
 * @param {*} baliseMiniTravaux
 * @returns
 */
export async function cliqueSurCorbeilles(baliseMiniTravaux, travaux) {
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
            cliqueSurCorbeilles(baliseMiniTravaux, travaux);
        });
    }
    return baliseMiniTravaux;
}

/**
 * Fonction qui supprime le travail lors du click sur la poubelle associée
 * @param {*} event l'event lié au click sur une trashcan
 */
export async function supprimerTravail(event, travaux) {
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
