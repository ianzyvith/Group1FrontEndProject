var imdbKEY = "k_9dxir9d4";
var omdbKEY = "e5fda6";
var titleBtn = document.querySelector("#title-search-button");
var genreBtn = document.querySelector("#genre-search-button");
var listEl = document.querySelector(".form-column");
var pastEl = document.querySelector("#past-searches");

var titleModal = document.getElementById("titleModal");
var genreModal = document.getElementById("genreModal");
var apiModal = document.getElementById("apiModal");
var span0 = document.getElementsByClassName("close0")[0];
var span1 = document.getElementsByClassName("close1")[0];
var span2 = document.getElementsByClassName("close2")[0];



// function to use entry for title search in api call
var searchTitle = function() {

    var titleInput = document.getElementById("title-search").value;
    var titleID = "title";

    if (document.getElementById("title-search").value == 0) {

        // insert modal to warn that search is empty
        titleModal.style.display = "block";

        span0.onclick = function() {
            titleModal.style.display = "none";
        }
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
                
                if (data.results.length == 0) {
                    // warn that valid title is needed
                    titleModal.style.display = "block";

                    span0.onclick = function() {
                        titleModal.style.display = "none";
                    }
                }

                else {
                    console.log(data);
                    buildList(data);
                }
            })
        }

        else {
            // insert modal to display "please type a movie title"
            titleModal.style.display = "block";

            span0.onclick = function() {
                titleModal.style.display = "none";
            }
        }
    })
    .catch(function(error) {
        // insert error modal "unable to connect to api"
        apiModal.style.display = "block";

        span3.onclick = function() {
            apiModal.style.display = "none";
        }
    })
}


// function to use entry for genre search in api call
var searchGenre = function() {

    var genreInput = document.getElementById("genre-search").value;
    var genreID = "genre";

    if (document.getElementById("genre-search").value == 0) {

        // insert modal to warn that search is empty
        genreModal.style.display = "block";

        span1.onclick = function() {
            genreModal.style.display = "none";
        }
    }

    else {

        imdbGenreCall(genreInput);
        saveSearch(genreInput, genreID);
    }

    document.getElementById("genre-search").value = "";
}

// imdb call for searching by movie genre
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
            // insert modal to display "please type a movie genre"
            genreModal.style.display = "block";

            span1.onclick = function() {
                genreModal.style.display = "none";
            }
        }
    })
    .catch(function(error) {
        // insert error modal "unable to connect to api"
        apiModal.style.display = "block";

        span3.onclick = function() {
            apiModal.style.display = "none";
        }
    })
}

// function to build movie list in right container
var buildList = function(data) {

    if (data.results == 0) {
        // insert error modal 
        badModal.style.display = "block";

        span2.onclick = function() {
            badModal.style.display = "none";
        }

    listEl.innerHTML = "";

    for (i = 0; i < 15; i++) {
        // link button to results page
        var btnLink = document.createElement("a");
        btnLink.setAttribute("class", "pure-button item-list");
        btnLink.setAttribute("type", "button");
        btnLink.setAttribute("href", "./results.html?id=" + data.results[i].id);

        // create buttons
        var newBtn = document.createElement("span");

        newBtn.textContent = data.results[i].title + " " + data.results[i].description;

        // append to DOM
        listEl.appendChild(btnLink);
        btnLink.appendChild(newBtn);
    }
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
        pastBtn.setAttribute("class", "pure-button item-list past-btn");
        pastBtn.setAttribute("type", "button");
        pastBtn.setAttribute("id", id);

        pastEl.appendChild(pastBtn); 
    }
}


// function to give functionality to previous search buttons


titleBtn.addEventListener("click", searchTitle);
genreBtn.addEventListener("click", searchGenre);
window.onload = buildPastSearch;







