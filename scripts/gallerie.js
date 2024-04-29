import { workPath, catPath } from "/scripts/main.js";
/**
 * Fonction 010 de la partie gallerie : Récupérer la liste des travaux et des catégories depuis l'API grace aux routes indiquées
 * @param {string} worksPath Le chemin ou l'url de l'api donnant la liste des travaux
 * @param {string} catPath Le chemin ou l'url de l'API donnant la lits edes catégories
 * @returns {Array} une liste dont le premier élément est la liste des travaux et le second la liste des catégories
 */
export async function recupererTravauxEtCategories() {
    // Récupération des travaux
    const reponseWorks = await fetch(workPath);
    const travaux = await reponseWorks.json();

    // Récupération des catégories
    const reponseCategories = await fetch(catPath);
    const categories = await reponseCategories.json();
    return [travaux, categories];
}

/**
 * Fonction 011 de la partie gallerie : Récupérer la liste des travaux depuis l'API grace aux routes indiquées
 * @param {*} workPath
 * @returns
 */
export async function recupererTravaux() {
    // Récupération des travaux
    const reponseWorks = await fetch(workPath);
    const travaux = await reponseWorks.json();
    return travaux;
}

/**
 * Fonction 012 de la partie gallerie : Récupérer la liste des categories depuis l'API grace aux routes indiquées
 * @param {*} worksPath
 * @returns
 */
export async function recupererCategories() {
    // Récupération des travaux
    const reponseWorks = await fetch(catPath);
    const categories = await reponseWorks.json();
    return categories;
}

/**
 * Fonction 020 de la partie gallerie: Fonction qui génère les boutons de filtrage des projets
 * @param {Array} categories Liste des catégories (sans TOUS) avec leurs identifiants et leurs nom
 * @returns Une liste d'objet {id: <string>, name: <string>}comportant les catégories avec Tous ajoutés
 */
export function genererBouttons(categories) {
    let categoriesAvecTous = [{ id: 0, name: "Tous" }]; // on crée mla catégorie Tous pour créer le bouton de filtrage asocié
    categoriesAvecTous.push(...categories); //on ajoute les catégories récupérées depuis l'API
    let balisePortfolio = document.querySelector(".filtres"); // élément parent pour l'ajout des boutons
    for (let i = 0; i < categoriesAvecTous.length; i++) {
        const element = categoriesAvecTous[i];
        let baliseElementEnfant = document.createElement("button");
        if (i === 0) {
            baliseElementEnfant.classList.add("filtre-actif"); // on crée le premier bouton "tous" avec le filtre actif
        } else {
            baliseElementEnfant.classList.add("filtre-inactif"); // on crée tout les boutons avec le type inactif
        }
        baliseElementEnfant.classList.add("filtres-rapides"); // c'est le style des boutons

        baliseElementEnfant.innerText = element.name;
        baliseElementEnfant.id = element.name.split(" ")[0].toLowerCase();
        balisePortfolio.appendChild(baliseElementEnfant);
    }

    return categoriesAvecTous;
}

export function activerFiltreTous() {
    console.log("on es dans la fct filtre tous");
    let balisesFiltres = document.querySelector(".filtres-rapides");
    for (let i = 0; i < balisesFiltres.length; i++) {
        const element = balisesFiltres[i];
        element.classList.remove("filtre-actif");
        element.classList.remove("filtre-inactif");
        console.log("on change l'état des filtres");
        if (i === 0) {
            element.classList.add("filtre-actif"); // on crée le premier bouton "tous" avec le filtre actif
        } else {
            element.classList.add("filtre-inactif"); // on crée tout les boutons avec le type inactif
        }
    }
}

/**
 * Fonction 030 de la partie gallerie: Permet d'afficher la liste de travaux envoyés en paramètre
 * @param {Array} myList La liste des travaux à afficher
 */
export function afficherTravaux(myList) {
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
 * Fonction 041 de la partie gallerie: fonction qui tourne tout les boutons en off
 * @param {object} baliseAllButtons Les balises de l'ensemble de tout les boutons incluant "Tous"
 */
function turnOffAllButtons(baliseAllButtons) {
    for (let i = 0; i < baliseAllButtons.length; i++) {
        const balise = baliseAllButtons[i];
        if (balise.classList.contains("filtre-actif")) {
            balise.classList.remove("filtre-actif");
            balise.classList.add("filtre-inactif");
        }
    }
}

/**
 * Fonction 040 de la partie gallerie: permet de mettre a jour les onglets de filtrage ainsi qu'une liste des catégorie à afficher
 * @param {string} buttonId Id du bouton sur lequel le click a été fait
 * @param {Array} filtreActif Liste contenant les filtres actifs à appliquer lors de l'affichage
 * @returns Le <string> avec le texte invlu dans le bouton
 */
export function toggleButton(buttonId, filtreActif) {
    // on sélectionne tout les boutons de filtrage
    let baliseAllButtons = document.querySelectorAll(".filtres-rapides");

    //on toggle le bouton qui a été cliqué
    let balise = document.querySelector(`#${buttonId}`);
    if (balise.classList.contains("filtre-inactif")) {
        turnOffAllButtons(baliseAllButtons); //on éteint tous les boutons
        balise.classList.add("filtre-actif");
        balise.classList.remove("filtre-inactif");
        filtreActif = balise.buttonId;
        return balise.innerText;
    } else {
        turnOffAllButtons(baliseAllButtons); //on éteint tous les boutons
        return -1;
    }
}

/**
 * Fonctions 050 : On vide la gallery pour l'affichage des travaux filtré
 */
export function viderGallery() {
    let baliseGallery = document.querySelector(".gallery");
    baliseGallery.innerHTML = "";
}

/**
 * Fonctions 050 : On vide lles boutons
 */
export function viderBoutons() {
    let baliseBoutons = document.querySelector(".filtres");
    baliseBoutons.innerHTML = "";
}

/**
 * Fonction 060 : filtrage des travaux
 * @param {Array.<string>} travaux liste des travaux
 * @param {Array} categories liste des catégories récupérées depuis l'API
 * @param {Array} filtreActif liste de string avec le nom des filtres appliqués
 * @param {number} verbose pouravoir un retour d'informations lors du debug
 * @returns La liste des travaux à afficher en fonction des filtres
 */
export function filtrerTravaux(travaux, categories, filtreActif, verbose = 0) {
    //on récupère l'id de la catégorie envoyer
    let filtreActifId = categories.filter(function (cat) {
        return cat.name === filtreActif;
    });
    const categoryId = filtreActifId[0].id;

    let travauxFiltres = travaux.filter(function (travail) {
        return travail.categoryId === categoryId;
    });
    return travauxFiltres;
}

/**
 * Fonction main de la partie gallerie
 * @returns la liste de tout les travaux
 */
export async function genererProjets() {
    // On récupère les travaux et les catégories
    let travauxEtCategories = await recupererTravauxEtCategories(workPath, catPath);
    let travaux = travauxEtCategories[0];
    let categories = travauxEtCategories[1];

    // on génère les boutons avec les infos de la route /categories
    viderBoutons();
    categories = genererBouttons(categories);

    let baliseBoutons = document.querySelectorAll(".filtres button"); //Récupération des bouttons
    let filtreActif = [];
    let travauxFiltres = [...travaux];
    afficherTravaux(travauxFiltres); // on met tous les travaux pour le démarrage

    for (let i = 0; i < baliseBoutons.length; i++) {
        const element = baliseBoutons[i];

        element.addEventListener("click", (event) => {
            filtreActif = toggleButton(event.target.id, filtreActif);
            console.log(event.target.id);
            if (filtreActif === -1) {
                viderGallery();
            } else {
                let travauxFiltres = filtrerTravaux(travaux, categories, filtreActif, 1);
                viderGallery();
                if (filtreActif === "Tous") {
                    afficherTravaux(travaux);
                } else {
                    afficherTravaux(travauxFiltres);
                }
            }
        });
    }
    return travaux;
}

export async function resetAfichage() {
    const filtreActif = toggleButton("tous", []);
    let travaux = await recupererTravaux();
    const categorie = await recupererCategories();
    viderGallery();
    afficherTravaux(travaux);
}
