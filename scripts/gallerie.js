// ******** Fonctions Fonctionnelles ********
/**
 * Fonction 01 de la partie gallerie
 * Récupérer la liste des travaux et des catégories depuis l'API grace aux routes indiquées
 * @param {string} worksPath Le chemin ou l'url de l'api donnant la liste des travaux
 * @param {string} catPath Le chemin ou l'url de l'API donnant la lits edes catégories
 * @returns {Array} une liste dont le premier élément est la liste des travaux et le second la liste des catégories
 */
export async function recupererTravauxEtCategories(worksPath, catPath) {
    // Récupération des travaux
    const reponseWorks = await fetch(worksPath);
    const travaux = await reponseWorks.json();
    // Récupération des catégories
    const reponseCategories = await fetch(catPath);
    const categories = await reponseCategories.json();
    return [travaux, categories];
}

/**
 * Fonction 02 de la partie gallerie: Fonction qui génère les boutons de filtrage des projets
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

/**
 * Fonction 03 de la partie gallerie: Permet d'afficher la liste de travaux envoyés en paramètre
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
 * Fonction 04 de la partie gallerie: permet de mettre a jour les onglets de filtrage ainsi qu'une liste des catégorie à afficher
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
 * Fonctions 05 : On vide la gallery pour l'affichage des travaux filtré
 */
export function viderGallery() {
    let baliseGallery = document.querySelector(".gallery");
    baliseGallery.innerHTML = "";
}

/**
 * Fonction 06 : filtrage des travaux
 * @param {Array.<string>} travaux liste des travaux
 * @param {Array} categories liste des catégories récupérées depuis l'API
 * @param {Array} filtreActif liste de string avec le nom des filtres appliqués
 * @param {number} verbose pouravoir un retour d'informations lors du debug
 * @returns La liste des travaux à afficher en fonction des filtres
 */
export function filtrerTravaux(travaux, categories, filtreActif, verbose = 0) {
    // on crée la liste des catégorie id en fonction de la liste des filtres
    let listeIDs = [];
    console.log(filtreActif);
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];

        let currentCategorieName = categorie.name;
        let currentCategorieId = categorie.id;

        if (filtreActif.includes(currentCategorieName)) {
            listeIDs.push(currentCategorieId);
        }
    }

    //on parcours les travaux et on ajoute a la liste des travaux ceux qui sont de la bonnes cat
    let travauxFiltres = [];
    for (let i = 0; i < travaux.length; i++) {
        const element = travaux[i];
        console.log(element);
        if (listeIDs.includes(element.categoryId)) {
            travauxFiltres.push(element);
        }
    }
    return travauxFiltres;
}

/**
 * Fonction main de la partie gallerie
 * @returns la liste de tout les travaux
 */
export async function genererProjets() {
    // On récupère les travaux et les catégories
    let travauxEtCategories = await recupererTravauxEtCategories("http://localhost:5678/api/works", "http://localhost:5678/api/categories");
    let travaux = travauxEtCategories[0];
    let categories = travauxEtCategories[1];

    // on génère les boutons avec les infos de la route /categories
    categories = genererBouttons(categories);

    let baliseBoutons = document.querySelectorAll(".filtres button"); //Récupération des bouttons
    let filtreActif = [];
    let travauxFiltres = [...travaux];
    afficherTravaux(travauxFiltres); // on met tous les travaux pour le démarrage

    for (let i = 0; i < baliseBoutons.length; i++) {
        const element = baliseBoutons[i];

        element.addEventListener("click", (event) => {
            filtreActif = toggleButton(event.target.id, filtreActif);
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
