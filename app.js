$(document).ready(function () {
  $('#new-game').click(function(event) {
    event.preventDefault();
    $('form').show( 300 );
    $('#new-game').hide( 300 );
    $('p').text("guess a number between 1 and 100");

    var maxGuess = 100
    var secretNum = Math.floor((Math.random() * maxGuess) + 1);
    var guessList = [];


    $('form').unbind('submit').submit(function(event){
      event.preventDefault();

      var newGuess = parseInt($('input').val());

      var inputGuessed = function(num,array) {
        for (var i = 0; i < array.length; i++) {
          if (num === array[i]) {
            return true
          }
        }
      };

      var compareCloseness = function() {
        var lastGuess = guessList[(guessList.length-1)];

        if (guessList.length < 1) {
          $('ul').prepend("<li>nope. it's not " + newGuess + "</li>");
        }
        else if (lastGuess) {
          if (inputGuessed (newGuess , guessList)) {
            $('ul').prepend("<li>you already guessed " + newGuess + "</li>");
          }
          else if (Math.abs(secretNum - newGuess) < Math.abs(secretNum - lastGuess)) {
              $('ul').prepend("<li>" + newGuess + " is <span class='warm'>warmer</span> than " + lastGuess + "</li>");
          }
          else {
            $('ul').prepend("<li>" + newGuess + " is <span class='cold'>colder</span> than " + lastGuess + "</li>");
          }
        }
      };

      var clearGuessList = function (){
        while(guessList.length > 0) {
          guessList.pop();
        }
      }

      var displayResults = function () {
        if (newGuess === secretNum) {
            $('p').text("You got it!");
            $('form').hide( 300 );
            $('#new-game').show( 300 );
            $('h3').text("");
            $('ul').text("");
            $('#user-input').val("");
            console.log(guessList);
            console.log(secretNum);

            clearGuessList();
        }
        else {
            compareCloseness(secretNum, newGuess);
            guessList.push(newGuess);
        }
      };

      displayResults();
    });
  });
});
