var imdbKEY = "k_9dxir9d4";
var omdbKEY = "e5fda6";
var titleBtn = document.querySelector("#title-search-button");
var genreBtn = document.querySelector("#genre-search-button");
var listEl = document.querySelector(".form-column");
var pastEl = document.querySelector("#past-searches");



// function to use entry for title search in api call
var searchTitle = function() {

    var titleInput = document.getElementById("title-search").value;
    var titleID = "title";

    if (document.getElementById("title-search").value == 0) {

        // insert modal to warn that search is empty
        alert("test");
    }

    else {
        imdbTitleCall(titleInput);
        saveSearch(titleInput, titleID);
    }

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

    var genreInput = document.getElementById("genre-search").value;
    var genreID = "genre";

    if (document.getElementById("genre-search").value == 0) {

        // insert modal to warn that search is empty

    }

    else {

        imdbGenreCall(genreInput);
        saveSearch(genreInput, genreID);
    }

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


// save search results to local storage and show on left container
var saveSearch = function(searchInput, searchID) {

    // get localstorage variable
    var pastSearch = JSON.parse(localStorage.getItem("pastSearch"));

    // check if localstorage variable exists yet
    if (pastSearch == null) {
        pastSearch = [];
    }

    // check if variable is too long
    if (pastSearch.length >= 5) {

        // remove oldest search item
        pastSearch.splice(0, 1,);
    }

    // push search info into localstorage variable
    pastSearch.push(searchInput+ ";" + searchID);

    // save to updated variable to localstorage
    localStorage.setItem("pastSearch", JSON.stringify(pastSearch));
    
    buildPastSearch();
}

// build list of previous searches
var buildPastSearch = function() {

    pastEl.innerHTML = "";

    // get localstorage variable
    var pastSearch = JSON.parse(localStorage.getItem("pastSearch"));

    for (i = 0; i < pastSearch.length; i++) {
        var pastBtn = document.createElement("button");

        var [input, id] = pastSearch[i].split(";");

        pastBtn.textContent = input + " (" + id + ")";
        pastBtn.setAttribute("class", "pure-button item-list");
        pastBtn.setAttribute("type", "button");
        pastBtn.setAttribute("id", id);

        pastEl.appendChild(pastBtn); 
    }
}

titleBtn.addEventListener("click", searchTitle);
genreBtn.addEventListener("click", searchGenre);
window.onload = buildPastSearch;




