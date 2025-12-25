import { getTrendingMovies, IMG_URL } from './api.js';

let currentPage = 1; 

async function displayMovies(page) {
    const movies = await getTrendingMovies(page);
    const container = document.getElementById('movie-container');

    if (!movies) return;

    // Ajout de "index" pour calculer le numéro du film
    movies.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        // Calcul du rang réel (ex: page 2 commence au numéro 21)
        const rank = index + 1 + (page - 1) * 20;

        movieCard.innerHTML = `
            <div class="rank-number">${rank}</div>
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info-overlay">
                <h3>${movie.title}</h3>
                <p>Sortie : ${movie.release_date}</p>
                <a href="movie.html?id=${movie.id}" class="btn-details">En savoir plus</a>
            </div>
        `;
        container.appendChild(movieCard);
    });
}

// Premier chargement
displayMovies(currentPage);

// Gestion du bouton "Charger plus"
const loadMoreBtn = document.getElementById('load-more');
loadMoreBtn.addEventListener('click', () => {
    currentPage++; 
    displayMovies(currentPage); 
});