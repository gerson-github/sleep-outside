const TMDB_API_KEY = "fc0f79a739c191e38714dce7325a46bb"; // Replace this with your TMDb API key

document.addEventListener("DOMContentLoaded", () => {
  trendingMovies();
});

document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("searchBtn").addEventListener("click", searchMovies);

document
  .getElementById("adventure-btn")
  .addEventListener("click", () => filterMovies("Action"));
document
  .getElementById("action-btn")
  .addEventListener("click", () => filterMovies("Adventure"));
document
  .getElementById("comedy-btn")
  .addEventListener("click", () => filterMovies("Comedy"));
document
  .getElementById("mistery-btn")
  .addEventListener("click", () => filterMovies("Mystery"));
document
  .getElementById("horror-btn")
  .addEventListener("click", () => filterMovies("Horror"));

async function filterMovies(genre) {
  document.getElementById("searchInput").value = genre;
  await searchMovies();
}

async function trendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`;

  document.querySelector(".tranding-lbl").style.display = "block";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.results) {
      displayMovies(data.results);
    } else {
      console.warn("No trending data received");
    }
  } catch (err) {
    console.error("Failed to fetch trending movies:", err);
  }
}

async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  document.querySelector(".tranding-lbl").style.display = "none";

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
    card.style.cursor = "pointer";

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "images/placeholder.png";

    card.innerHTML = `
          <img src='${posterPath}' alt='${movie.title}' />
          <h3>${movie.title}</h3>
          <p>${movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}</p>
        `;

    card.addEventListener("click", () => {
      let bookings = JSON.parse(localStorage.getItem("bookedMovies")) || [];

      const exists = bookings.some((m) => m.id === movie.id);
      if (!exists) {
        bookings.push(movie);
        localStorage.setItem("bookedMovies", JSON.stringify(bookings));
        alert(`✔️ Added "${movie.title}" to your bookings!`);
      } else {
        alert(`🎟️ "${movie.title}" is already booked.`);
      }
    });

    container.appendChild(card);
  });
}
