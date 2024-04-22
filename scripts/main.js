import { genererProjets } from "/scripts/gallerie.js";

// ******** Main ********
genererProjets(); // pour générer la page de base

// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");

let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");

baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial

function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        boutonLogin.style.fontWeight = "800";
        boutonProjet.style.fontWeight = "400";
        baliseLogin.style.display = "block";
        baliseProjet.style.display = "none";
    });
}

function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        boutonLogin.style.fontWeight = "400";
        boutonProjet.style.fontWeight = "800";

        baliseLogin.style.display = "none";
        baliseProjet.style.display = "block";
    });
}

// partie champs
let baliseFormulaire = document.querySelector("#formulaire");

let connected = baliseFormulaire.addEventListener("submit", async (event) => {
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
        const token = await reponse.json();

        if (reponse.status !== 200) {
            connexionStatus = false;
            alert("Couple E-mail / Mot de passe invalid\nRedirection vers la page d'accueil");
        } else {
            connexionStatus = true;
            alert("connexion réussi");
        }
    } catch (error) {
        console.log(error);
    }

    return connexionStatus;
});

pageAccueil();
pageLogin();
