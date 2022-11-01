// Variables
const elMoviesList = document.querySelector(".movies-list");
const elMoviesTemplate = document.querySelector(".movies-temp").content;
const MoviesFragment = document.createDocumentFragment();
const elForm = document.querySelector(".site-form");
const elSelect = document.querySelector(".site-select");
const elFormInput = document.querySelector(".js-input");
const elSearchStart = document.querySelector(".form-search-start")
const elSearchEnd = document.querySelector(".form-search-end")

const elSelectSort = document.querySelector(".site-select-sort");


// MODAL
const elModal = document.querySelector(".modal");
const modalTitle = elModal.querySelector(".modal-title");
const modalIframe = elModal.querySelector(".modal-iframe");
const modalRating = elModal.querySelector(".modal-rating");
const modalYear = elModal.querySelector(".modal-year");
const modalRuntime = elModal.querySelector(".modal-runtime");
const modalCategories = elModal.querySelector(".modal-categories");
const modalSummary = elModal.querySelector(".modal-summary");
const modalLink = elModal.querySelector(".modal-imdb-link");

const categorySum = []

const yearEndSum = []


function sortFunc(arr, select){
  if(select == "A-Z"){
    arr.sort((a, b) => {
      if(String(a.Title) > String(b.Title)){
        return 1
      }
      else if(String(a.Title) < String(b.Title)){
        return -1
      }
      else{
        return 0
      }
    })
  }
  else if(select == "Z-A"){
    arr.sort((a, b) =>{
      if(String(a.Title) > String(b.Title)){
        return -1
      }
      else if(String(a.Title) < String(b.Title)){
        return 1
      }
      else{
        return 0
      }
    })
  }

  if(select == "2000-2018"){
    arr.sort((a, b) => a.movie_year - b.movie_year)
  }
  else if(select == "2018-2000"){
    arr.sort((a, b) => b.movie_year - a.movie_year)
  }
  
  if(select == "1-10"){
    arr.sort((a, b)=> a.imdb_rating - b.imdb_rating)
  }
  else if(select == "10-1"){
    arr.sort((a, b)=> b.imdb_rating - a.imdb_rating)
  }
}

function getDuration (time){
  const hours = Math.floor(time / 60 );
  const minuts = Math.floor(time % 60 );
  return `${hours} hrs ${minuts} min  `
}

function renderMovies(kino){
  elMoviesList.innerHTML = "";
  
  kino.forEach(item => {
    const elCloneMovie = elMoviesTemplate.cloneNode(true);
    item.Categories.split("|").forEach(function(element){
      if(!categorySum.includes(element)){
        categorySum.push(element);
        const elOption = document.createElement("option");
        elOption.textContent = element;
        elSelect.appendChild(elOption);
      } 
      
    })
    
    elCloneMovie.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg `;
    elCloneMovie.querySelector(".movies-title").textContent = item.Title;
    elCloneMovie.querySelector(".movie-rating").textContent = item.imdb_rating;
    elCloneMovie.querySelector(".movie-year").textContent = item.movie_year;
    elCloneMovie.querySelector(".movie-runtime").textContent =  getDuration(item.runtime);
    elCloneMovie.querySelector(".movie-categories").textContent = item.Categories.split("|").join("| ");
    elCloneMovie.querySelector(".movie-btn").dataset.id = item.imdb_id;
    MoviesFragment.appendChild(elCloneMovie);
    
  });
  elMoviesList.appendChild(MoviesFragment)
  
}

function renderModalInfo(topilganKino){
  modalTitle.textContent = topilganKino.Title;
  modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
  modalRating.textContent = topilganKino.imdb_rating;
  modalYear.textContent = topilganKino.movie_year;
  modalRuntime.textContent = getDuration(topilganKino.runtime);
  modalCategories.textContent = topilganKino.Categories.split("|").join(", ");
  modalSummary.textContent = topilganKino.summary;
  modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
}

elMoviesList.addEventListener("click",function(evt){
  const targetElement = evt.target
  if(targetElement.matches(".movie-btn")){
    const btnId = targetElement.dataset.id
    const foundMovie = movies.find(movie => movie.imdb_id === btnId);
    renderModalInfo(foundMovie);
  }
});

elModal.addEventListener("hide.bs.modal", function(){
  modalIframe.src = "";
})

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  
  
  const elSelctCatecoryValue = elSelect.value
  const elFormInputValue = elFormInput.value.trim();
  const elSelectValue = elSelect.value.trim();
  const elSearchStartValue = Number(elSearchStart.value)
  const elSearchEndValue = Number(elSearchEnd.value)
  const regexValue = new RegExp(elFormInputValue, "gi");
  const regexCategory = new RegExp(elSelctCatecoryValue, "gi"); 
  const elSelectSortValue = elSelectSort.value;
  
  sortFunc(movies, elSelectSortValue);
 
  if(elFormInputValue == ""){
    const searchMovie = movies.filter(item => (item.Categories.match(regexCategory) || elSelctCatecoryValue === "All") && ((elSearchStartValue <= item.movie_year && elSearchEndValue >= item.movie_year) || (elSearchStartValue == "" && elSearchEndValue >= item.movie_year) || (elSearchStartValue <= item.movie_year && elSearchEndValue == "")));
    renderMovies(searchMovie.slice(0));
  }
  else{
    const searchMovie = movies.filter(item => String(item.Title).match(regexValue) && (elSelectValue === item.Categories || String(item.Title).match(regexValue) && elSelectValue === "All")  && ((elSearchStartValue <= item.movie_year && elSearchEndValue >= item.movie_year) || (elSearchStartValue == "" && elSearchEndValue >= item.movie_year) || (elSearchStartValue <= item.movie_year && elSearchEndValue == "")));
    
    renderMovies(searchMovie.slice(0));
    
    if (searchMovie.length > 0){
      renderMovies(searchMovie);
    }else{
      elMoviesList.innerHTML = "Not found !!!";
    }
  }
})

renderMovies(movies.slice(0, 10));
