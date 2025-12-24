// src/api/tmdb.js
const API_KEY = '8de3ed7ddbca4b11759d20996dba1808';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Fonction générique pour fetcher les films en tendance
export async function getTrendingMovies(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erreur lors de la récupération des tendances:", error);
    }
}

export { IMG_URL };