$(document).ready(function () {
    // Constants
    const initialOffset = 440;
    const maxTime = 30;

    // Variables
    let questionID = 0;
    let time = 30;
    let score = 0;
    let currentMessage = "";
    let shortTimer = false;
    let timerID = 0;

    // Initial display of question
    displayQuestion();

    // Handle button clicks
    $(".choice").on("click", ".btn", function() {
        nextQuestion($(this).attr("value"));
    });

    function fadeOutElement(element, duration) {
        $(element).fadeOut(duration);
    }

    function fadeInElement(element, duration) {
        $(element).fadeIn(duration);
    }

    // Displays the current question and possible answers
    function displayQuestion() {
        let qText = "#question";
        fadeOutElement(qText, 1000);
        
        setTimeout(function() {
            $(qText).text(queries[questionID].question);
        }, 1000);

        setTimeout(function() {
            fadeInElement(qText, 1000);
        }, 1000);

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
    function nextQuestion(value) {
        if (value === queries[questionID].answer) {
            score++;
            currentMessage = "Correct!";
        } else if (value === "timeout") {
            currentMessage = "Time expired!"
        } else {
            currentMessage = "Incorrect!";
        }

        fadeOutElement(".choice", 500);
        setTimeout(displayMessage, 500);
        setTimeout(emptyChoices, 500);
        setTimeout(function() {
            fadeOutElement("#message", 1000);
        }, 5000);

        questionID++;

        if (questionID >= queries.length) {
            stopTimer();
            fadeOutElement("#timer-container", 1000);
            setTimeout(function() {
                currentMessage = score + "/" + queries.length;
                displayMessage();
            }, 5000);
        } else {
            setTimeout(displayQuestion, 5000);
        }
    }

    // Changes the displayed time on the screen
    function writeTime() {
        $("#timer").text(time);
    }

    // Sets timer back to 30 or 5 seconds
    function resetTimer() {
        stopTimer();
        time = shortTimer ? 5: maxTime;
        writeTime();
        updateCircle();
        timerID = setInterval(updateTimer, 1000);
    }

    // Stop interval for the timer
    function stopTimer() {
        clearInterval(timerID);
    }

    // Main update function for the timer
    function updateTimer() {
        writeTime();
        updateCircle();

        time--;

        if (time <= 0) {
            stopTimer();

            if (!shortTimer) {
                nextQuestion("timeout");
            }

            shortTimer = false;
        }
    }

    // Animate timer bar decreasing
    function updateCircle() {
        $('.circle_animation').css('stroke-dashoffset', initialOffset - (time * (initialOffset / maxTime)));
    }

    // Clear choices div
    function emptyChoices() {
        $(".choice").empty();
    }

    // Shows correct/incorrect message
    function displayMessage() {
        $("#message").text(currentMessage);
        fadeInElement("#message", 1000);
        shortTimer = true;
        resetTimer();
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