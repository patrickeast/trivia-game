window.onload = function () {
    $(".timerContainer").hide();
    $(".questionContainer").hide();
    $(".answersContainer").hide();
    $(".alertContainer").hide();
};

function triviaGame() {
    //make trivia into a variable
    var trivia = this;
    //define answers correct and incorrect
    trivia.answers = {
        correct: 0,
        incorrect: 0
    }
    //set userAnswer and image to null, in order to not render any result on function start
    trivia.userAnswer = null;
    trivia.image = null;

    //Set the current question to the data-id of the trivia.questions array.
    trivia.currentQuestion = 0;

    //Define question objects

    trivia.questions = [{
        question: "There's a place off Ocean Avenue, where I used to sit and talk with you.",
        choices: [
            "Yellowcard",
            "Redcard",
            "Black Flag",
            "Penalty Flag",
        ],
        image: "../images/Yellowcard.gif",
        correct: 0,
        correctAnswer: "Yellowcard"
    }, {

        question: "But if the world ends, I hope I'm in my living room with best friends...",
        choices: [
            "My Chemical Romance",
            "The Wonder Years",
            "Four Year Strong",
            "Blink-182",
        ],
        image: "../images/wonderyears.gif",
        correct: 1,
        correctAnswer: "The Wonder Years"
    }, {

        question: "You said nothing in this world could ever make you feel better than I do.",
        choices: [
            "Monkeyfoot",
            "Dogfish",
            "Zebrahead",
            "CatDog",
        ],
        image: "../images/zebrahead.gif",
        correct: 2,
        correctAnswer: "Zebrahead"
    }, {

        question: "Same song, different chorus...",
        choices: [
            "Bowling for Soup",
            "Bowling for Broth",
            "Bowling for liquid",
            "Bowling for chili",
        ],
        image: "../images/bowlingforsoup.gif",
        correct: 0,
        correctAnswer: "Bowling for Soup"
    }, {

        question: "If you knew what was good for you, you'd lock me up and throw away the key.",
        choices: [
            "Blink-182",
            "Rancid",
            "Rise Against",
            "MxPx",
        ],
        image: "../images/mxpx.gif",
        correct: 3,
        correctAnswer: "MxPx"
    }, {
        question: "Don't forget to think about me and I won't forget to write you once a week, she said.",
        choices: [
            "Blink-182",
            "Austin City Limits",
            "^^That's not a band",
            "Hoobastank"
        ],
        correct: 0,
        correctAnswer: "Blink-182"

    }, {
        question: "Way away away from here I'll be. Way away away so you can see how it feels to be alone and not believe.",
        choices: [
            "Relient K",
            "Garth Brooks",
            "Snoop Dogg",
            "Yellowcard"
        ],
        correct: 3,
        correctAnswer: "Yellowcard"
    }];

    trivia.questionAsked = function () {
        if (trivia.questions[trivia.currentQuestion]) {
            trivia.count = 30;
            $("#timer").html("Time left: " + "00:" + trivia.count);
            $(".questionContainer").html(trivia.questions[trivia.currentQuestion].question);
            console.log(trivia.questions[trivia.currentQuestion].question);
            var choicesArr = trivia.questions[trivia.currentQuestion].choices;
            var answerButtonArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var answerButton = $("<button>");
                answerButton.text(choicesArr[i]);
                answerButton.attr("data-id", i);
                $(".answersContainer").append(answerButton);
            }

            window.timerContainer = setInterval(trivia.stopwatch, 1000);

        } else {
            $("#start")
                .html(
                    "<p>" +"Play Again?" +
                    "<br>" + 
                    "Correct Answers: " +
                    trivia.answers.correct +
                    "<br>" + 
                    " Incorrect Answers: " +
                    trivia.answers.incorrect +
                    "</p>")
                .appendTo(".questionContainer")
                .show();
        }
    };

    trivia.stopwatch = function () {
        trivia.count--;
        if (trivia.count < 10) {
            $("#timer").html("Time left: " + "00:0" + trivia.count);
        }
        if (trivia.count <= 0) {
            $(".alertContainer").show();
            $("#timeUpAlert").text("Time's Up! Next Question...");
            $("#wins").html("Correct Answers: " + trivia.answers.correct);
            $("#losses").html("Incorrect Answers: " + (trivia.answers.incorrect + 1));
            setInterval(function () {
                $(".alertContainer").hide();
            }, 3000)
            setTimeout(function () {
                trivia.nextQuestion();
            });

        } else {
            $("#timer").html("Time left: " + "00:" + trivia.count);
        }
    };

    trivia.nextQuestion = function () {
        trivia.currentQuestion++;
        clearInterval(window.timerContainer);
        clearInterval(window.alertContainer);
        // $("#timer").empty();
        $("#timer").val("");
        trivia.count = 30;
        setTimeout(function () {
            trivia.reset();
            trivia.questionAsked();
        }, 1000)
    };

    trivia.reset = function () {
        $(".answersContainer").html("");
        $("#wins").html("Correct Answers: " + trivia.answers.correct);
        console.log(trivia.answers.correct);
        $("#losses").html("Incorrect Answers: " + trivia.answers.incorrect);
        console.log("Answers Incorrect: " + trivia.answers.incorrect);
    };

    trivia.answer = function (correct) {
        var string = correct ? "correct" : "incorrect";
        trivia.answers[string]++;
    };

    return trivia;

};


var game;

$("#start").on("click", function () {
    $(this).hide();
    $(".timerContainer").show();
    $(".questionContainer").show();
    $(".answersContainer").show();

    game = triviaGame();
    game.questionAsked();
    console.log(game.questionAsked);
});

$(".answersContainer").on("click", "button", function () {
    var userChoice = $(this).data("id"),
        trivia = game,
        index = trivia.questions[trivia.currentQuestion].correct,
        correct = trivia.questions[trivia.currentQuestion].choices[index];


    if (userChoice !== index) {
        $(".alertContainer").show();
        console.log("Wrong answer");
        $("#lossAlert").text("Umm, no. Try " + trivia.questions[currentQuestion].correctAnswer);
        $("#wins").html("Correct Answers: " + trivia.answers.correct);
        $("#losses").text("Incorrect Answers: " + trivia.answers.incorrect);
        trivia.answer(false);
        setTimeout(function () {
            $(".alertContainer").hide();
        }, 3000)

    } else {
        $(".alertContainer").show();
        console.log("Right Answer");
        $("#winAlert").text("Rock on! You got it!");
        $("#wins").html("Correct Answers: " + trivia.answers.correct);
        $("#losses").text("Incorrect Answers: " + trivia.answers.incorrect);
        trivia.answer(true);
        setTimeout(function () {
            $(".alertContainer").hide();
        }, 3000)
    }


    trivia.nextQuestion();
});

