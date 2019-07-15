$(document).ready(function () {
    let questionID = 0;
    let correct = 0;

    displayQuestion();

    function displayQuestion() {
        $("#question").fadeOut(1000, function () {
            $(this).text(queries[questionID].question);
            $(this).fadeIn(1000);
        });

        setTimeout(randomizeChoices, 1000);
    }

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
                $("#choice-" + counter).html(btn);
            }
        }, 750);
    }

    function newButton(value) {
        let btn = $("<button>");
        btn.attr("class", "col btn btn-light w-100 mx-auto py-2 slide-up");
        btn.attr("value", value);
        btn.html("<h3>" + value + "</h3>");
        return btn;
    }

    // Implementation of the Fisher-Yates shuffling algorithim
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

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