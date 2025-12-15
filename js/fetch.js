let jsonPath = './js/data/movie.json'; 



export async function fetchTendance() {
    const response = await fetch(jsonPath);
    const jsonId = await response.json();

    const movie = await Promise.all(
        Object.values(jsonId)
            .flat()
            .map((id) =>
                fetch(`http://www.omdbapi.com/?apikey=64b6d3b5&i=${id}&type=movie`)
                    .then((res) => res.json())
                    .catch((err) => console.error(err))
            )
    );
    return movie;
}

export async function fetchSearch(value, page){
    const response = await fetch(`http://www.omdbapi.com/?apikey=64b6d3b5&s=${value}&type=movie&page=${page}`);
    const searchResults = await response.json();
    return searchResults;
}
export async function fetchMovieById(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=64b6d3b5&i=${id}&type=movie&plot=full`);
    const movieDetails = await response.json();
    return movieDetails;
}