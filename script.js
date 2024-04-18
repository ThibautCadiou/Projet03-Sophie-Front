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
function afficherListe(myList) {
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

// Récupération des bouttons
let baliseBoutons = document.querySelectorAll(".filtres button");
for (let i = 0; i < baliseBoutons.length; i++) {
    const button = baliseBoutons[i];
    button.addEventListener("click", (event) => {
        console.log(event.target.name);
    });
}

let travauxEtCategories = await recupererTravauxEtCategories("http://localhost:5678/api/works", "http://localhost:5678/api/categories");
let travaux = travauxEtCategories[0];
let categories = travauxEtCategories[1];
afficherListe(travaux);
