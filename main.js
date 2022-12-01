// Variables
const elBody = document.querySelector("body");
const elForm = document.querySelector(".site-form");
const elHero = document.querySelector(".hero");
const elFormInput = document.querySelector(".js-input");
const elSelect = document.querySelector(".site-select");

const elSelectSort = document.querySelector(".site-select-sort");

const elSearchStart = document.querySelector(".form-search-start")
const elSearchEnd = document.querySelector(".form-search-end")


const elMoviesList = document.querySelector(".movies-list");

const categorySum = []

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

// bookmark
const bookmarkBtn =  document.querySelector(".bookmark-open");
const bookmarkList =  document.querySelector(".book-list");
const bookmarkSaveBtn =  document.querySelector(".save-btn");
const bookmarkArr = [];

AOS.init();

function bookmarkFunc (arr, element) {
  console.log(arr)
  element.innerHTML = "";
  arr.forEach(item => {
    let elItem = document.createElement("li");
    let elCard = 
    `
    <div class="card">
    <img class="card-img" src="http://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg">
    <h2 class="card-title">Name: ${item.Title}</h2>
    <button class="delete-btn" data-id=${item.imdb_id}>delete</button>
    </div>
    `
    elItem.innerHTML = elCard;
    element.appendChild(elItem);
    console.log(elItem);
  })
}

bookmarkBtn.addEventListener("click", evt => {
  evt.preventDefault(); 
  bookmarkList.classList.toggle("d-none");
  bookmarkList.classList.length < 3 ? bookmarkBtn.textContent = ">" : bookmarkBtn.textContent = "<";
  elHero.classList.toggle("bookmark-hero");
  elBody.classList.toggle("bookmark-body")
});

elMoviesList.addEventListener("click", function(evt){
  if (evt.target.matches(".save-btn")) {
    let btnId = evt.target.dataset.id;
    let itemFind = movies.find(item => item.imdb_id == btnId);
    if (!bookmarkArr.includes(itemFind)) {
      bookmarkArr.push(itemFind);
      console.log(itemFind)
      bookmarkFunc(bookmarkArr, bookmarkList)
    }
  }
})

bookmarkList.addEventListener("click", function(evt){
  if (evt.target.matches(".delete-btn")) {
    let btnId = evt.target.dataset.id;
    let itemFind = bookmarkArr.findIndex(item => item.imdb_id == btnId);
    bookmarkArr.splice(itemFind, 1);
    bookmarkFunc(bookmarkArr, bookmarkList);
  }
})

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

const categorieSum = [];
const result = [];

function benom(arr) {
  const set = new Set(arr)
  for (const iterator of set) {
    result.push(iterator)
  }
}


function renderMovies(kino, regex = ""){
  elMoviesList.innerHTML = "";
  
  const elMoviesTemplate = document.querySelector(".movies-temp").content;
  const MoviesFragment = document.createDocumentFragment();
  
  kino.forEach(item => {
    const elCloneMovie = elMoviesTemplate.cloneNode(true); 
    
    categorieSum.push(item.Categories.split("|"))
    
    
    
    elCloneMovie.querySelector(".movies-img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg `;
    if(regex.source != "(?:)" && regex){
      elCloneMovie.querySelector(".movies-title").innerHTML = item.Title.replace(regex, `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
    } else {
      elCloneMovie.querySelector(".movies-title").textContent = item.Title;
    }
    
    elCloneMovie.querySelector(".movies-rating").textContent = item.imdb_rating;
    elCloneMovie.querySelector(".movies-year").textContent = item.movie_year;
    elCloneMovie.querySelector(".movies-runtime").textContent =  getDuration(item.runtime);
    elCloneMovie.querySelector(".movies-categories").textContent = item.Categories.split("|").join("| ");
    elCloneMovie.querySelector(".movies-btn").dataset.id = item.imdb_id;
    MoviesFragment.appendChild(elCloneMovie);
    
  });
  elMoviesList.appendChild(MoviesFragment);
  
  benom(categorieSum.join(",").split(","))
  result.forEach(element => {
    const elOption = document.createElement("option");
    elOption.textContent = element;
    elSelect.appendChild(elOption);
  });
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
});

function showSearchMovies(search) {
  const filteredMovies = movies.filter(item => {
    const moreCriterias =  String(item.Title).match(search) &&  (elSelect.value === "All"  || item.Categories.includes(elSelect.value)) && (elSearchStart.value == "" || item.movie_year >= Number(elSearchStart.value)) && (elSearchEnd.value == "" || item.movie_year <= Number(elSearchEnd.value))
    return moreCriterias;
  });  
  return filteredMovies;
};

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  
  const elFormInputValue = elFormInput.value.trim();
  const regexValue = new RegExp(elFormInputValue, "gi");
  
  const searchMovie = showSearchMovies(regexValue)
  
  if (searchMovie.length > 0){
    sortFunc(movies, elSelectSort.value);
    renderMovies(searchMovie, regexValue);
  }else{
    elMoviesList.innerHTML = "Movie not found !!!";
  }
})



renderMovies(movies.slice(0, 10));
