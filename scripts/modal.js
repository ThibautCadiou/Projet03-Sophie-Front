import { afficherTravaux, recupererTravaux } from "/scripts/gallerie.js";
import { workPath } from "/scripts/main.js";
import { recupererCategories } from "/scripts/gallerie.js";

/**
 * Fonction 200 : gère l'ouverture de la modale
 */
export async function ouvertureModal() {
    // on réaffiche la totalité des travaux dans la fenetre principale
    let travaux = await recupererTravaux(workPath);
    afficherTravaux(travaux);

    const baliseModal = document.querySelector(".modal");
    const baliseOverlay = document.querySelector(".overlay");
    const baliseOpenButton = document.querySelector(".modifier");
    // creation de la modale pour l'ajout de photo
    baliseOpenButton.addEventListener("click", (event) => {
        baliseOverlay.classList.remove("hidden"); // on affiche le calque du background
        baliseModal.classList.remove("hidden"); // on affiche la modale
    });
}

/**
 * Fonction pour vider la mini gallery
 */
export function viderMinyGallery() {
    let baliseIncrustationPhotos = document.querySelector(".modal-gallery");
    baliseIncrustationPhotos.innerHTML = "";
}

/**
 * Fonction  210 :Gère la génération des travaux dans la modale 01
 * @param {Array.<object>} listeTravaux
 */
export function afficherMiniTravaux() {
    let travaux = recupererTravaux();
    for (let i = 0; i < travaux.length; i++) {
        const element = travaux[i];
        let baliseIncrustationPhotos = document.querySelector(".modal-gallery");
        let baliseParentMiniPhoto = document.createElement("div");
        baliseParentMiniPhoto.classList.add("myCard");

        let baliseImg = document.createElement("img");
        baliseImg.classList.add("myImg");
        baliseImg.src = element.imageUrl;

        let baliseIcone = document.createElement("i");
        baliseIcone.classList.add("fa-solid");
        baliseIcone.classList.add("myIcone");
        baliseIcone.classList.add("fa-trash-can");

        baliseParentMiniPhoto.appendChild(baliseImg);
        baliseParentMiniPhoto.appendChild(baliseIcone);

        baliseIncrustationPhotos.appendChild(baliseParentMiniPhoto);
    }
    let baliseMiniTravaux = document.querySelectorAll(".fa-trash-can");
    return baliseMiniTravaux;
}

/**
 * Fonction qui gère l'affichage de la modale en mode 2
 */
let baliseModalTitle = document.querySelector(".modal-title");
let baliseGallery = document.querySelector(".modal-gallery");
let baliseBackArrow = document.querySelector(".back-modal");
let balisemodalAddPhoto = document.querySelector(".modal-add-photo");
let baliseAjoutPhoto = document.querySelector(".ajout-photo");

export async function setModalToAddPicture() {
    baliseModalTitle.textContent = "Ajout photo"; // titre
    baliseGallery.style.display = "none"; // on cache la gallerie
    baliseAjoutPhoto.textContent = "Valider"; // on change le texte du bouton valider
    baliseAjoutPhoto.classList.add("desactiver-boutons");
    baliseAjoutPhoto.classList.add("btnValiderGris");
    baliseBackArrow.style.display = "flex"; // on affiche la fleche de retour
    balisemodalAddPhoto.style.display = "flex";

    //on récupère les catégories
    const categories = await recupererCategories();

    //pour chaque categories, on récupère le nom , on crée l'élément html "option" et on lajoute au parent
    const baliseParentMenuDreoulant = document.querySelector("#categorie"); // on génère le formulaire avec les valeur pour les catégories
    // on initialise un premier élément vide
    const categorieName = document.createElement("option");
    categorieName.value = "none";
    categorieName.innerText = " ";
    baliseParentMenuDreoulant.appendChild(categorieName);
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        const categorieName = document.createElement("option");
        categorieName.value = categorie.name;
        categorieName.innerText = categorie.name;
        baliseParentMenuDreoulant.appendChild(categorieName);
    }
}

/**
 * Fonction qui gère l'affichage de la modale en mode 1
 */
let baliseRechercheInfosImage = document.querySelector(".mode-without-src");
export function setModalToNormal() {
    baliseModalTitle.textContent = "Gallerie photo";
    baliseGallery.style.display = "grid";
    baliseAjoutPhoto.textContent = "Ajouter une photo";
    baliseBackArrow.style.display = "none";
    balisemodalAddPhoto.style.display = "none";
    baliseRechercheInfosImage.style.display = "flex";
    const baliseApercuImageToAdd = document.querySelector("#apercu-photo-to-add");
    baliseApercuImageToAdd.src = "";
    const baliseTitreNewWork = document.querySelector("#titre");
    baliseTitreNewWork.value = "";
    const baliseMenuDeroulant = document.querySelector("#categorie");
    baliseMenuDeroulant.innerHTML = "";
}

baliseBackArrow.addEventListener("click", (event) => {
    setModalToNormal();
});

const baliseModal = document.querySelector(".modal");
export const closeModal = (event) => {
    baliseOverlay.classList.add("hidden");
    baliseModal.classList.add("hidden");
    baliseAjoutPhoto.classList.remove("btnValiderGris");
    baliseAjoutPhoto.classList.remove("desactiver-boutons");
};

const baliseCloseButton = document.querySelector(".close-modal");
baliseCloseButton.addEventListener("click", () => {
    closeModal();
    setModalToNormal();
});

const baliseOverlay = document.querySelector(".overlay");
baliseOverlay.addEventListener("click", () => {
    closeModal();
    setModalToNormal();
});

// Arrêter la propagation du clic à l'intérieur de la fenêtre modale
baliseModal.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic aux éléments sous-jacents
});

//Partie escape au clavier
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !baliseModal.classList.contains("hidden")) {
        setModalToNormal();
        closeModal();
    }
});
