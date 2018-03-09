window.onload = function () {
    $(".alertContainer").show();
    $(".timerContainer").hide();
    $(".questionContainer").hide();
    $(".answersContainer").hide();
    $(".winsContainer").hide();
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
        image: ["../images/Yellowcard.gif"],
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
        image: ["../images/wonderyears.gif"],
        correct: 1,
        correctAnswer: "The Wonder Years"
    }, {

        question: "You said nothing in this world could ever make you feel better than I do",
        choices: [
            "Monkeyfoot",
            "Dogfish",
            "Zebrahead",
            "CatDog",
        ],
        image: ["../images/zebrahead.gif"],
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
        image: ["../images/bowlingforsoup.gif"],
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
        image: ["../images/mxpx.gif"],
        correct: 3,
        correctAnswer: "MxPx"
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
            $("body").append($("<div />", {
                text: "Unanswered: " + (
                    trivia.questions.length - (trivia.answers.correct + trivia.answers.incorrect)),
                class: "result"
            }));
            $("#start").text("Play Again?").appendTo(".questionContainer").show();

        }
    };

    trivia.stopwatch = function () {
        trivia.count--;
        if (trivia.count <= 9) {
            $("#timer").html("Time left: " + "00:0" + trivia.count);
        }
        if (trivia.count <= 0) {
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
        trivia.count = 30;
        $("#timer").html("");
        setTimeout(function () {
            trivia.reset();
            trivia.questionAsked();
        }, 1000)
    };

    trivia.reset = function () {
        $(".answersContainer").html("");
        // $("div[id]").each(function (item) {
        //     $(this).html("");
        // });
        $("#wins").html("Correct Answers: " + trivia.answers.correct);
        console.log(trivia.answers.correct);
        $("#losses").html("Incorrect Answers: " + trivia.answers.incorrect);
        console.log("Answers Incorrect: " + trivia.answers.incorrect);
    };

    trivia.answer = function (correct) {
        var string = correct ? "correct" : "incorrect";
        trivia.answers[string]++;
        $("." + string).html(string + " answers: " + trivia.answers[string]);
    };

    return trivia;

};


var game;

$("#start").on("click", function () {
    $(this).hide();
    $(".timerContainer").show();
    $(".questionContainer").show();
    $(".answersContainer").show();
    $(".winsContainer").show();
    setInterval(function () {
        $(".winsContainer").hide();
    }, 3000)
    game = triviaGame();
    game.questionAsked();
    console.log(game.questionAsked);
});

$(".answersContainer").on("click", "button", function () {
    console.log("answers container clicked");
    var userChoice = $(this).data("id"),
        trivia = game,
        index = trivia.questions[trivia.currentQuestion].correct,
        correct = trivia.questions[trivia.currentQuestion].choices[index];

    if (userChoice !== index) {
        console.log("Wrong answer");
        $(".alertContainer").text("Umm, try " + trivia.questions[currentQuestion].correctAnswer);
        console.log(trivia.questions[currentQuestion].correctAnswer);
        trivia.answer(false);
    } else {
        console.log("Right Answer");
        $(".alertContainer").text("Rock on! You got it!");
        trivia.answer(true);
    }
    trivia.nextQuestion();
});

