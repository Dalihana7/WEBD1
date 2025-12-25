import { API_KEY, BASE_URL, IMG_URL } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Sécurité : si on arrive sur la page sans ID, on retourne à l'accueil
if (!movieId) {
    window.location.href = 'index.html';
}

async function loadMovieDetails() {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
        const movie = await response.json();

        const container = document.getElementById('movie-details');
        
        // Structure avec classes pour le CSS "Flexbox" (image à gauche, texte à droite)
        container.innerHTML = `
            <div class="movie-hero">
                <img src="${IMG_URL}${movie.poster_path}" class="details-poster" alt="${movie.title}">
                <div class="details-text">
                    <h1 class="movie-title-red">${movie.title}</h1>
                    <p class="tagline">${movie.tagline || ""}</p>
                    <p class="overview">${movie.overview}</p>
                    <div class="meta">
                        <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
                        <span class="date">Sortie : ${movie.release_date}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Une fois le film chargé, on lance les commentaires
        loadMovieComments();
        
    } catch (error) {
        console.error("Erreur lors du chargement des détails :", error);
    }
}

async function loadMovieComments() {
    const commentsContainer = document.getElementById('comments-container');
    
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
        const data = await response.json();

        if (data.results.length === 0) {
            commentsContainer.innerHTML = "<p class='no-comments'>Aucun avis pour ce film pour le moment.</p>";
            return;
        }

        commentsContainer.innerHTML = ""; // On vide le message de chargement

        data.results.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-card';
            
            // On gère l'avatar (image de profil)
            let avatarPath = review.author_details.avatar_path;
            const avatarUrl = avatarPath 
                ? (avatarPath.startsWith('http') ? avatarPath.substring(1) : `${IMG_URL}${avatarPath}`)
                : 'https://ui-avatars.com/api/?name=' + review.author; // Avatar par défaut avec initiales

            reviewDiv.innerHTML = `
                <div class="review-header">
                    <img src="${avatarUrl}" class="reviewer-avatar">
                    <div class="reviewer-info">
                        <strong>${review.author}</strong>
                        <span class="review-date">le ${new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <p class="review-content">${review.content}</p>
            `;
            commentsContainer.appendChild(reviewDiv);
        });
    } catch (error) {
        console.error("Erreur commentaires :", error);
    }
}

loadMovieDetails();