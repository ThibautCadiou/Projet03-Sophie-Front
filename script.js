// ******** Fonctions Fonctionnelles ********

/**
 * Récupérer la liste des travaux et des catégories depuis l'API grace aux routes indiquées
 * @param {string} worksPath Le chemin ou l'url de l'api donnant la liste des travaux
 * @param {string} catPath Le chemin ou l'url de l'API donnant la lits edes catégories
 * @returns {Array} une liste dont le premier élément est la liste des travaux et le second la liste des catégories
 */
async function recupererTravauxEtCategories(worksPath, catPath) {
    // Récupération des travaux
    const reponseWorks = await fetch(worksPath);
    const travaux = await reponseWorks.json();

    // Récupération des catégories
    const reponseCategories = await fetch(catPath);
    const categories = await reponseCategories.json();

    return [travaux, categories];
}

/**
 * Permet d'afficher la liste de travaux envoyé en paramètre
 * @param {Array} myList La liste des travaux à afficher
 */
function afficherTravaux(myList) {
    const baliseParentFigure = document.querySelector(".gallery");
    for (let i = 0; i < myList.length; i++) {
        const element = myList[i];

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = element.imageUrl;

        const figureCaptionElement = document.createElement("figcaption");
        figureCaptionElement.innerText = element.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figureCaptionElement);
        baliseParentFigure.appendChild(figureElement);
    }
}

/**
 * On vide la gallery pour l'affichage des travaux filtré
 */
function viderGallery() {
    let baliseGallery = document.querySelector(".gallery");
    baliseGallery.innerHTML = "";
}

/**
 * @param {Array} categories Liste des catégories (sans TOUS) avec leurs identifiants et leurs nom
 */
function genererBouttons(categories) {
    let categoriesAvecTous = [{ id: 0, name: "Tous" }];
    categoriesAvecTous.push(...categories);
    let balisePortfolio = document.querySelector(".filtres"); // élément parent pour l'ajout des boutons
    for (let i = 0; i < categoriesAvecTous.length; i++) {
        const element = categoriesAvecTous[i];

        let baliseElementEnfant = document.createElement("button");
        baliseElementEnfant.classList.add("filtres-rapides");
        baliseElementEnfant.classList.add("filtre-inactif");
        baliseElementEnfant.innerText = element.name;
        baliseElementEnfant.id = element.name.split(" ")[0].toLowerCase();
        balisePortfolio.appendChild(baliseElementEnfant);
    }

    return categoriesAvecTous;
}

// ******** Fonctions en cours de dev ********
function filtrerTravaux(travaux, categories, filtreApplique, verbose = 0) {
    let travauxfiltres = [];
    switch (filtreApplique) {
        case "tous":
            travauxfiltres = [...travaux];
            verbose === 0 ? null : console.log('on applique le filtre "Tous"');
            break;
        case "objets":
            travauxfiltres = [travaux[0]];
            verbose === 0 ? null : console.log('on applique le filtre "Objets"');
            break;
        case "appartements":
            travauxfiltres = [travaux[1]];
            verbose === 0 ? null : console.log('on applique le filtre "Appartements"');
            break;
        case "hotel-et-restaurants":
            travauxfiltres = [travaux[2]];
            verbose === 0 ? null : console.log('on applique le filtre "Hotels & restaurants"');
            break;
        default:
            console.log("Le filtre demandé n'existe pas mec ...");
            break;
    }
    return travauxfiltres;
}

function toggleButton(buttonId) {
    let balise = document.querySelector(`#${buttonId}`);
    console.log(balise.classList);
    if (balise.classList.contains("filtre-inactif")) {
        console.log("A");
        balise.classList.remove("filtre-inactif");
        balise.classList.add("filtre-actif");
    } else {
        console.log("B");
        balise.classList.remove("filtre-actif");
        balise.classList.add("filtre-inactif");
    }
}

// ******** Main ********
// On récupère les travaux et les catégories
let travauxEtCategories = await recupererTravauxEtCategories("http://localhost:5678/api/works", "http://localhost:5678/api/categories");
let travaux = travauxEtCategories[0];
let categories = travauxEtCategories[1];

categories = genererBouttons(categories); // on génère les boutons avec les infos de la route /categories

let baliseBoutons = document.querySelectorAll(".filtres button"); //Récupération des bouttons
let travauxFiltres = [...travaux];
afficherTravaux(travauxFiltres); // on met tous les travaux pour le démarrage

for (let i = 0; i < baliseBoutons.length; i++) {
    const element = baliseBoutons[i];

    element.addEventListener("click", (event) => {
        //console.log(event.target.id); // on récupère le texte à l'intérieur
        toggleButton(event.target.id);
    });
}
