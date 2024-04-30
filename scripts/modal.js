import { afficherTravaux, recupererTravaux, recupererCategories } from "/scripts/gallerie.js";

export async function creerMiniTravaux() {
    let travaux = await recupererTravaux();
    afficherMiniTravaux(travaux);
}

const baliseOpenButton = document.querySelector(".modifier");
// creation de la modale pour l'ajout de photo
baliseOpenButton.addEventListener("click", (event) => {
    const baliseModal = document.querySelector(".modal");
    const baliseOverlay = document.querySelector(".overlay");

    baliseOverlay.classList.remove("hidden"); // on affiche le calque du background
    baliseModal.classList.remove("hidden"); // on affiche la modale

    let travaux = recupererTravaux();
    afficherTravaux(travaux);
});

/**
 * Fonction qui gère l'affichage de la modale en mode 2
 */
let baliseModalTitle = document.querySelector(".modal-title");
let baliseGallery = document.querySelector(".modal-gallery");
let baliseBackArrow = document.querySelector(".back-modal");
let balisemodalAddPhoto = document.querySelector(".modal-add-photo");
let baliseAjoutPhoto = document.querySelector(".ajout-photo");
async function setModalToAddPicture() {
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

const baliseAjouterPhoto = document.querySelector(".ajout-photo");
baliseAjouterPhoto.addEventListener("click", (event) => {
    console.log("cliqué");
    setModalToAddPicture();
});

/**
 * Fonction qui gère l'affichage de la modale en mode 1
 */
let baliseRechercheInfosImage = document.querySelector(".mode-without-src");
function setModalToNormal() {
    baliseModalTitle.textContent = "Gallerie photo";
    baliseGallery.style.display = "grid";
    baliseAjoutPhoto.textContent = "Ajouter une photo";
    baliseAjoutPhoto.classList.remove("btnValiderGris");
    baliseAjoutPhoto.classList.remove("desactiver-boutons");
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

// Réinitialisation de la modale en mode normale lors du clique sur la back arrow
baliseBackArrow.addEventListener("click", (event) => {
    setModalToNormal();
});

// Fonction qui permet de cacher la modale et l'overlay
const baliseModal = document.querySelector(".modal");
const closeModal = (event) => {
    baliseOverlay.classList.add("hidden");
    baliseModal.classList.add("hidden");
    baliseAjoutPhoto.classList.remove("btnValiderGris");
    baliseAjoutPhoto.classList.remove("desactiver-boutons");
};

// Event listener sur la creoix pour fermer la fenetre
const baliseCloseButton = document.querySelector(".close-modal");
baliseCloseButton.addEventListener("click", () => {
    closeModal();
    setModalToNormal();
});

// Event listener sur le clique en dehors de la fenetre modale
const baliseOverlay = document.querySelector(".overlay");
baliseOverlay.addEventListener("click", () => {
    closeModal();
    setModalToNormal();
});

// Arrêter la propagation du clic à l'intérieur de la fenêtre modale
baliseModal.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic aux éléments sous-jacents
});

// fonction pour quitter la modale sur un appuie sur la touche escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !baliseModal.classList.contains("hidden")) {
        setModalToNormal();
        closeModal();
    }
});

/**
 * Génère les minitravaux dans la miniGallery
 */
async function afficherMiniTravaux(travaux) {
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
    // let baliseMiniTravaux = document.querySelectorAll(".fa-trash-can");
}

/******** Fonctions qui servent peut être à rien********/

/**
 * Fonction pour vider la mini gallery
 */
export function viderMinyGallery() {
    let baliseIncrustationPhotos = document.querySelector(".modal-gallery");
    baliseIncrustationPhotos.innerHTML = "";
}
