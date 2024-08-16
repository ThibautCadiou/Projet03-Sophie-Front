import { setModalToAddPicture, closeModal, setModalToNormal } from '/scripts/modal.js';
import { addPath } from '/scripts/main.js';
import { recupererCategories, resetAfichage } from '/scripts/gallerie.js';

/**
 * Fonction qui vérifie que les champs sont bien remplis afin de pouvoir Valider l'envoi
 * @param {*} b1 balise 01: le chemin de la photo
 * @param {*} b2 balise 02 : le titre de la photo
 * @param {*} b3 balise 03 : la catégorie de la photo
 */
function verifierChamps(b1, b2, b3) {
  // console.log(`can send work avant  : ${canSendWork}`);

  if (b1.value === '' || b2.value === '' || b3.value === 'none') {
    baliseAjoutPhoto.classList.add('btnValiderGris');
    baliseAjoutPhoto.classList.add('desactiver-boutons');
    canSendWork = false;
  } else {
    baliseAjoutPhoto.classList.remove('btnValiderGris');
    baliseAjoutPhoto.classList.remove('desactiver-boutons');
    canSendWork = true;
  }
}

//add event listeners sur  la photo
export let baliseChoisirFichier = document.querySelector('#choisir-fichier');
baliseChoisirFichier.addEventListener('change', function (event) {
  verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
//add event listeners sur le titre
const baliseTitreNewWork = document.querySelector('#titre');
baliseTitreNewWork.addEventListener('change', function (event) {
  verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
//add event listeners sur la categorie
const baliseParentMenuDreoulant = document.querySelector('#categorie'); // on génère le formulaire avec les valeur pour les catégories
baliseParentMenuDreoulant.addEventListener('change', function (event) {
  verifierChamps(baliseChoisirFichier, baliseTitreNewWork, baliseParentMenuDreoulant);
});
/******** Fin de la section validation des champs ********/

/**
 * Fonctions qui réagi au click sur " + Ajouter photo"
 */
let baliseAjouterPhoto = document.querySelector('.add-on-click');
let myFile = null;
let objectURL = null;
let baliseRechercheInfosImage = document.querySelector('.mode-without-src');
let baliseImageMinitature = document.querySelector('.photo');
baliseAjouterPhoto.addEventListener('click', () => {
  let baliseChoisirFichier = document.querySelector('#choisir-fichier');

  baliseChoisirFichier.removeEventListener('change', changementFichier); // on le supprime sil existe deja
  myFile = baliseChoisirFichier.addEventListener('change', changementFichier);
  baliseChoisirFichier.click();
});

const baliseApercuImage = document.querySelector('.image-to-add');
function changementFichier(event) {
  let fichiers = [];
  fichiers = event.target.files;
  myFile = fichiers[0]; // on fait l'hypothèse que seule un fichier est récupérer
  if (myFile !== undefined || myFile !== null) {
    objectURL = URL.createObjectURL(myFile); //pour pouvoir récupérer l'url de l'image sélectionnée
    baliseRechercheInfosImage.style.display = 'none';
    baliseApercuImage.src = objectURL;
    baliseImageMinitature.style.display = 'flex';
    return myFile;
  }
}

export function resetImage() {
  myFile = null;
  baliseApercuImage.src = null;
  baliseRechercheInfosImage.style.display = 'flex';
  baliseChoisirFichier.value = null;
}
/**
 * Fonction qui renvoie l'identifiant associé au nom de la categorie selectionnée dans le menu deroulant
 * @param {string} name le nom de la valeur de linput da
 * @returns ns le menu deroulant
 */
async function provideIdFromName(name) {
  const categorie = await recupererCategories();
  const myId = categorie.filter(function (categorie) {
    return categorie.name === name;
  })[0].id;
  return myId;
}

//Event listeners pour récupérer la catégories en fonction de la selection sur le menu deroulant
let categorieId = 0;
let baliseInputCategorie = document.querySelector('#categorie');
baliseInputCategorie.addEventListener('change', async function (event) {
  if (baliseInputCategorie.value !== 'none') {
    categorieId = await provideIdFromName(baliseInputCategorie.value);
  }
});

/**
 * Fonction d'envoie du nouveau travail
 * @param {string} myToken Le token d'identification (stocké dans le local storage)
 * @param {object} chargeUtile L'objet à envoyer
 */
async function envoyerNewFormdata(myToken, chargeUtile) {
  try {
    let reponse = await fetch(addPath, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${myToken}`,
        accept: 'application/json',
        // "Content-Type": "multipart/form-data",
      },
      body: chargeUtile,
    });
    if (reponse.ok) {
      closeModal();
      setModalToNormal();
      resetAfichage();
    } else {
      throw new Error("Informations d'envoie de fichier incorrect");
    }
  } catch (error) {
    console.log(`Erreur : ${error}`);
  }
}

let baliseInputName = document.querySelector('#titre');
let workTitle = '';
baliseInputName.addEventListener('change', () => {
  workTitle = baliseInputName.value;
});

export function setCanSendWork(value) {
  canSendWork = value;
}

export let canSendWork = false;
export let baliseAjoutPhoto = document.querySelector('.ajout-photo');
baliseAjoutPhoto.addEventListener('click', function (event) {
  if (event.target.classList.contains('ajout-photo')) {
    if (canSendWork) {
      //on créer l'object formdata
      const newWork = new FormData();
      newWork.append('title', workTitle);
      newWork.append('image', myFile);
      newWork.append('category', categorieId);

      const myToken = localStorage.getItem('token');

      envoyerNewFormdata(myToken, newWork);
      canSendWork = false;
    } else {
      setModalToAddPicture();
    }
  }
});
