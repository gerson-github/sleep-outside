const TMDB_API_KEY = "fc0f79a739c191e38714dce7325a46bb"; // Replace this with your TMDb API key

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
  } catch (err) {
    console.error("Failed to fetch movies", err);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";

    card.innerHTML = `
          <img src="${posterPath}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}</p>
        `;

    container.appendChild(card);
  });
}
