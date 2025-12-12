import { fetchSearch } from "./fetch.js";

let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
    let query = searchInput.value.trim().toLowerCase();
    searchResult.innerHTML = "";

    if (query.length < 3) {
        searchResult.innerHTML = "<p>Veuillez entrer au moins 3 caractères pour la recherche.</p>";
        return;
    }

    fetchSearch(query)
        .then(data => {
            searchResult.innerHTML = "";

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    let movieDiv = document.createElement("div");
                    movieDiv.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                        <h3>${movie.Title}</h3>
                        <a href="movie.html?id=${movie.imdbID}">Détails</a>
                    `;
                    searchResult.appendChild(movieDiv);
                });
            } else {
                searchResult.innerHTML = "<p>Aucun résultat trouvé</p>";
            }
        })
        .catch(err => console.error("Erreur:", err));
});