let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResults");

let lastQuery = ""; 

searchInput.addEventListener("input", function () {
    let query = searchInput.value.trim().toLowerCase();
    searchResult.innerHTML = "";

    
    lastQuery = query;

    if (query.length < 3) {
        searchResult.innerHTML = "<p>Veuillez entrer au moins 3 caractères pour la recherche.</p>";
    }

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=64b6d3b5`)
        .then(res => res.json())
        .then(data => {

           
            if (query !== lastQuery) return;

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
