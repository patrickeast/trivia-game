window.onload = function () {
    $("#start").on("click", stopwatch.start);
};


//Define question objects

var question1 = {
    question: "He touched the butt.",
    answers: [
        "Finding Nemo",
        "Finding Darla",
        "Finding Dory",
        "Finding Gill",
    ],
    correctAnswer: "Finding Nemo",
    asked: false,
    answered: false
};

var question2 = {
    question: "I am your wife! I’m the greatest good you’re ever gonna get.",
    answers: [
        "Up",
        "The Incredibles",
        "Coco",
        "Toy Story 3",
    ],
    correctAnswer: "The Incredibles",
    asked: false,
    answered: false
};

var question3 = {
    question: "Adventure is out there!",
    answers: [
        "Finding Nemo",
        "Toy Story",
        "The Good Dinosaur",
        "Up",
    ],
    correctAnswer: "Up",
    asked: false,
    answered: false
};

var question4 = {
    question: "Put that thing back where it came from, or so help me--!",
    answers: [
        "Ratatouille",
        "Cars",
        "Monsters, Inc.",
        "Inside Out",
    ],
    correctAnswer: "Monters, Inc.",
    asked: false,
    answered: false
};

var question5 = {
    question: "This isn’t flying. This is falling with style.",
    answers: [
        "Toy Story",
        "Toy Story 2",
        "Toy Story 3",
        "Toy Story 4?",
    ],
    correctAnswer: "Toy Story",
    asked: false,
    answered: false
};

console.log(question1.question);
console.log(question2.question);
console.log(question3.question);
console.log(question4.question);
console.log(question5.question);


//Define reset scenario

function resetGame() {
    $(".questionContainer").empty();
    $(".answersContainer").empty();
    stopwatch.reset();
};



//Define win scenario



//Define lose scenario



//Define end game scenario






// STOPWATCH ACTIVITY (SOLUTION)
// =============================

// This code will run as soon as the page loads

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

    time: 0,


    reset: function () {

        stopwatch.time = 0;

        // DONE: Change the "display" div to "00:00."
        $("#timer").text("00:00");

    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time ++;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timer").text(converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};