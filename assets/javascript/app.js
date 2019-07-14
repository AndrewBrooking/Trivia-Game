$(document).ready(function() {
    let questionID = 0;
    let correct = 0;

    function newButton(value) {
        let btn = $("<button>");
        btn.attr("class", "col btn btn-light w-100 mx-auto py-2");
        btn.attr("value", value);
        btn.html("<h3>" + value + "</h3>");
        return btn;
    }
});