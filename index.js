import { getTrendingMovies, IMG_URL } from './api/tmdb.js';

async function displayTrending() {
    const movies = await getTrendingMovies();
    const container = document.getElementById('movie-container');

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Sortie : ${movie.release_date}</p>
            <a href="movie.html?id=${movie.id}">En savoir plus</a>
        `;
        container.appendChild(card);
    });
}

displayTrending();