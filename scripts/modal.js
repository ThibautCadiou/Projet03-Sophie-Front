/**
 * Fonction 200 : gère l'ouverture de la modale
 */
export function ouvertureModal() {
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
 * Fonction  210 :Gère la génération des travaux dans la modale 01
 * @param {Array.<object>} listeTravaux
 */
let baliseMiniTravaux = null;
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
    }
}

/**
 * Fonction qui gère l'affichage de la modale en mode 2
 */
let baliseModalTitle = document.querySelector(".modal-title");
let baliseGallery = document.querySelector(".modal-gallery");
let baliseBackArrow = document.querySelector(".back-modal");
let balisemodalAddPhoto = document.querySelector(".modal-add-photo");
export function setModalToAddPicture() {
    baliseModalTitle.textContent = "Ajout photo";
    baliseGallery.style.display = "none";
    baliseAjoutPhoto.textContent = "Valider";
    baliseBackArrow.style.display = "flex";
    balisemodalAddPhoto.style.display = "flex";
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
}

baliseBackArrow.addEventListener("click", (event) => {
    setModalToNormal();
});

const baliseModal = document.querySelector(".modal");
const closeModal = (event) => {
    baliseOverlay.classList.add("hidden");
    baliseModal.classList.add("hidden");
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
