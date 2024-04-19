import { filtrerTravaux, recupererTravauxEtCategories, afficherTravaux, viderGallery, genererBouttons, toggleButton } from "/scripts/gallerie.js";

// ******** Main ********
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
