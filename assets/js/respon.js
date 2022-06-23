var imdbKEY = "k_9dxir9d4";
var omdbKEY = "e5fda6";
var queryString = document.location.search;
var movieID = queryString.split("=")[1];

var title = document.querySelector("#title-search");
var poster = document.querySelector("#poster");
var summary = document.querySelector(".plot");
var date = document.querySelector(".date");
var rated = document.querySelector(".rated");
var runtime = document.querySelector(".runtime");
var genre = document.querySelector(".genre");
var cast = document.querySelector(".actors");
var writers = document.querySelector(".writers");
var directors = document.querySelector(".directors");
var imd = document.querySelector(".imd");
var rotten = document.querySelector(".rotten");
var meta = document.querySelector(".meta");

var reviewsEl = document.querySelector(".reviews");

// omdb api call
var omdbCall = function() {
  
  var omdbAPI = "http://www.omdbapi.com/?i=" + movieID + "&apikey=" + omdbKEY;

  fetch(omdbAPI).then(function(response) {

    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        buildOMDB(data);
      })
    }

    else {
      // insert modal to display api error
      apiModal.style.display = "block";

      span.onclick = function() {
          apiModal.style.display = "none";
      }
    } 
  })
}

// imdb review api call
var imdbCall = function() {

  var reviewAPI = "https://imdb-api.com/en/API/MetacriticReviews/" + imdbKEY + "/" + movieID;

  fetch(reviewAPI).then(function(response){
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        buildIMDB(data);
      })
    }

    else {
      // insert modal to display api error
      apiModal.style.display = "block";

      span.onclick = function() {
          apiModal.style.display = "none";
      }
    } 
  })
}



// dynamically create information for movie
var buildOMDB = function(data) {

  title.innerHTML = data.Title;
  poster.setAttribute("src", data.Poster);

  summary.innerHTML = data.Plot;
  date.innerHTML = data.Released;
  rated.innerHTML = data.Rated;
  runtime.innerHTML = data.Runtime;
  genre.innerHTML = data.Genre;
  cast.innerHTML = data.Actors;
  writers.innerHTML = data.Writer;
  directors.innerHTML = data.Director;

  imd.innerHTML = data.Ratings[0].Value;
  rotten.innerHTML = data.Ratings[1].Value;
  meta.innerHTML = data.Ratings[2].Value;
}


// dynamically create review information
var buildIMDB = function(data) {

  for (i=0; i < 5; i++) {
    // create variables
    var publisher = document.createElement("h2");
    publisher.innerHTML = "Publisher: <span id='text'>" + data.items[i].publisher + "</span>";

    var author = document.createElement("h2");
    author.innerHTML = "Author: <span id='text'>" + data.items[i].author + "</span>";

    var rate = document.createElement("h2");
    rate.innerHTML = "Rate: <span id='text'>" + data.items[i].rate + "</span>";

    var content = document.createElement("h2");
    content.innerHTML = "Review: <span id='text'>" + data.items[i].content + "</span>";

    var spacer = document.createElement("br");

    // append variables to DOM
    reviewsEl.appendChild(publisher);
    reviewsEl.appendChild(author);
    reviewsEl.appendChild(rate);
    reviewsEl.appendChild(content);
    reviewsEl.appendChild(spacer);
  }
}



document.onload = omdbCall();
document.onload = imdbCall();