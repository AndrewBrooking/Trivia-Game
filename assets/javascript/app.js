$(document).ready(function () {
    const initialOffset = 440;
    const maxTime = 30;
    let questionID = 0;
    let time = 30;
    let score = 0;
    let currentMessage = "";
    let timerID;

    displayQuestion();

    // Handle button clicks
    $(".choice").on("click", ".btn", nextQuestion);

    // Displays the current question and possible answers
    function displayQuestion() {
        $("#question").fadeOut(1000, function () {
            $(this).text(queries[questionID].question);
            $(this).fadeIn(1000);
        });

        setTimeout(randomizeChoices, 1000);
        setTimeout(resetTimer, 1250);
    }

    // Shuffles the question choices and adds a button for 
    function randomizeChoices() {
        let choices = queries[questionID].alternates.slice(0, 4);
        choices.push(queries[questionID].answer);
        choices = shuffle(choices);
        let counter = 0;

        let intervalID = setInterval(function () {
            if (counter >= 4) {
                clearInterval(intervalID);
            } else {
                let btn = newButton(choices[counter]);
                counter++;
                $("#choice-" + counter).fadeIn().html(btn);
            }
        }, 500);
    }

    // Creates a new button with a specified value
    function newButton(value) {
        let btn = $("<button>");
        btn.attr("class", "col btn btn-light w-100 mx-auto py-2 slide-up");
        btn.attr("value", value);
        btn.html("<h3>" + value + "</h3>");
        return btn;
    }

    // Checks if correct answer was selected then displays the next question
    function nextQuestion() {
        if ($(this).attr("value") === queries[questionID].answer) {
            score++;
            currentMessage = "Correct!";
        } else {
            currentMessage = "Incorrect!";
        }

        $(".choice").fadeOut(500);
        setTimeout(displayMessage, 500);
        setTimeout(emptyChoices, 500);

        questionID++;

        setTimeout(displayQuestion, 5000);
    }

    function writeTime() {
        $("#timer").text(time);
    }

    // Sets timer back to 30 seconds
    function resetTimer() {
        stopTimer();
        time = 30;
        writeTime();
        $('.circle_animation').css('stroke-dashoffset', initialOffset - (time * (initialOffset / maxTime)));
        timerID = setInterval(updateTimer, 1000);
    }

    // Sets timer to 5 seconds
    function shortResetTimer() {
        stopTimer();
        time = 5;
        writeTime();
        $('.circle_animation').css('stroke-dashoffset', initialOffset - (time * (initialOffset / maxTime)));
        timerID = setInterval(updateTimer, 1000);
    }

    // Stop interval for the timer
    function stopTimer() {
        clearInterval(timerID);
    }

    function updateTimer() {
        writeTime();

        // Animate timer bar decreasing
        $('.circle_animation').css('stroke-dashoffset', initialOffset - (time * (initialOffset / maxTime)));

        if (time <= 0) {
            stopTimer();
        }

        time--;
    }

    function emptyChoices() {
        $(".choice").empty();
    }

    function displayMessage() {
        $("#score-message").text(currentMessage).fadeIn(500);
        shortResetTimer();

        setTimeout(function() {
            $("#score-message").fadeOut(500);
            $("#score-message").empty();
        }, 5000);
    }

    // Implementation of the Fisher-Yates shuffling algorithim
    function shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});