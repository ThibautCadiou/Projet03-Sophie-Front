let baliseMiniTravaux = null;
/**
 * Fonction qui gère la génération des travaux dans la modale 01
 * @param {Array.<object>} listeTravaux
 */
export function afficherMiniTravaux(listeTravaux) {
    for (let i = 0; i < listeTravaux.length; i++) {
        const element = listeTravaux[i];
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
    baliseMiniTravaux = document.querySelectorAll(".fa-trash-can");
    for (let i = 0; i < baliseMiniTravaux.length; i++) {
        const element = baliseMiniTravaux[i];
        // console.log(element);
    }
}

let balisemodalAddPhoto = document.querySelector(".modal-add-photo");
let baliseModalTitle = document.querySelector(".modal-title");
let baliseGallery = document.querySelector(".modal-gallery");
let baliseAjoutPhoto = document.querySelector(".ajout-photo");
let baliseBackArrow = document.querySelector(".back-modal");
let baliseRechercheInfosImage = document.querySelector(".mode-without-src");

/**
 * Fonction qui gère l'affichage de la modale en mode 2
 */
export function setModalToAddPicture() {
    baliseModalTitle.textContent = "Ajout photo";
    baliseGallery.style.display = "none";
    baliseAjoutPhoto.textContent = "Valider";
    baliseBackArrow.style.display = "flex";
    balisemodalAddPhoto.style.display = "flex";
}

/**
 * Fonction qui gère l'affichage de la modela en mode 1
 */
export function setModalToNormal() {
    baliseModalTitle.textContent = "Gallerie photo";
    baliseGallery.style.display = "grid";
    baliseAjoutPhoto.textContent = "Ajouter une photo";
    baliseBackArrow.style.display = "none";
    balisemodalAddPhoto.style.display = "none";
    // baliseImgageFichierAAjouter.src = null;
    baliseRechercheInfosImage.style.display = "flex";
}

baliseBackArrow.addEventListener("click", (event) => {
    setModalToNormal();
});

/******** Partie Modale ********/
const baliseModal = document.querySelector(".modal");
const baliseOverlay = document.querySelector(".overlay");
const baliseCloseButton = document.querySelector(".close-modal");

const baliseOpenButton = document.querySelector(".modal-button"); //utiliser "modifier" ou "modal-button" pour du debug et mettre son display à true ou decommenter dan sle html ou utiliser "modifier"
// creation de la modale pour l'ajout de photo
baliseOpenButton.addEventListener("click", (event) => {
    baliseOverlay.classList.remove("hidden");
    baliseModal.classList.remove("hidden");
});

const closeModal = (event) => {
    baliseOverlay.classList.add("hidden");
    baliseModal.classList.add("hidden");
};

baliseCloseButton.addEventListener("click", () => {
    closeModal();
    setModalToNormal();
});

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
