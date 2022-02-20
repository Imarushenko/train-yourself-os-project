// variables
var savedSettings;
var workoutType;
var workoutInt;

// workout intensity sets
var repsEasy = "15 Repetitions, 3 Sets Each"
var repsMed = "25 Repetitions, 4 sets Each"
var repsHard = "As many as you can!"

// array to store workouts
var workoutArray = [];

// get a stored or random genre index
function getGenre(){
    //Math.floor(Math.random() * genreArray.length);
    // if the local storage has something in it
    var genreStr = "";
    if (JSON.parse(localStorage.getItem("genre"))) {
        // if the stored data isn't empty
        if ((JSON.parse(localStorage.getItem("genre")).length !== 0)) {
            // set the genre value to the page change type
            genreStr = (JSON.parse(localStorage.getItem("genre")));
        }
    }
    // if there wasn't a stored genre, get a random one
    if(genreStr === "")
    {
        // return a random index
        return (Math.floor(Math.random() * genreArray.length));
    }
    // return the index of the stored genre
    var genreNumber = genreArray.indexOf(genreStr);
    return (genreNumber);
}

// generate the workout playlist, taking in the url
function workoutFunc(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var workouts = response.results;
        // for each workout index, populate a new row
        for(var i = 0; i < workoutArray.length; i++){
            // create the row and 3 data points
            var newRow = $(`<tr>`);
            var newData1 = $(`<td>`);
            var newData2 = $(`<td>`);
            var newData3 = $(`<td>`);
            // populate the name data point
            newData1.html(workouts[workoutArray[i]].name);
            // populate the description data point
            newData2.html(workouts[workoutArray[i]].description);
            // populate the intensity data point based on saved results
            if (workoutInt === 'easy') {
                newData3.html(repsEasy);
            } else if (workoutInt === 'medium') {
                newData3.html(repsMed);
            } else if (workoutInt === 'hard') {
                newData3.html(repsHard);
            }
            // add the data points to the row
            newRow.append(newData1);
            newRow.append(newData2);
            newRow.append(newData3);
            // add the row to the page in the tbody tag
            $(`tbody`).append(newRow);
        }
    });
}

// based on workout, set url, set the workout indexes, call the workout generator
function getWorkout(index){
    // arms
    if (index === "8") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8";
        workoutArray = [0, 3, 12, 14, 16, 19];
        workoutFunc(workoutUrl);

    } 
    // legs
    else if (index === "9") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50";
        workoutArray = [2, 8, 10, 13, 14, 21];
        workoutFunc(workoutUrl);
    } 
    // abs
    else if (index === "10") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30";
        workoutArray = [0, 1, 2, 7, 13, 19];
        workoutFunc(workoutUrl);
    } 
    // chest
    else if (index === "11") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&limit=30";
        workoutArray = [0, 5 , 7, 12, 23];
        workoutFunc(workoutUrl);
    } 
    // back
    else if (index === "12") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&equipment=3";
        workoutArray = [0, 3, 5, 6, 8];
        workoutFunc(workoutUrl);
    } 
    // shoulder
    else if (index === "13") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&limit=35";
        workoutArray = [2, 3, 10, 31, 34];
        workoutFunc(workoutUrl);
    }
}

// on page load, check the page
function checkPage() {
    // grab the current url
    getLocalStorage();
    var str = $(location).attr("href");
    // parse the url down to the last section
    str = str.substring(str.lastIndexOf('/') + 1);
    // if the last section is the workout.html
    if (str === "workout.html") {
        // create a new variable to get the page change button
        var pageVal = "";
        // if the local storage has something in it
        if (JSON.parse(localStorage.getItem("pageChange"))) {
            // if the stored data isn't empty
            if ((JSON.parse(localStorage.getItem("pageChange")).length !== 0)) {
                // set the page value to the page change type
                pageVal = (JSON.parse(localStorage.getItem("pageChange")));
                // if the user pressed the workout button
                if (pageVal === "select") {
                    // call the workout based on the user input
                    getWorkout(workoutType);
                    // populate the music playlist
                    if (localStorage.getItem("playlist")) {
                        musicPlaylist(localStorage.getItem("playlist"));
                    } else if (pageVal === "select") {
                        checkSpot();
                    }
                    
                    // end the function
                    return;
                }
                // if the user pressed the random button
                if (pageVal === "random") {
                    if (localStorage.getItem("type")) {
                        getWorkout(workoutType);
                    } else {
                        randomWorkout();
                    }
                    if (localStorage.getItem("playlist")) {
                        musicPlaylist(localStorage.getItem("playlist"));
                    } else {
                        // populate the music playlist
                        checkSpot();
                    }
                    // end the function
                    return;
                }
            }

        }
    } else if (str === "index.html") {
        clearLocal();
        if (savedSettings) {
            for (var index = 0; index < savedSettings.length; index++) {
                $("#saved-" + savedSettings[index].type + "s").append($("<option>").val(savedSettings[index].name).text(savedSettings[index].name));
            }
        }
    }
    // if the user navigated to the workout page or cleared their local storage
    randomWorkout();
    checkSpot();
}

// if workout settings and/or previous saved settings  are available in local storage, 
// sets the corresponding global variables to values in local storage.
function getLocalStorage() {
    if (localStorage.getItem("type")) {
        workoutType = localStorage.getItem("type");
        workoutInt = localStorage.getItem("intensity");
    }
    // checks to make sure saved-settings is an array
    if (localStorage.getItem("saved-settings")) {
        savedSettings = JSON.parse(localStorage.getItem("saved-settings"));
        return;
    }
    savedSettings = [];
}

// if the workout button was clicked, store that info and load the next page
$("#start").click(function () {
    localStorage.setItem("type", $("#type").val());
    localStorage.setItem("intensity", $("#intensity").val());
    localStorage.setItem("genre", $("#genre").val());
    // store the pageChange variable to local storage as a string
    var buttonInput = JSON.stringify("select");
    localStorage.setItem("pageChange", buttonInput);
    // store the selected genre to local storage as a string
    var genreSelected = JSON.stringify($("#genre").val());
    localStorage.setItem("genre", genreSelected);
    // change to the workout page
    $(location).attr("href", "workout.html");
})

// when the document is loaded check the page
$(document).ready(
    function () { 
        // initialize foundation;
        $(document).foundation();
        checkPage(); 
});

