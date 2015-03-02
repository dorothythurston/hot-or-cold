$(document).ready(function () {
  $('#new-game').click(function(event) {
    event.preventDefault();
    $('form').show( 300 );
    $('#new-game').hide( 300 );
    $('p').text("guess a number between 1 and 50");

    var guessList = [];
    var secretNum = Math.floor((Math.random() * 50) + 1);

    $('form').submit(function(event){
      event.preventDefault();
      var newGuess = parseInt($('input').val());

      var inputGuessed = function(num,array) {
        for (var i = 0; i < array.length; i++) {
          if (num === array[i]) {
            return true
          }
        }
      };

      var colorFeedback = function(secretNum, newGuess) {
        var difference = Math.abs(secretNum - newGuess);

        if (difference <= 50 && difference > 40) {
          $('.main-container').css("background-color", "light-blue");
        }
        else if (difference <= 40  && difference > 30 ) {
          $('.main-container').css("background-color", "blue");
        }
        else if (difference <= 30  && difference > 20 ) {
          $('.main-container').css("background-color", "navy");
        }
        else if (difference <= 20  && difference > 10 ) {
          $('.main-container').css("background-color", "purple");
        }
        else if (difference <= 10  && difference > 5 ) {
          $('.main-container').css("background-color", "magenta");
        }
        else if (difference <= 5  && difference > 0 ) {
          $('.main-container').css("background-color", "red");
        }
        else {
          $('.main-container').css("background-color", "green");
        }
      };


      var compareCloseness = function(secretNum, newGuess) {
        var lastGuess = guessList[(guessList.length-1)];

        if (lastGuess) {
          if (inputGuessed (newGuess , guessList)) {
            $('ul').prepend("<li>you already guessed " + newGuess + "</li>");
          }
          else if (Math.abs(secretNum - newGuess) < Math.abs(secretNum - lastGuess)) {
              $('ul').prepend("<li>" + newGuess + " is warmer than " + lastGuess + "</li>");
          }
          else {
            $('ul').prepend("<li>" + newGuess + " is colder than " + lastGuess + "</li>");
          }
        }
      };

      var displayResults = function (newGuess, guessList, secretNum) {
        if (newGuess === secretNum) {
            $('p').text("You got it!");
            $('.main-container').css("background-color", "green");
            $('form').hide( 300 );
            $('#new-game').show( 300 );
            $('h3').text("");
            $('ul').text("");
            $('#user-input').val("");
        }
        else {
            colorFeedback(secretNum, newGuess);
            compareCloseness(secretNum, newGuess);
            guessList.push(newGuess);
        }
      };

      displayResults(newGuess, guessList, secretNum);
    });
  });
});
