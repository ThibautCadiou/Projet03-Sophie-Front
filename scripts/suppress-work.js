import { recupererTravaux, afficherTravaux, viderGallery } from '/scripts/gallerie.js';
import { creerMiniTravaux, viderMinyGallery } from '/scripts/modal.js';

/**
 * Fonction qui permet de renvoyer l'id d'un travail que l'on souhaite supprimer en fonction de l'url de l'image de ce meme travail
 * @param {string} url l'url de la photo du travail que l'on souhaite supprimer
 * @returns l'Id du l'objet travaux que l'on souhaite supprimer
 */
function renvoyerIdFromUrl(url, travaux) {
  const myImg = travaux.filter(function (travail) {
    return travail.imageUrl === url;
  });
  return myImg[0].id;
}

/**
 * Fonction qui supprime le travail lors du click sur la poubelle associée
 * @param {*} event l'event lié au click sur une trashcan
 */
export async function supprimerTravail(event) {
  let travaux = await recupererTravaux();
  const elementClique = event.target;

  const parent = elementClique.parentElement; // on recupere le parent
  const childImage = parent.firstChild; // dans ses enfants, on trouve le travail qui a ce chemin 'imageUrl'
  const imageUrl = childImage.src;
  const id = renvoyerIdFromUrl(imageUrl, travaux); //on récupère l'id du travail en question

  // on fait la requete pour supprimer le travail
  const fetchPathForDelete = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/works/' + id;
  const myToken = localStorage.getItem('token');
  let response = await fetch(fetchPathForDelete, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${myToken}`,
    },
    body: { id: id },
  });
}

/**
 * Fonction qui supprime le travail lors du click sur la poubelle associée
 * @param {*} event l'event lié au click sur une trashcan
 */
export async function supprimerTravailFromSrc(src) {
  let travaux = await recupererTravaux();

  const imageUrl = src;
  const id = renvoyerIdFromUrl(imageUrl, travaux); //on récupère l'id du travail en question

  // on fait la requete pour supprimer le travail
  const fetchPathForDelete = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/works/' + id;
  const myToken = localStorage.getItem('token');
  let response = await fetch(fetchPathForDelete, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${myToken}`,
    },
    body: { id: id },
  });
}

export async function cliqueSurCorbeilles() {
  let balisePouvellesMiniTravaux = document.querySelectorAll('.myCard .fa-trash-can');
  for (let i = 0; i < balisePouvellesMiniTravaux.length; i++) {
    const element = balisePouvellesMiniTravaux[i];
    element.addEventListener('click', async function (event) {
      await supprimerTravail(event);
      await majGalleries();
      balisePouvellesMiniTravaux = document.querySelectorAll('.myCard .fa-trash-can');
    });
  }
  return balisePouvellesMiniTravaux;
}

export async function majGalleries() {
  viderGallery();
  viderMinyGallery();

  let travaux = await recupererTravaux();
  await afficherTravaux(travaux);
  await creerMiniTravaux(travaux);
}

export async function suppressionTravail() {
  let balisePoubellesParent = document.querySelector('.modal-gallery');
  balisePoubellesParent.addEventListener('click', async function (event) {
    if (event.target.classList.contains('fa-trash-can')) {
      const parentElement = event.target.parentNode;
      const premierEnfant = parentElement.firstChild;
      await supprimerTravailFromSrc(premierEnfant.src);
      majGalleries();
    }
  });
}
