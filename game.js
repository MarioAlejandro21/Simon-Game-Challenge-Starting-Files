//VARIABLES

const buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var gameOn = false;
var inputIndex = 0;


//METHODS

//Play animation for selected button
function animatePress(id) {
    const timeFade = 50;
    $('#'+ id).toggleClass('pressed');
    setTimeout(function () {
        $('#'+ id).toggleClass('pressed');
    }, 100);
    
}

//Play sound for selected button
var sound = new Audio('sounds/blue.mp3');
function playSound(id) {
    sound.src = 'sounds/' + id + '.mp3';
    sound.play()
}

//Delayed animate and press
function playButton(id, delay = 0) {
    setTimeout(function() {
        animatePress(id);
        playSound(id);
    }, delay);
}

//Increase random computer sequence
function nextSequence(delay = 500) {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playButton(randomChosenColour, delay);
}

//Add user clicked pattern
function animateUserClick(id) {
    playSound(id);
    animatePress(id);
}

//Check pressed button
function checkAnswer(colour) {
    
    if (gamePattern[inputIndex] === colour){
        //Play pressed button    
        playButton(colour);
        //Move index one position
        inputIndex++;
        //Checks if it's the last click to compare
        if (inputIndex == gamePattern.length){
            //Restores index for new Level
            inputIndex = 0;
            //Play the next button to remember
            nextSequence();
            //Changes the title to the next level
            $('h1').text(`Level ${gamePattern.length}`);
        }
        
    } else {
        
        $('h1').text('Game Over');
        $('h1').addClass('game-over');
        gameOn = false;
        gamePattern = [];
        inputIndex = 0;
        playSound('wrong');
    }
}


//LISTENERS

//User preses a key
$('body').keydown(function (e) { 
    if (gameOn === false){
        $('h1').removeClass('game-over');
        //Flag to abilitate user clicks and start game
        gameOn = true;
        //Change h1 to Level 1
        $('h1').text('Level 1');
        //Play the first button
        nextSequence();
    }
    
});

//User clicks a button
$('.btn').click(function (e) { 
    e.preventDefault();
    // Check if the game level is superior to 0
    if (gameOn) {
        checkAnswer(this.id);
    }
});