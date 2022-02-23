// variables
var savedSettings;
var workoutType;
var workoutIntensity;

// workout intensity sets
var repsEasy = "15 Repetitions, 3 Sets Each";
var repsMed = "25 Repetitions, 4 sets Each";
var repsHard = "As many as you can!";

// array to store workouts
var workoutArray = [];

// generate the workout, taking in the browser with ajax - GET request
function workoutFunc(queryUrl) {
  // AJAX = Asynchronous JavaScript And XML
  // A browser built-in XMLHttpRequest
  $.ajax({
    // browser -> server -> browser
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    var workouts = response.results;
    // for each workout index, populate a new row
    for (var i = 0; i < workoutArray.length; i++) {
      // create the row and 3 data points
      var newRow = $(`<tr>`);
      var newData1 = $(`<td>`);
      var newData2 = $(`<td>`);
      var newData3 = $(`<td>`);
      // name & dedscription comes from the API: https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8
      newData1.html(workouts[workoutArray[i]].name);
      newData2.html(workouts[workoutArray[i]].description);
      if (workoutIntensity === "easy") {
        newData3.html(repsEasy);
      } else if (workoutIntensity === "medium") {
        newData3.html(repsMed);
      } else if (workoutIntensity === "hard") {
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

// based on workout, set url, set the workout indexes, call the workout generator (API)
function getWorkout(index) {
  // arms
  if (index === "8") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8";
    workoutArray = [0, 3, 12, 14, 16, 19];
    workoutFunc(workoutUrl);
  }
  // legs
  else if (index === "9") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50";
    workoutArray = [2, 8, 10, 13, 14, 21];
    workoutFunc(workoutUrl);
  }
  // abs
  else if (index === "10") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30";
    workoutArray = [0, 1, 2, 7, 13, 19];
    workoutFunc(workoutUrl);
  }
  // chest
  else if (index === "11") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&limit=30";
    workoutArray = [0, 5, 7, 12, 23];
    workoutFunc(workoutUrl);
  }
  // back
  else if (index === "12") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&equipment=3";
    workoutArray = [0, 3, 5, 6, 8];
    workoutFunc(workoutUrl);
  }
  // shoulder
  else if (index === "13") {
    workoutUrl =
      "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&limit=35";
    workoutArray = [2, 3, 10, 31, 34];
    workoutFunc(workoutUrl);
  }
}

// on page load, check the page
function checkPage() {
  // take the current url
  getLocalStorage();
  var str = $(location).attr("href");
  // parse the url down to the last section
  str = str.substring(str.lastIndexOf("/") + 1);
  // if the last section is the workout.html
  if (str === "workouts.html") {
    // create a new variable to get the page change button
    var pageVal = "";
    // if the local storage has something in it
    if (JSON.parse(localStorage.getItem("pageChange"))) {
      // if the stored data isn't empty
      if (JSON.parse(localStorage.getItem("pageChange")).length !== 0) {
        // set the page value to the page change type
        pageVal = JSON.parse(localStorage.getItem("pageChange"));
        // if the user pressed the workout button
        if (pageVal === "select") {
          // call the workout based on the user input
          getWorkout(workoutType);
        }
      }
    }
  }
}

// if workout settings and/or previous saved settings  are available in local storage,
// sets the corresponding global variables to values in local storage.
function getLocalStorage() {
  /** Appache - getItem() Returns the current value associated with the given key, or null if the given key does not exist. */
  if (localStorage.getItem("type")) {
    workoutType = localStorage.getItem("type");
    workoutIntensity = localStorage.getItem("intensity");
    workoutEquipment = localStorage.getItem("equipment");
  }
}

// if the start workout button was clicked, store that info and load the next page
$("#start").click(function () {
  // Appache - setItem() Dispatches a storage event on Window objects holding an equivalent Storage object.
  localStorage.setItem("type", $("#type").val());
  localStorage.setItem("intensity", $("#intensity").val());
  var buttonInput = JSON.stringify("select");
  localStorage.setItem("pageChange", buttonInput);
});

// when the document is loaded check the page
$(document).ready(function () {
  // initialize foundation;
  $(document).foundation();
  checkPage();
});
