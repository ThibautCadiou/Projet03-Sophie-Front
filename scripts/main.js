import { genererProjets } from '/scripts/gallerie.js';
import { initLogin } from '/scripts/login.js';
import { creerMiniTravaux } from '/scripts/modal.js';
import { suppressionTravail } from '/scripts/suppress-work.js';
import {} from '/scripts/add-work.js';

// ******** Paths ********
export const workPath = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/works';
export const catPath = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/categories';
export const addPath = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/works';
export const loginPath = 'https://thibautcadiou.github.io/Projet03-Sophie-Back/api/users/login';

// ******** Main ********
await genererProjets(); // pour générer la page de base
await initLogin(); // On réagi à l'appui sur l'onglet login
await creerMiniTravaux();
await suppressionTravail();
