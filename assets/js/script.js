var imdbKEY = "k_9dxir9d4";
var omdbKEY = "e5fda6";
var titleBtn = document.querySelector("#title-search-button");
var genreBtn = document.querySelector("#genre-search-button");
var listEl = document.querySelector(".form-column");



// function to use entry for title search in api call
var searchTitle = function() {

    titleInput = document.getElementById("title-search").value;

    imdbTitleCall(titleInput);

    document.getElementById("title-search").value = "";
}

// imdb call for searching by movie title 
var imdbTitleCall = function(search) {

    var api = "https://imdb-api.com/en/API/SearchMovie/" + imdbKEY + "/" + search;

    fetch(api).then(function(response) {

        // check if successful response
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                buildList(data);
            })
        }

        else {
            // insert modal to display "please type a movie title"
        }
    })
    .catch(function(error) {
        // insert error modal "unable to connect to api"
    })
}


// function to use entry for genre search in api call
var searchGenre = function() {

    genreInput = document.getElementById("genre-search").value;

    imdbGenreCall(genreInput);

    document.getElementById("genre-search").value = "";
}

// imdb call for searching by movie title 
var imdbGenreCall = function(search) {

    var api = "https://imdb-api.com/API/AdvancedSearch/" + imdbKEY + "/?genres=" + search;

    fetch(api).then(function(response) {

        // check if successful response
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                buildList(data);
            })
        }

        else {
            // insert modal to display "please type a movie title"
        }
    })
    .catch(function(error) {
        // insert error modal "unable to connect to api"
    })
}

// function to build movie list in right container
var buildList = function(data) {

    listEl.innerHTML = "";

    for (i = 0; i < data.results.length; i++) {
        var newBtn = document.createElement("button");

        newBtn.textContent = data.results[i].title + " " + data.results[i].description;

        newBtn.setAttribute("class", "pure-button item-list");
        newBtn.setAttribute("type", "button");

        listEl.appendChild(newBtn);
    }
}

titleBtn.addEventListener("click", searchTitle);
genreBtn.addEventListener("click", searchGenre);




