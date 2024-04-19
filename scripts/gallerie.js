// ******** Fonctions Fonctionnelles ********
/**
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
 * Permet d'afficher la liste de travaux envoyé en paramètre
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
 * On vide la gallery pour l'affichage des travaux filtré
 */
export function viderGallery() {
    let baliseGallery = document.querySelector(".gallery");
    baliseGallery.innerHTML = "";
}

/**
 * @param {Array} categories Liste des catégories (sans TOUS) avec leurs identifiants et leurs nom
 */
export function genererBouttons(categories) {
    let categoriesAvecTous = [{ id: 0, name: "Tous" }];
    categoriesAvecTous.push(...categories);
    let balisePortfolio = document.querySelector(".filtres"); // élément parent pour l'ajout des boutons
    for (let i = 0; i < categoriesAvecTous.length; i++) {
        const element = categoriesAvecTous[i];

        let baliseElementEnfant = document.createElement("button");
        if (i === 0) {
            baliseElementEnfant.classList.add("filtre-actif");
        } else {
            baliseElementEnfant.classList.add("filtre-inactif");
        }
        baliseElementEnfant.classList.add("filtres-rapides");
        baliseElementEnfant.innerText = element.name;
        baliseElementEnfant.id = element.name.split(" ")[0].toLowerCase();
        // baliseElementEnfant.id = element.name;
        balisePortfolio.appendChild(baliseElementEnfant);
    }

    return categoriesAvecTous;
}

/**
 * Fonction qui permet de mettre a jour les onglets de filtrage ainsi qu'une liste des catégorie à afficher
 * @param {string} buttonId Id du bouton sur lequel le click a été fait
 * @param {Array} listeFiltresID Liste contenant les filtres actifs à appliquer lors de l'affichage
 * @returns La liste 'listeFiltresID' MAJ
 */
export function toggleButton(buttonId, listeFiltresID) {
    let balise = document.querySelector(`#${buttonId}`);

    // on met tout les autres boutons en mode off
    let baliseAllButtons = document.querySelectorAll("button");
    let baliseBoutonTous = document.querySelector("#tous");
    if (buttonId === "tous") {
        listeFiltresID = [];
        if (baliseBoutonTous.classList.contains("filtre-inactif")) {
            baliseBoutonTous.classList.remove("filtre-inactif");
            baliseBoutonTous.classList.add("filtre-actif");
            for (let i = 1; i < baliseAllButtons.length; i++) {
                // on commence a 1 car 0 c'est le bouton tous
                const button = baliseAllButtons[i];
                listeFiltresID.includes(button.id) ? null : listeFiltresID.push(button.innerText);
                if (button.classList.contains("filtre-actif")) {
                    button.classList.remove("filtre-actif");
                    button.classList.add("filtre-inactif");
                }
            }
        } else {
            baliseBoutonTous.classList.remove("filtre-actif");
            baliseBoutonTous.classList.add("filtre-inactif");
            listeFiltresID = [];
        }
    } else {
        baliseBoutonTous.classList.remove("filtre-actif");
        baliseBoutonTous.classList.add("filtre-inactif");

        if (listeFiltresID.includes(balise.innerText) && balise.classList.contains("filtre-inactif")) {
            balise.classList.remove("filtre-inactif");
            balise.classList.add("filtre-actif");
            listeFiltresID = [balise.innerText];
        } else {
            if (balise.classList.contains("filtre-inactif")) {
                balise.classList.remove("filtre-inactif");
                balise.classList.add("filtre-actif");
                listeFiltresID.push(balise.innerText);
            } else {
                balise.classList.remove("filtre-actif");
                balise.classList.add("filtre-inactif");
                listeFiltresID = listeFiltresID.filter((element) => element !== balise.innerText);
            }
        }
    }
    return listeFiltresID;
}

/**
 *
 * @param {Array.<string>} travaux liste des travaux
 * @param {Array} categories liste des catégories récupérées depuis l'API
 * @param {Array} listeFiltres liste de string avec le nom des filtres appliqués
 * @param {number} verbose pouravoir un retour d'informations lors du debug
 * @returns La liste des travaux à afficher en fonction des filtres
 */

export function filtrerTravaux(travaux, categories, listeFiltres, verbose = 0) {
    // on crée la liste des catégorie id en fonction de la liste des filtres
    let listeIDs = [];
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];

        let currentCategorieName = categorie.name;
        let currentCategorieId = categorie.id;
        if (listeFiltres.includes(currentCategorieName)) {
            listeIDs.push(currentCategorieId);
        }
    }
    /* console.log(`
    liste des ids: ${listeIDs}
    `);
    */

    //on parcours les travaux et on ajoute a la liste des travaux ceux qui sont de la bonnes cat
    let travauxFiltres = [];
    for (let i = 0; i < travaux.length; i++) {
        const element = travaux[i];
        if (listeIDs.includes(element.categoryId)) {
            travauxFiltres.push(element);
        }
    }
    // console.log(travauxFiltres);
    return travauxFiltres;
}

export async function genererProjets() {
    // On récupère les travaux et les catégories
    let travauxEtCategories = await recupererTravauxEtCategories("http://localhost:5678/api/works", "http://localhost:5678/api/categories");
    let travaux = travauxEtCategories[0];
    let categories = travauxEtCategories[1];

    categories = genererBouttons(categories); // on génère les boutons avec les infos de la route /categories

    let baliseBoutons = document.querySelectorAll(".filtres button"); //Récupération des bouttons
    let listeFiltresID = [];
    let travauxFiltres = [...travaux];
    afficherTravaux(travauxFiltres); // on met tous les travaux pour le démarrage

    for (let i = 0; i < baliseBoutons.length; i++) {
        const element = baliseBoutons[i];

        element.addEventListener("click", (event) => {
            //console.log(event.target.id); // on récupère le texte à l'intérieur
            listeFiltresID = toggleButton(event.target.id, listeFiltresID);
            let travauxFiltres = filtrerTravaux(travaux, categories, listeFiltresID, 1);
            viderGallery();
            afficherTravaux(travauxFiltres);
        });
    }
}
