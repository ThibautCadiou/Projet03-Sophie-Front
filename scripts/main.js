import { genererProjets, recupererTravauxEtCategories, afficherTravaux, viderGallery } from "/scripts/gallerie.js";
import { initLogin, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, setModalToAddPicture, ouvertureModal, viderMinyGallery } from "/scripts/modal.js";

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
let baliseMiniTravaux = await afficherMiniTravaux(travaux);

/**
 * Fonction qui permet de renvoyer l'id d'un travail que l'on souhaite supprimer en fonction de l'url de l'image de ce meme travail
 * @param {string} url l'url de la photo du travail que l'on souhaite supprimer
 * @returns l'Id du l'objet travaux que l'on souhaite supprimer
 */
function renvoyerIdFromUrl(url) {
    const myImg = travaux.filter(function (travail) {
        return travail.imageUrl === url;
    });
    console.log(myImg);
    return myImg[0].id;
}

async function supprimerTravail(event) {
    const elementClique = event.target;

    //on recupere le parent
    const parent = elementClique.parentElement;
    console.log(`Le parent est : ${parent}`);

    // dans ses enfants, on trouve le travail qui a ce chemin 'imageUrl'
    const childImage = parent.firstChild;
    console.log(`Le premier enfant est : ${childImage}`);

    const imageUrl = childImage.src;
    console.log(`L'Url de cette image est : ${imageUrl}`);

    //on récupère l'id du travail en question
    const id = renvoyerIdFromUrl(imageUrl);
    console.log(`Id de l'élément a supprimer : ${id}`);

    // on fait la requete pour supprimer le travail
    const fetchPathForDelete = "http://localhost:5678/api/works/" + id;
    const myToken = localStorage.getItem("token");
    fetch(fetchPathForDelete, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${myToken}`,
        },
        body: { id: id },
    });
}
// on met a jour les travaux

for (let i = 0; i < baliseMiniTravaux.length; i++) {
    const element = baliseMiniTravaux[i];
    element.addEventListener("click", async function (event) {
        supprimerTravail(event);
        let tandc = await recupererTravauxEtCategories("http://localhost:5678/api/works", "http://localhost:5678/api/categories");
        const newTravaux = tandc[0];
        viderGallery();
        viderMinyGallery();
        afficherTravaux(newTravaux);
        afficherMiniTravaux(newTravaux);
    });
}
//quand on clique sur une poubelle declencher un event liosteners

// trouver l'objet parent associé à la poubelle
// console.log(travaux[0]);
