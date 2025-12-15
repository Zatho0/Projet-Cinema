import { fetchSearch } from "./fetch.js";

let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResults");
let loadMoreBtn = document.getElementById("loadMore");
let loadLessBtn = document.getElementById("loadLess");
let page = 1;


function moreMovie() {
  page += 1;
  result();
}
function lessMovie() {
  page -= 1;
  
  result();
}

function result() {
  let query = searchInput.value.trim().toLowerCase();

  if (query.length < 3) {
    searchResult.innerHTML =
      "<p>Veuillez entrer au moins 3 caractères pour la recherche.</p>";
    loadMoreBtn.style.display = "none";
    loadLessBtn.style.display = "none";
    page = 1;
    return;
  }

  fetchSearch(query, page)
    .then((data) => {
        searchResult.innerHTML = "";
      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          let movieDiv = document.createElement("div");
          movieDiv.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                        <h3>${movie.Title}</h3>
                        <a href="movie.html?id=${movie.imdbID}">Détails</a>
                    `;
          searchResult.appendChild(movieDiv);
          if (page === 1) {
          loadMoreBtn.style.display = "block";
        }
        });
        
      } else {
        searchResult.innerHTML = "<p>Aucun résultat trouvé</p>";
        loadLessBtn.style.display = "none";
        loadMoreBtn.style.display = "none";
        page = 1;
      }
    })
    .catch((err) => console.error("Erreur:", err));
}
searchInput.addEventListener("input", result);
loadMoreBtn.addEventListener("click", () => {
  moreMovie();

  loadLessBtn.style.display = "block";
});
loadLessBtn.addEventListener("click", () => {
  lessMovie();
  loadMoreBtn.style.display = "block";
    if (page === 1) { 
        loadLessBtn.style.display = "none";
    }
  
});
