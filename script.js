// Récupération des bouttons
let baliseBoutons = document.querySelectorAll(".filtres button");
for (let i = 0; i < baliseBoutons.length; i++) {
    const button = baliseBoutons[i];
    button.addEventListener("click", (event) => {
        console.log(event.target.name);
    });
}

// Création de la liste des pièces
// let baliseBoutonTous = document.querySelector(' button[name="tous"]');
// baliseBoutonTous.addEventListener("click", async function (event) {
// });
const reponseWorks = await fetch("http://localhost:5678/api/works");
const travaux = await reponseWorks.json();
console.log(travaux);

// Récupération des catégories
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();
// console.log(categories);

// Création des fiches et affichage
const baliseParentFigure = document.querySelector(".gallery");
for (let i = 0; i < travaux.length; i++) {
    const element = travaux[i];

    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = element.imageUrl;

    const figureCaptionElement = document.createElement("figcaption");
    figureCaptionElement.innerText = element.title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figureCaptionElement);
    baliseParentFigure.appendChild(figureElement);
}
