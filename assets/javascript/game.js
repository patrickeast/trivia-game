window.onload = function () {
    $(".timerContainer").hide();
    $(".questionContainer").hide();
    $(".answersContainer").hide();
    $(".winsContainer").hide();
    $(".alertContainer").hide();
    $("#start").on("click", function () {
        stopwatch.start();
        $(".timerContainer").show();
        $(".questionContainer").show();
        $(".answersContainer").show();
        if (stopwatch.time <= 0) {
            alert("Time's Up!");
        }
    })
    var wins = 0;
    var questions;
};

//Define question objects

questions = [{
    question: "There's a place off Ocean Avenue, where I used to sit and talk with you.",
    answers: [
        "Yellowcard",
        "Redcard",
        "Black Flag",
        "Penalty Flag",
    ],
    correctAnswer: "Yellowcard",
    asked: false,
    answered: false
}, {

    question: "But if the world ends, I hope I'm in my living room with best friends...",
    answers: [
        "The Wonder Years",
        "My Chemical Romance",
        "Four Year Strong",
        "I don't like Pop Punk",
    ],
    correctAnswer: "The Wonder Years",
    negativeAnswer: "I don't like Pop Punk",
    asked: false,
    answered: false
}, {

    question: "You said nothing in this world could ever make you feel better than I do",
    answers: [
        "Zebrahead",
        "Monkeyfoot",
        "Dogfish",
        "The White Stripes",
    ],
    correctAnswer: "Zebrahead",
    asked: false,
    answered: false
}, {

    question: "Same song, different chorus...",
    answers: [
        "Bowling for Soup",
        "Bowling for Broccoli",
        "Bowling for Orchids",
        "Bowling for Something Else",
    ],
    correctAnswer: "Bowling for Soup",
    asked: false,
    answered: false
}, {

    question: "If you knew what was good for you, you'd lock me up and throw away the key.",
    answers: [
        "MxPx",
        "Rancid",
        "Rise Against",
        "Blink-182",
    ],
    correctAnswer: "MxPx",
    asked: false,
    answered: false
}];

for (var i = 0; i < questions.length; i++) {
    var answerButton = $("<button>");
    answerButton.text(questions[i].answers);
    answerButton.attr("data-id", i);
    $(".answersContainer").append(answerButton);
    $(".questionContainer").html(questions[i].question);
}

answerButton.on("click", function(e) {
    if (this.attr == questions[i]) {
        setInterval($("#winsAlert").show(), 1000);
        wins++;
        $(".winsContainer").html("Wins: " + wins);
    }

})


//Define reset scenario

function resetGame() {
    $(".questionContainer").empty();
    $(".answersContainer").empty();
    stopwatch.reset();
};




//CLOCK AREA

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

var stopwatch = {

    time: 30,

    reset: function () {
        stopwatch.time = 0;
    },

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },

    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {
        stopwatch.time = stopwatch.time - 1;
        var converted = stopwatch.timeConverter(stopwatch.time);
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