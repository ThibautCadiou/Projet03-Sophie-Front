// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");
let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");

/**
 * Affichage de la page de login au click suivant l'état connecté ou deconnecté
 */
export function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        if (boutonLogin.innerText === "logout") {
            afficherPageAccueil();
            boutonLogin.innerText = "login";
            localStorage.removeItem("token");
            baliseModifier.style.display = "none";
        } else {
            afficherPageLogin();
        }
    });
}

/**
 * Affichage de la page login
 */
export function afficherPageLogin() {
    boutonLogin.style.fontWeight = "800";
    boutonProjet.style.fontWeight = "400";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
}

/**
 * Affihage de la page d'accueil sur click du bouton projet
 */
export function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        afficherPageAccueil();
    });
}

/**
 * Affichage de la page d'accueil
 */
export function afficherPageAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

/**
 * Redirection vers la page d'accueil en, fnction de la validation ou  de l'invalidation a la connexion
 */
export function redirectionAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

/**
 * Fonction pour tester le couple identiofiant mot de passe
 * @param {*} event
 */
export async function testerConnexion(event) {
    event.preventDefault();
    let connexionStatus = false;
    let baliseMail = document.querySelector("#login-email");
    let balisePassword = document.querySelector("#password");
    let mailValue = baliseMail.value;
    let passwordValue = balisePassword.value;
    let token = "";

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
        token = await tokenResponse.token;

        window.localStorage.setItem("token", tokenResponse.token);

        if (reponse.status !== 200) {
            connexionStatus = false;
            alert("Couple E-mail / Mot de passe invalid");
        } else {
            connexionStatus = true;
            alert("connexion réussi - redirection vers la page d'accueil");
            redirectionAccueil();
            let boutonLogin = document.querySelector(".login");
            boutonLogin.innerText = "logout";
            let baliseModifier = document.querySelector(".modifier");
            baliseModifier.style.display = "flex";
        }
    } catch (error) {
        console.log(error);
    }
    return await token;
}
