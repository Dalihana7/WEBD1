import { getTrendingMovies, IMG_URL } from './api.js';

let currentPage = 1; // On commence à la page 1

async function displayMovies(page) {
    const movies = await getTrendingMovies(page);
    const container = document.getElementById('movie-container');

    if (!movies) return;

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        movieCard.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" style="width:200px;">
            <h3>${movie.title}</h3>
            <p>Sortie : ${movie.release_date}</p>
            <a href="movie.html?id=${movie.id}">En savoir plus</a>
        `;
        container.appendChild(movieCard);
    });
}

// Premier chargement
displayMovies(currentPage);

// Gestion du bouton "Charger plus"
const loadMoreBtn = document.getElementById('load-more');
loadMoreBtn.addEventListener('click', () => {
    currentPage++; // On passe à la page suivante
    displayMovies(currentPage); // On appelle l'API pour la nouvelle page
});