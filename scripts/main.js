import { genererProjets } from "/scripts/gallerie.js";
import { pageLogin, pageAccueil, testerConnexion } from "/scripts/login.js";
import { afficherMiniTravaux, setModalToAddPicture } from "/scripts/modal.js";

// ******** Main ********
let travaux = await genererProjets(); // pour générer la page de base

// ******* Les Events Listeners ******* //

/**
 * Pour la partie Login
 * On réagi à l'appui sur le bouton "Se connecter"
 */
let baliseLogin = document.querySelector("#affichage-login");
baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial
pageAccueil();
pageLogin();
afficherMiniTravaux(travaux);

let baliseFormulaire = document.querySelector("#formulaire");
let token = "";
baliseFormulaire.addEventListener("submit", async function (event) {
    token = await testerConnexion(event);
});

// Pour ajouter un travail, notamment la photo
let baliseAjouterPhoto = document.querySelector(".add-on-click");
let baliseImgageFichierAAjouter = document.querySelector(".image-to-add");
let baliseRechercheInfosImage = document.querySelector(".mode-without-src");
let cheminFichier = "";
baliseAjouterPhoto.addEventListener("click", () => {
    let baliseChoisirFichier = document.querySelector("#choisir-fichier");

    baliseChoisirFichier.addEventListener("change", (event) => {
        let fichiers = [];
        fichiers = event.target.files;
        cheminFichier = URL.createObjectURL(fichiers[0]);
        baliseImgageFichierAAjouter.src = cheminFichier;
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
    console.log(reponse);
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
        console.log(cheminFichier);
        // on trouve la ccorepsondance entre la catégorie et l'id de la categorie

        //on valide la présence des différents champs

        //on créer l'object formdata
        const newWork = new FormData(); //créer un objet
        newWork.append("image", cheminFichier); //imageUrl
        console.log(cheminFichier);
        newWork.append("title", baliseInputName.value);
        newWork.append("category", categorieId); //categoryId
        // newWork.append("userId", 1);
        const myToken = localStorage.getItem("token");
        // console.log(myToken);
        envoyerNewFormdata(myToken, newWork);
    } else {
        setModalToAddPicture();
    }
});
