import { fetchTendance } from "./fetch.js";
let allMovies = [];
let displayCount = 3;
let loadMoreBtn = document.getElementById("loadMore");
let loadLessBtn = document.getElementById("loadLess");



function displayMovies(allMovies) {
    let container = document.getElementById("trendingMovies");
    container.innerHTML = "";
    let movies = allMovies.slice(0, displayCount);
    movies.forEach(movie => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Plot}</p>
            <a href="movie.html?id=${movie.imdbID}">Détails</a>
        `;
        container.appendChild(movieDiv);
    });
}

function addMovie(count, allMovies) {
    displayCount += allMovies.length;
    displayMovies(allMovies);
    loadMoreBtn.style.display = "none";
    loadLessBtn.style.display = "block";
}
function lessMovie(count, allMovies) {
    displayCount = 3;
    displayMovies(allMovies);
    loadMoreBtn.style.display = "block";
    loadLessBtn.style.display = "none";
}

loadMoreBtn.addEventListener("click", () => addMovie(displayCount, allMovies));
loadLessBtn.addEventListener("click", () => lessMovie(displayCount, allMovies));

fetchTendance().then(movie => {
    allMovies = movie;
    displayMovies();
})

