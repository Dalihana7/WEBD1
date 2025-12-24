import { getTrendingMovies, IMG_URL } from './api.js';

async function displayMovies() {
    const movies = await getTrendingMovies();
    const container = document.getElementById('movie-container');

    if (!movies) return;

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card'); // Pour le CSS plus tard
        
        movieCard.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" style="width:200px;">
            <h3>${movie.title}</h3>
            <p>Sortie : ${movie.release_date}</p>
            <a href="movie.html?id=${movie.id}">En savoir plus</a>
        `;
        
        container.appendChild(movieCard);
    });
}

displayMovies();