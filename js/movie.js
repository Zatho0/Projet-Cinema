import { fetchMovieById } from "./fetch.js";

let movieDetails = document.getElementById("movieDetails");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetchMovieById(id).then(data => {
    if (data.Response === "True") {
        movieDetails.innerHTML = `
            <h1>${data.Title}</h1>
            <img src="${data.Poster}" alt="Affiche de ${data.Title}">
            <h2>Résumé :</h2>
            <p>${data.Plot}</p>
            <h3>Genre :</h3>
            <p>${data.Genre}</p>
            <h3>Acteurs :</h3>
            <p>${data.Actors}</p>
            <h3>Notes :</h3>
            ${(data.Ratings || []).map(r => `<p>${r.Source}: ${r.Value}</p>`).join('')}
        `;
    } else {
        movieDetails.innerHTML = "<p>Film non trouvé.</p>";
    }
});