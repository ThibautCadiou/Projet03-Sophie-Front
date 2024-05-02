import { workPath, catPath } from "/scripts/main.js";
import { afficherMiniTravaux, viderMinyGallery } from "/scripts/modal.js";

/**
 * @returns la liste des travaux
 */
export async function recupererTravaux() {
    // Récupération des travaux
    const reponseWorks = await fetch(workPath);
    const travaux = await reponseWorks.json();
    return travaux;
}

/**
 *
 * @returns liste des categories
 */
export async function recupererCategories() {
    // Récupération des travaux
    const reponseWorks = await fetch(catPath);
    const categories = await reponseWorks.json();
    return categories;
}

/**
 *
 * @returns l'ensemble des catégories incluant "Tous"
 */
async function genererBouttons() {
    const categories = await recupererCategories();
    let categoriesAvecTous = [{ id: 0, name: "Tous" }]; // on initialise une liste pour créer les boutons des filtres en ajoutant "tous"
    categoriesAvecTous.push(...categories); //on ajoute les catégories récupérées depuis l'API
    let balisePortfolio = document.querySelector(".filtres"); // élément parent pour l'ajout des boutons
    for (let i = 0; i < categoriesAvecTous.length; i++) {
        const element = categoriesAvecTous[i];
        let baliseElementEnfant = document.createElement("button");
        i === 0 ? baliseElementEnfant.classList.add("filtre-actif") : baliseElementEnfant.classList.add("filtre-inactif"); //c'est le style suivant actif ou inactif. on initialise "tous" a actif
        baliseElementEnfant.classList.add("filtres-rapides"); // c'est le style des boutons
        baliseElementEnfant.innerText = element.name;
        baliseElementEnfant.id = element.name.split(" ")[0].toLowerCase(); // on ajoute en id le premier mot du nom de la categorie en minuscule
        balisePortfolio.appendChild(baliseElementEnfant);
    }
    return categoriesAvecTous;
}

/**
 * On vide la gallerie
 */
export function viderGallery() {
    let baliseGallery = document.querySelector(".gallery");
    baliseGallery.innerHTML = "";
}

/**
 * On vide les boutons
 */
function viderBoutons() {
    let baliseBoutons = document.querySelector(".filtres");
    baliseBoutons.innerHTML = "";
}

/**
 * @param {string} buttonId L'id du bouton qui a été cliqué
 * @returns le innertext du bouton en question
 */
function toggleButton(buttonId) {
    // on sélectionne tout les boutons de filtrage
    let baliseAllButtons = document.querySelectorAll(".filtres-rapides");

    //on toggle le bouton qui a été cliqué
    let balise = document.querySelector(`#${buttonId}`);
    if (balise.classList.contains("filtre-inactif")) {
        turnOffAllButtons(baliseAllButtons); //on éteint tous les boutons
        balise.classList.add("filtre-actif");
        balise.classList.remove("filtre-inactif");
        return balise.innerText;
    } else {
        turnOffAllButtons(baliseAllButtons); //on éteint tous les boutons
        return -1;
    }
}

/**
 *
 * @param {Array.<object>} travaux Liste des travaux à filtrer
 * @param {Array.<object>} categories Liste des catégories incluant Tous
 * @param {string} filtreActif Le inner text du filtre en cours
 * @returns
 */
function filtrerTravaux(travaux, categories, filtreActif) {
    //on récupère l'id de la catégorie envoyer en recupérant l'objet catégorie qui a le même .name que le innertext compris dans filtre Actif
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
 * Affiche les travaux passés en paramètres
 * @param {Array.<object>} myList Liste des travaux à afficher
 */
export async function afficherTravaux(myList) {
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
 * Désactive tout les boutons
 * @param {Array} baliseAllButtons L'ensembles des balises des bouton s de filtres
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
 * Fonction qui génère les boutons de filtrage et gère l'affichage de la gallerie en fonction du filtre cliqué
 */
let haveBeenInit = false;
export async function genererProjets() {
    let travaux = await recupererTravaux();
    let categories = await recupererCategories();

    // on génère les boutons avec les infos de la route /categories
    viderBoutons();
    categories = await genererBouttons(categories);

    if (!haveBeenInit) {
        afficherTravaux(travaux); // on affiche tous les travaux au début
        haveBeenInit = true;
    }

    // on réagi à l'appui sur les boutons de filtrage
    let baliseBoutons = document.querySelectorAll("#filtres button"); //Récupération des bouttons
    let filtreActif = [];
    for (let i = 0; i < baliseBoutons.length; i++) {
        const element = baliseBoutons[i];

        element.addEventListener("click", (event) => {
            viderGallery();
            filtreActif = toggleButton(event.target.id, filtreActif);
            if (filtreActif === -1) {
            } else {
                let travauxFiltres = filtrerTravaux(travaux, categories, filtreActif, 1);
                if (filtreActif === "Tous") {
                    afficherTravaux(travaux);
                } else {
                    afficherTravaux(travauxFiltres);
                }
            }
        });
    }
}

/******** Fonctions qui servent peut être à rien********/
/**
 * Fonction qui désactive tout les filtre mais active le filtre tous
 */
export function activerFiltreTous() {
    let balisesFiltres = document.querySelector(".filtres-rapides");
    for (let i = 0; i < balisesFiltres.length; i++) {
        const element = balisesFiltres[i];
        element.classList.remove("filtre-actif");
        element.classList.remove("filtre-inactif");
        if (i === 0) {
            element.classList.add("filtre-actif"); // on crée le premier bouton "tous" avec le filtre actif
        } else {
            element.classList.add("filtre-inactif"); // on crée tout les boutons avec le type inactif
        }
    }
}

export async function resetAfichage() {
    const filtreActif = toggleButton("tous", []);
    let travaux = await recupererTravaux();
    const categorie = await recupererCategories();
    viderGallery();
    afficherTravaux(travaux);
    viderMinyGallery();
    afficherMiniTravaux(travaux);
}
