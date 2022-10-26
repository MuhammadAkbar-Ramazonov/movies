// Variables
const elMoviesList = document.querySelector(".movies-list");
const elMoviesTemplate = document.querySelector(".movies-temp").content;
const MoviesFragment = document.createDocumentFragment();

// For Loop
for (let index = 0; index < 100; index++) {  
  const elMoviesTemplate = document.querySelector(".movies-temp").content.cloneNode(true);
  
  elMoviesTemplate.querySelector(".movies-title").textContent = movies[index].Title;
  elMoviesTemplate.querySelector(".movies-year").textContent = movies[index].movie_year;
  elMoviesTemplate.querySelector(".movies-hour").textContent = Math.floor(movies[index].runtime / 60);
  elMoviesTemplate.querySelector(".movies-minut").textContent = movies[index].runtime % 60 ;
  elMoviesTemplate.querySelector(".movies-genres").textContent = movies[index].Categories.split("|").join("| ");
  
  MoviesFragment.appendChild(elMoviesTemplate);
}

elMoviesList.appendChild(MoviesFragment);

