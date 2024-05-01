import { setModalToAddPicture, closeModal, setModalToNormal, afficherMiniTravaux, viderMinyGallery } from "/scripts/modal.js";
import { addPath } from "/scripts/main.js";
import { afficherTravaux, recupererTravaux, viderGallery, resetAfichage } from "/scripts/gallerie.js";

/**
 * Fonction qui vérifie que les champs sont bien remplis afin de pouvoir Valider l'envoi
 * @param {*} b1 balise 01: le chemin de la photo
 * @param {*} b2 balise 02 : le titre de la photo
 * @param {*} b3 balise 03 : la catégorie de la photo
 */
function verifierChamps(b1, b2, b3) {
    if (b1.value === "" || b2.value === "" || b3.value === "none") {
        baliseAjoutPhoto.classList.add("btnValiderGris");
        baliseAjoutPhoto.classList.add("desactiver-boutons");
    } else {
        baliseAjoutPhoto.classList.remove("btnValiderGris");
        baliseAjoutPhoto.classList.remove("desactiver-boutons");
    }
}
//add event listeners sur  la photo
let baliseChoisirFichier = document.querySelector("#choisir-fichier");
baliseChoisirFichier.addEventListener("change", function (event) {
    verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
//add event listeners sur le titre
const baliseTitreNewWork = document.querySelector("#titre");
baliseTitreNewWork.addEventListener("change", function (event) {
    verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
//add event listeners sur la categorie
const baliseParentMenuDreoulant = document.querySelector("#categorie"); // on génère le formulaire avec les valeur pour les catégories
baliseParentMenuDreoulant.addEventListener("change", function (event) {
    verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
/******** Fin de la section validation des champs ********/

/**
 * Fonctions qui réagi au click sur " + Ajouter photo"
 */
let baliseAjouterPhoto = document.querySelector(".add-on-click");
let myFile = null;
baliseAjouterPhoto.addEventListener("click", () => {
    let baliseChoisirFichier = document.querySelector("#choisir-fichier");

    baliseChoisirFichier.addEventListener("change", (event) => {
        let fichiers = [];
        fichiers = event.target.files;
        myFile = fichiers[0];

        let baliseRechercheInfosImage = document.querySelector(".mode-without-src");
        baliseRechercheInfosImage.style.display = "none";
    });
    baliseChoisirFichier.click();
});

/**
 * Fonction d'envoie du nouveau travail
 * @param {string} myToken Le token d'identification (stocké dans le local storage)
 * @param {object} chargeUtile L'objet à envoyer
 */
async function envoyerNewFormdata(myToken, chargeUtile) {
    let reponse = await fetch(addPath, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${myToken}`,
            accept: "application/json",
            // "Content-Type": "multipart/form-data",
        },
        body: chargeUtile, //JSON.stringify(chargeUtile),
    });
    if (reponse.ok) {
        console.log("on a reussi a jouter la photo");
        closeModal();
        setModalToNormal();
        resetAfichage();

        // viderGallery();
        // viderMinyGallery();
        // let travaux = recupererTravaux();
        // await afficherTravaux(travaux);
        // await afficherMiniTravaux(recupererTravaux(travaux));
    } else {
    }
}

let baliseParentAjoutPhoto = document.querySelector(".modal");
const baliseAjoutPhoto = document.querySelector(".ajout-photo");
baliseParentAjoutPhoto.addEventListener("click", function (event) {
    const innerTextValue = baliseAjoutPhoto.innerText;
    console.log(innerTextValue);
    if (event.target.classList.contains("ajout-photo")) {
        if (innerTextValue === "Valider") {
            //Liste des infos a récupérer pour envoyer le travail
            //titre
            let baliseInputName = document.querySelector("#titre");

            //image
            let baliseInputPath = document.querySelector("#choisir-fichier");

            //categorie
            let baliseInputCategorie = document.querySelector("#categorie");
            let categorieId = "1"; //correspondanceCategorieEtId(baliseInputCategorie.value);
            // on trouve la ccorepsondance entre la catégorie et l'id de la categorie

            //on créer l'object formdata
            const newWork = new FormData(); //créer un objet
            newWork.append("title", baliseInputName.value);
            newWork.append("image", myFile, "raoul-droog.jpg"); //baliseInputPath.value); //imageUrl
            newWork.append("category", categorieId); //categoryId

            const myToken = localStorage.getItem("token");
            envoyerNewFormdata(myToken, newWork);
        } else {
            setModalToAddPicture();
        }
    }
});
