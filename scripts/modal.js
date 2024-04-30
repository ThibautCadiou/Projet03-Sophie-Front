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
const closeModal = (event) => {
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

// Pour ajouter un travail, notamment la photo
let baliseAjouterPhoto = document.querySelector(".add-on-click");
let baliseImgageFichierAAjouter = document.querySelector(".image-to-add");
let cheminFichier = "";
baliseAjouterPhoto.addEventListener("click", () => {
    let baliseChoisirFichier = document.querySelector("#choisir-fichier");

    baliseChoisirFichier.addEventListener("change", (event) => {
        let fichiers = [];
        fichiers = event.target.files;
        cheminFichier = URL.createObjectURL(fichiers[0]);
        baliseImgageFichierAAjouter.src = cheminFichier;

        let baliseRechercheInfosImage = document.querySelector(".mode-without-src");
        baliseRechercheInfosImage.style.display = "none";
    });
    baliseChoisirFichier.click();
});

function envoyerNewFormdata(myToken, chargeUtile) {
    let reponse = fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            // accept: "application/json",
            Authorization: `Bearer ${myToken}`,
        },
        body: chargeUtile, //JSON.stringify(chargeUtile),
    });
}

let baliseAjoutPhoto = document.querySelector(".ajout-photo");
baliseAjoutPhoto.addEventListener("click", (event) => {
    let innerTextValue = baliseAjoutPhoto.textContent;

    if (innerTextValue === "Valider") {
        //Liste des infos a récupérer pour envoyer le travail
        let baliseInputPath = document.querySelector("#choisir-fichier");
        let baliseInputName = document.querySelector("#titre");
        let baliseInputCategorie = document.querySelector("#categorie");
        let categorieId = "1"; //correspondanceCategorieEtId(baliseInputCategorie.value);
        // on trouve la ccorepsondance entre la catégorie et l'id de la categorie

        //on valide la présence des différents champs

        //on créer l'object formdata
        const newWork = new FormData(); //créer un objet
        newWork.append("image", cheminFichier); //imageUrl
        newWork.append("title", baliseInputName.value);
        newWork.append("category", categorieId); //categoryId
        // newWork.append("userId", 1);
        const myToken = localStorage.getItem("token");
        envoyerNewFormdata(myToken, newWork);
    } else {
        setModalToAddPicture();
    }
});

//mettre le bouton valider au vert quand les trois champs son plein
// fonction de vérif des 3 trucs
function verifierChamps(b1, b2, b3) {
    console.log(`b1: ${b1.value}`);
    console.log(`b2: ${b2.value}`);
    console.log(`b3: ${b3.value}`);
    if (b1.value === "" || b2.value === "" || b3.value === "none") {
        baliseAjoutPhoto.classList.add("btnValiderGris");
        baliseAjoutPhoto.classList.add("desactiver-boutons");
        console.log("Un champ au moins est vide");
    } else {
        baliseAjoutPhoto.classList.remove("btnValiderGris");
        baliseAjoutPhoto.classList.remove("desactiver-boutons");
        console.log("Les trois champs sont au vert !");
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
