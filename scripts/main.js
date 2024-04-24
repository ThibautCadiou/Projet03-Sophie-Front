import { genererProjets } from "/scripts/gallerie.js";

// ******** Main ********
let travaux = await genererProjets(); // pour générer la page de base

// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");
let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");
let baliseModifier = document.querySelector(".modifier");

// partie champs
let baliseFormulaire = document.querySelector("#formulaire");
/******** Partie Modale ********/
const baliseModal = document.querySelector(".modal");
const baliseOverlay = document.querySelector(".overlay");
const baliseOpenButton = document.querySelector(".modal-button");
const baliseCloseButton = document.querySelector(".close-modal");

// creation de la modale pour l'ajout de photo
let baliseAjoutPhoto = document.querySelector(".ajout-photo");
let baliseModalTitle = document.querySelector(".modal-title");
let baliseGallery = document.querySelector(".modal-gallery");
let baliseBackArrow = document.querySelector(".back-modal");

/**
 * Affichage de la page de login au click suivant l'état connecté ou deconnecté
 */
function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        if (boutonLogin.innerText === "logout") {
            // alert("Vous avez été déconnecté");
            afficherPageAccueil();
            boutonLogin.innerText = "login";
            localStorage.removeItem("token");
            console.log("fin de la deconnection");
            baliseModifier.style.display = "none";
        } else {
            afficherPageLogin();
            console.log("affichage de la page login car on est deconnecté");
        }
    });
}

/**
 * Affichage de la page login
 */
function afficherPageLogin() {
    boutonLogin.style.fontWeight = "800";
    boutonProjet.style.fontWeight = "400";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
}

/**
 * Affihage de la page d'accueil sur click du bouton projet
 */
function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        afficherPageAccueil();
    });
}

/**
 * Affichage de la page d'accueil
 */
function afficherPageAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}
/**
 * Redirection vers la page d'accueil en, fnction de la validation ou  de l'invalidation a la connexion
 */
function redirectionAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

baliseFormulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    let connexionStatus = false;

    let baliseMail = document.querySelector("#login-email");
    let balisePassword = document.querySelector("#password");
    let mailValue = baliseMail.value;
    let passwordValue = balisePassword.value;

    try {
        const loginPath = "http://localhost:5678/api/users/login";
        const objetLogin = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: mailValue,
                password: passwordValue,
            }),
        };

        const reponse = await fetch(loginPath, objetLogin);
        const tokenResponse = await reponse.json();

        console.log(tokenResponse.token);
        window.localStorage.setItem("token", tokenResponse.token);

        if (reponse.status !== 200) {
            connexionStatus = false;
            alert("Couple E-mail / Mot de passe invalid");
        } else {
            connexionStatus = true;
            alert("connexion réussi - redirection vers la page d'accueil");
            redirectionAccueil();
            boutonLogin.innerText = "logout";
            baliseModifier.style.display = "flex";
        }
    } catch (error) {
        console.log(error);
    }

    return connexionStatus;
});

/**
 * Fonction qui gère la génération des travaux dans la modale 01
 * @param {Array.<object>} listeTravaux
 */
function afficherMiniTravaux(listeTravaux) {
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
}

let balisemodalAddPhoto = document.querySelector(".modal-add-photo");

/**
 * Fonction qui gère l'affichage de la modale en mode 2
 */
function setModalToAddPicture() {
    console.log("Ajout de photo initié");
    baliseModalTitle.textContent = "Ajout photo";
    baliseGallery.style.display = "none";
    baliseAjoutPhoto.textContent = "Valider";
    baliseBackArrow.style.display = "flex";
    balisemodalAddPhoto.style.display = "flex";
}

/**
 * Fonction qui gère l'affichage de la modela en mode 1
 */
function setModalToNormal() {
    baliseModalTitle.textContent = "Gallerie photo";
    baliseGallery.style.display = "grid";
    baliseAjoutPhoto.textContent = "Ajouter une photo";
    baliseBackArrow.style.display = "none";
    balisemodalAddPhoto.style.display = "none";
    baliseImgageFichierAAjouter.src = null;
    baliseRechercheInfosImage.style.display = "flex";
}

baliseOpenButton.addEventListener("click", (event) => {
    console.log(event.srcElement.innerText);
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

function correspondanceCategorieEtId(categorieName) {
    if (categorieName === "possibilite01") {
        return "1";
    } else if (categorieName === "possibilite02") {
        return "2";
    } else if (categorieName === "possibilite03") {
        return "3";
    } else {
        console.log("error 404 ... désolé");
    }
}

baliseBackArrow.addEventListener("click", (event) => {
    console.log("retour en arrière");
    setModalToNormal();
});

// Main de la partie modale
baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial
pageAccueil();
pageLogin();
afficherMiniTravaux(travaux);

// Pour ajouter un travail, notamment la photo
let baliseAjouterPhoto = document.querySelector(".add-on-click");
let baliseChoisirFichier = document.querySelector("#choisir-fichier");
let baliseImgageFichierAAjouter = document.querySelector(".image-to-add");
let baliseRechercheInfosImage = document.querySelector(".mode-without-src");

let cheminFichierPourEnvoi = baliseAjouterPhoto.addEventListener("click", () => {
    console.log("on va ajouter une photo");

    let myPath = baliseChoisirFichier.addEventListener("change", (event) => {
        const fichiers = event.target.files;
        const cheminFichier = URL.createObjectURL(fichiers[0]);
        console.log(fichiers[0]);
        baliseImgageFichierAAjouter.src = cheminFichier;
        baliseRechercheInfosImage.style.display = "none";
        return cheminFichier;
    });

    let cheminFichier = baliseChoisirFichier.click();
    return cheminFichier;
});

baliseAjoutPhoto.addEventListener("click", (event) => {
    let innerTextValue = baliseAjoutPhoto.textContent;

    if (innerTextValue === "Valider") {
        //Liste des infos a récupérer pour envoyer le travail
        let baliseInputPath = document.querySelector("#choisir-fichier");
        console.log(baliseInputPath.value);

        let baliseInputName = document.querySelector("#titre");
        console.log(baliseInputName.value);

        let baliseInputCategorie = document.querySelector("#categorie");
        console.log(baliseInputCategorie.value);

        let categorieId = correspondanceCategorieEtId(baliseInputCategorie.value);

        // on trouve la ccorepsondance entre la catégorie et l'id de la categorie

        //Envoie des travaux
        console.log("On envoie les travaux");
        let newWork = {
            id: travaux.length,
            title: baliseInputName.value,
            imageUrl: cheminFichierPourEnvoi,
            categoryId: categorieId,
            userId: 1,
        };
        console.log(newWork);
        let chargeUtile = JSON.stringify(newWork);
        fetch("http://localhost:5678/api/works", { method: "POST", headers: { "Content-Type": "application/json" }, body: chargeUtile });
    } else {
        console.log("On se met en mode ajout de travaux");
        setModalToAddPicture();
    }
});
