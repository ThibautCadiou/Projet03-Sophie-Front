import { loginPath } from "/scripts/main.js";
import { resetAfichage, genererProjets, viderGallery } from "/scripts/gallerie.js";

/**
 * Regroupement des fonctions nécessaire à l'initialisation de la partie login
 */
export function initLogin() {
    let baliseLogin = document.querySelector("#affichage-login");
    baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial
    pageAccueil(); //pour rediriger vers l'accueil en cas d'appui sur l'onglet "projets"
    pageLogin();
}

/**
 * Affichage de la page d'accueil sur click du bouton projet
 */
let boutonProjet = document.querySelector(".projets");
function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        afficherPageAccueil();
    });
}

/**
 * Affichage de la page d'accueil
 */
let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");
function afficherPageAccueil() {
    boutonLogin.style.fontWeight = "400";
    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

/**
 * Affichage de la page de login au click suivant l'état connecté ou deconnecté
 */
let boutonLogin = document.querySelector(".login");
let baliseModifier = document.querySelector(".modifier");
async function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        resetAfichage();
        if (boutonLogin.innerText === "logout") {
            afficherPageAccueil();
            boutonLogin.innerText = "login";
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            baliseModifier.style.display = "none";
            let baliseFiltres = document.querySelector(".filtres");
            baliseFiltres.classList.remove("cacher-les-boutons");
            baliseFiltres.classList.add("afficher-les-boutons");
            genererProjets();
            viderGallery();
        } else {
            afficherPageLogin();
        }
    });
}

/**
 * Affichage de la page login
 */
function afficherPageLogin() {
    boutonLogin.style.fontWeight = "800";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
}

// On réagi à l'appui sur le bouton "Se connecter"
let baliseFormulaire = document.querySelector("#formulaire");
baliseFormulaire.addEventListener("submit", async function (event) {
    try {
        testerConnexion(event); // on récupère le token
    } catch (error) {
        console.log(`error : ${error}`);
    }
});

/**
 * Connexion suivant mdp et id
 * @param {*} event
 */
async function testerConnexion(event) {
    event.preventDefault();

    //partie mail
    let baliseMail = document.querySelector("#login-email");
    let mailValue = baliseMail.value;

    // partie mdp
    let balisePassword = document.querySelector("#password");
    let passwordValue = balisePassword.value;

    try {
        const objetLogin = {
            // objet a envoyer lors de la requete
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: mailValue,
                password: passwordValue,
            }),
        };

        let reponse = await fetch(loginPath, objetLogin);
        const responseDeserialized = await reponse.json();

        window.localStorage.setItem("token", await responseDeserialized.token);
        window.localStorage.setItem("userId", await responseDeserialized.userId);

        if (reponse.status !== 200) {
            alert("Couple E-mail / Mot de passe invalid");
            throw new Error(`Mauvaise réponse de l'API (pas 200...!)`);
        } else {
            alert("connexion réussi - redirection vers la page d'accueil");
            afficherPageAccueil();
            let boutonLogin = document.querySelector(".login");
            boutonLogin.innerText = "logout";
            let baliseModifier = document.querySelector(".modifier");
            baliseModifier.style.display = "flex"; // afichage de la div Modifier permettant l'ouvezrture de la modale
            let baliseFiltres = document.querySelector(".filtres");
            baliseFiltres.classList.remove("afficher-les-boutons"); // on cache les boutons filtres
            baliseFiltres.classList.add("cacher-les-boutons");
        }
    } catch (error) {
        console.log(`on attrape l'erreur suivante :  ${error}`);
    }
}
