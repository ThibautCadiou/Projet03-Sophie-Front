import { genererProjets } from "/scripts/gallerie.js";

// ******** Main ********
let travaux = await genererProjets(); // pour générer la page de base

// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");

let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");

let baliseModifier = document.querySelector(".modifier");

baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial

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

// partie champs
let baliseFormulaire = document.querySelector("#formulaire");

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

pageAccueil();
pageLogin();

// partie champs
const baliseModal = document.querySelector(".modal");
const baliseOverlay = document.querySelector(".overlay");
const baliseOpenButton = document.querySelector(".modal-button");
const baliseCloseButton = document.querySelector(".close-modal");

baliseOpenButton.addEventListener("click", (event) => {
    console.log(event.srcElement.innerText);
    baliseOverlay.classList.remove("hidden");
    baliseModal.classList.remove("hidden");
});

const closeModal = (event) => {
    baliseOverlay.classList.add("hidden");
    baliseModal.classList.add("hidden");
};

baliseCloseButton.addEventListener("click", closeModal);
baliseOverlay.addEventListener("click", closeModal);
// Arrêter la propagation du clic à l'intérieur de la fenêtre modale
baliseModal.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic aux éléments sous-jacents
});

//Génération des minitravaux
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
// afficherMiniTravaux([...travaux, ...travaux]);
afficherMiniTravaux(travaux);

//Partie escape au clavier
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !baliseModal.classList.contains("hidden")) {
        console.log("escapeee !!!!!!!");
        closeModal();
    }
});
