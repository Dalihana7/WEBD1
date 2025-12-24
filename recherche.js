import { API_KEY, BASE_URL, IMG_URL } from './api.js';

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();

    if (query.length > 2) { // On cherche à partir de 3 caractères
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=fr-FR`);
        const data = await response.json();
        
        displaySearchResults(data.results);
    } else {
        resultsContainer.innerHTML = ""; // On vide si le champ est vide
    }
});

function displaySearchResults(movies) {
    // ÉTAPE CRUCIALE : On vide l'ancien contenu avant d'afficher le nouveau
    resultsContainer.innerHTML = ""; 

    movies.forEach(movie => {
        if (!movie.poster_path) return; // On ignore les films sans affiche

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <a href="movie.html?id=${movie.id}">Détails</a>
        `;
        resultsContainer.appendChild(card);
    });
}