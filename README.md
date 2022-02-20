# GymBro
## Browser Based Web App 

![Contents](https://img.shields.io/github/languages/top/dan-gentile/gym-bro)
![Last-Commit](https://img.shields.io/github/last-commit/dan-gentile/gym-bro)
![License](https://img.shields.io/github/license/dan-gentile/gym-bro)
​
### Table of contents
- [General info](#general-info)
- [Technologies](#Technologies)
- [Deployment](#Deployment)
- [Screen Shots](#Screen-shots)
- [Code Snippets](#Code-snippets)
- [Summary](#Summary)
- [CSS style](#CSS-style)


### General info
​
GymBro is a browser based workout generator that allows you to pick certain criteria such as legs, arms, chest, etc, to generate a workout. Other selectors include workout intensity. In addition to providing you with a great workout we have also provided the user with the option to choose a music playlist to accompany the workout, using Spotify. Users can even save their last workout to LocalStorage and recall it as long keep their browser open! 

- Foundation CSS
- Jquery
- Spotify API
- WgerAPI
​

Web Link: <https://dan-gentile.github.io/gym-bro/>
​

### Technologies
Project is created with:
​
- [Foundation](https://get.foundation/)
- [Jquery](https://jquery.com/)
- [SpotifyAPI](https://developer.spotify.com/documentation/web-api/)
- [WgerAPI](https://wger.de/api/v2/exerciseinfo/?language=2&category=9&offset=30)
- [JavaScript](https://www.javascript.com/)

### Deployment
- To use this app just load up the webpage in your browser! 
​
### Screen shots
Home Page
<img width="978" alt="Screen Shot 2020-09-25 at 1 38 36 PM" src="https://user-images.githubusercontent.com/68626350/94448572-e32f9780-015f-11eb-870b-2e3cc8e30570.png">

Workout Page
<img width="1039" alt="Screen Shot 2020-09-28 at 7 54 08 AM" src="https://user-images.githubusercontent.com/68626350/94448672-05c1b080-0160-11eb-8819-cba04acdd869.png">


### Code snippets
​

Building the Workouts 
~~~
$.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var workouts = response.results;
        // clear current workout playlist to avoid issues
        $(`tbody`).empty();
        // for each workout index, populate a new row in the playlist
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
~~~
Random Workout Function 
~~~
function randomWorkout() {
    var intensity = ["easy", "medium","hard"];
    var workout = ["8", "9", "10", "11", "12", "13"];
    // set a random intensity
    workoutInt = intensity[Math.floor(Math.random() * intensity.length)];
    // call a random workout
    workoutType = workout[Math.floor(Math.random() * workout.length)]
    getWorkout(workoutType);
~~~


### Summary
- This project is a front-end based web app pairs you with a workout and playlist of your choice.
​
### CSS style
- CSS styling was made using Foundation by Zurb
​
​
### Authors
- Quint Turner
- Dan Gentile
- Devin Gillogly
- Thomas An
- Jae Kim
- Jose Morales
​
### License
- MIT

​
​
​
