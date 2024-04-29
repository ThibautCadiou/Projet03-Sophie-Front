import { genererProjets, recupererTravauxEtCategories, afficherTravaux, viderGallery } from "/scripts/gallerie.js";
import { initLogin, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, setModalToAddPicture, ouvertureModal, viderMinyGallery } from "/scripts/modal.js";

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

/**
 * Fonction qui supprime le travail lors du click sur la poubelle associée
 * @param {*} event l'event lié au click sur une trashcan
 */
async function supprimerTravail(event) {
    const elementClique = event.target;

    const parent = elementClique.parentElement; // on recupere le parent
    const childImage = parent.firstChild; // dans ses enfants, on trouve le travail qui a ce chemin 'imageUrl'
    const imageUrl = childImage.src;
    const id = renvoyerIdFromUrl(imageUrl); //on récupère l'id du travail en question

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

function cliqueSurCorbeilles() {
    for (let i = 0; i < baliseMiniTravaux.length; i++) {
        const element = baliseMiniTravaux[i];
        element.addEventListener("click", async function (event) {
            console.log("on lance la suppression d'un travail");
            await supprimerTravail(event);
            let tandc = await recupererTravauxEtCategories(workPath, catPath);
            const newTravaux = await tandc[0];
            viderGallery();
            viderMinyGallery();
            await afficherTravaux(newTravaux);
            baliseMiniTravaux = await afficherMiniTravaux(newTravaux);
            console.log(await baliseMiniTravaux);
            cliqueSurCorbeilles();
        });
    }
}
