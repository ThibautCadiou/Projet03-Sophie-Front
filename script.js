console.log("Hello World!");

// Récupération des bouttons
let baliseBoutons = document.querySelectorAll(".filtres button");
for (let i = 0; i < baliseBoutons.length; i++) {
    const button = baliseBoutons[i];
    button.addEventListener("click", (event) => {
        console.log(event.target.name);
    });
}

// Création de la liste des pièces
let baliseBoutonTous = document.querySelector(' button[name="tous"]');
baliseBoutonTous.addEventListener("click", async function (event) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const tous = await reponse.json();
    console.log(tous);
});
