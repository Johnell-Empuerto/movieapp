// Function to handle logout
function logout() {
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Function to fetch movies by genre and display them in scrollable section
function loadGenreMovies() {
    const apiKey = '83efa532'; // Replace with your OMDb API Key
    const genres = ['Action', 'Love', 'Romance', 'Comedy']; // List of genres

    genres.forEach(genre => {
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`,
            type: 'GET',
            success: function(data) {
                const genreContainer = $(`#${genre.toLowerCase()}-genre`);
                genreContainer.empty();

                if (data.Search) {
                    data.Search.forEach(movie => {
                        // Add movie to the scrollable container
                        genreContainer.append(`
                            <div class="movie-card">
                                <img src="${movie.Poster}" class="movie-poster" alt="${movie.Title}">
                                <h5 class="movie-title">${movie.Title}</h5>
                                <button class="btn btn-primary add-favorite" data-id="${movie.imdbID}">Add to Favorites</button>
                            </div>
                        `);
                    });
                } else {
                    genreContainer.append('<p>No movies found in this genre.</p>');
                }
            },
            error: function() {
                console.error(`Error fetching ${genre} movies`);
            }
        });
    });
}

// Search for movies and display results
$('#search-bar').on('keyup', function() {
    const query = $(this).val();
    
    if (query.length > 0) {
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=83efa532&s=${query}`,
            type: 'GET',
            success: function(data) {
                $('#movie-results').empty();
                if (data.Search) {
                    data.Search.forEach(movie => {
                        $('#movie-results').append(`
                            <div class="col-md-4">
                                <div class="card">
                                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.Title}</h5>
                                        <button class="btn btn-primary add-favorite" data-id="${movie.imdbID}">Add to Favorites</button>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                } else {
                    $('#movie-results').html('<p>No movies found. Try a different search term.</p>');
                }
            },
            error: function() {
                $('#movie-results').html('<p>There was an error fetching the movie data. Please try again later.</p>');
            }
        });
    } else {
        $('#movie-results').empty();
    }
});

// Handle Add to Favorites button click
$(document).on('click', '.add-favorite', function() {
    const movieId = $(this).data('id');
    
    $.ajax({
        url: 'add_favorite.php', // PHP script to handle adding a favorite
        type: 'POST',
        data: { movie_id: movieId },
        success: function(response) {
            if (response.success) {
                alert('Movie added to your favorites!');
                fetchFavorites(); // Fetch updated favorites after adding a movie
            } else {
                alert('There was an issue adding the movie.');
            }
        }
    });
});

function fetchFavorites() {
    $.ajax({
        url: 'get_favorites.php',
        type: 'GET',
        success: function(response) {
            console.log("Server response:", response);  // Debug log
            
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }

            $('#favorites').empty();
            if (response && response.success) {
                const favorites = response.favorites || [];
                if (favorites.length > 0) {
                    favorites.forEach(favorite => {
                        $.ajax({
                            url: `https://www.omdbapi.com/?apikey=83efa532&i=${favorite.movie_id}`,
                            type: 'GET',
                            success: function(movie) {
                                $('#favorites').append(`
                                    <div class="col-md-4">
                                        <div class="card">
                                            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                                            <div class="card-body">
                                                <h5 class="card-title">${movie.Title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                `);
                            },
                            error: function() {
                                console.error(`Error fetching details for movie ID ${favorite.movie_id}`);
                            }
                        });
                    });
                } else {
                    $('#favorites').html('<p>You have no favorites yet.</p>');
                }
            } else {
                $('#favorites').html('<p>Unable to load favorites: ' + (response.message || 'Unknown error') + '</p>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#favorites').html('<p>Error fetching data. Please try again later.</p>');
            console.error("AJAX error:", textStatus, errorThrown);
        }
    });
}

// Fetch genres and favorites on page load
$(document).ready(function() {
    loadGenreMovies(); // Fetch and display movies for all genres
    fetchFavorites(); // Fetch and display favorite movies
});