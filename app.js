$(document).ready(function () {
  var makeSecretNum =  function () {
    return Math.floor((Math.random() * 5) + 1);
  }
  var guessList = [];

  $('#new-game').click(function(event) {
    event.preventDefault();
    $('form').show( 300 );
    $('#new-game').hide( 300 );
    $('p').text("guess a number between 1 and 10");

    var secretNum = makeSecretNum();

    $('form').submit(function(event){
      event.preventDefault();
      var grabUserInput = $('input').val();
      var userInput = parseInt(grabUserInput);

      var checkInput = function(num,array) {
        for (var i = 0; i < array.length; i++) {
          if (num === array[i]) {
            return true
          }
        }
      };

      var checkDifference = function(num, guess) {
        var difference = Math.abs(num - guess);

        if (difference >= 6 && difference <= 10) {
          $('.main-container').css("background-color", "blue");
        }
        else if (difference > 2 && difference <= 5 ) {
          $('.main-container').css("background-color", "red");
        }
        else {
          $('.main-container').css("background-color", "orange");
        }
      };


      if (checkInput(userInput , guessList)) {
        $('p').text("you already guessed that");
      }
      else {
        if (userInput === secretNum) {
          $('p').text("yay you got it");
          $('form').hide( 300 );
          $('#new-game').show( 300 );
          $('h3').text("");
          guessList = [];

        }
        else {
          checkDifference(secretNum, userInput);
          guessList.push(userInput);
          $('p').text("boo that's not right");
          $('h3').text(guessList);
        }
      }
    });
  });
});
