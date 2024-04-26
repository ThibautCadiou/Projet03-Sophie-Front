/**
 * Fonction 110 : Affichage de la page d'accueil sur click du bouton projet
 */
let boutonProjet = document.querySelector(".projets");
export function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        afficherPageAccueil();
    });
}

/**
 * Fonction 111 : Affichage de la page d'accueil
 */
let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");
export function afficherPageAccueil() {
    boutonLogin.style.fontWeight = "400";
    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

/**
 * Fonction 120 : Affichage de la page de login au click suivant l'état connecté ou deconnecté
 */
let boutonLogin = document.querySelector(".login");
let baliseModifier = document.querySelector(".modifier");
export function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        if (boutonLogin.innerText === "logout") {
            afficherPageAccueil();
            boutonLogin.innerText = "login";
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            baliseModifier.style.display = "none";
            let baliseFiltres = document.querySelector(".filtres");
            baliseFiltres.classList.remove("cacher-les-boutons");
            baliseFiltres.classList.add("afficher-les-boutons");
        } else {
            afficherPageLogin();
        }
    });
}

/**
 * Fonction 121 :Affichage de la page login
 */
export function afficherPageLogin() {
    boutonLogin.style.fontWeight = "800";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
}

/**
 * Fonction 130 : regroupement des fonctions nécessaire à l'initialisation de la partie login
 */
export function initLogin() {
    let baliseLogin = document.querySelector("#affichage-login");
    baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial
    pageAccueil(); //pour rediriger vers l'accueil en cas d'appui sur l'onglet "projets"
    pageLogin();
}

/**
 * Fonction main de la partie login:  pour tester le couple identiofiant mot de passe
 * @param {*} event
 */
export async function testerConnexion(event) {
    event.preventDefault();
    let baliseMail = document.querySelector("#login-email");
    let mailValue = baliseMail.value; // on récupère la valeur du formulaire contenant le mail
    let balisePassword = document.querySelector("#password");
    let passwordValue = balisePassword.value; // on récupèree la valeur dans le formulaire cotnenant le mdp

    try {
        const loginPath = "http://localhost:5678/api/users/login"; // route pour tester le couple id/mdp
        const objetLogin = {
            // objet a envoyer lors de la requete
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: mailValue,
                password: passwordValue,
            }),
        };

        const reponse = await fetch(loginPath, objetLogin);
        const responseDeserialized = await reponse.json();

        window.localStorage.setItem("token", await responseDeserialized.token);
        window.localStorage.setItem("userId", await responseDeserialized.userId);

        if (reponse.status !== 200) {
            alert("Couple E-mail / Mot de passe invalid");
        } else {
            alert("connexion réussi - redirection vers la page d'accueil");
            afficherPageAccueil();
            let boutonLogin = document.querySelector(".login");
            boutonLogin.innerText = "logout";
            let baliseModifier = document.querySelector(".modifier");
            baliseModifier.style.display = "flex";
            let baliseFiltres = document.querySelector(".filtres");
            baliseFiltres.classList.add("cacher-les-boutons");
        }
    } catch (error) {
        console.log(error);
    }
}
