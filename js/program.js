// constants: colours
var miss = "#f24e4e";
var bad = "#f79696";
var ok = "#dee7d5";
var good = "#abc394";
var great = "#85a863";
var unpressed = "#ffffff";

// global variables
// state of left/right buttons, whether or not an event listener is attached
var leftAttached = "false";
var rightAttached = "false";


var playNote = function(hand) {
    var startTime = new Date().getTime();
    
    if (hand === "left") {

        // remove previous event listeners
        if (leftAttached) {
            $(document).off("keydown", leftEventListener.bind(leftEventListener, startTime));
            leftAttached = "false";
        }

        playSound("left_hand_audio");
        console.log("triplet eighth");
        $(document).on("keydown", leftEventListener.bind(leftEventListener, startTime));

    } else if (hand === "right") {

        playSound("right_hand_audio");
        console.log("sixteenth");

        // fill in event listener stuff

    }


}

var leftEventListener = function(startTime) {
    leftAttached = "true";

    if(event.keyCode == 70) {
        console.log("left was pressed");
        var currentTime = new Date().getTime();
        var timeElapsed = currentTime - startTime;
        // calculateScore(timeElapsed, hand)
        console.log(timeElapsed);
    }
};



var calculateScore = function (timeElapsed, hand) {
    var score;




    return score;
};

var playSound = function (sound_type) {
    var sound = document.getElementById(sound_type);
    sound.play()
};

var setColor = function (btn, color) {
    var property = document.getElementById(btn);
    property.style.backgroundColor = color;
};

var removeText = function (btn) {
    var property = document.getElementById(btn);
    property.style.display = "none";
};

var restoreText = function (btn) {
    var property = document.getElementById(btn);
    property.style.display = "inline";
};

// left should be 555.55556
var leftTimer = setInterval(function() { playNote("left") }, 2000);
// var rightTimer = setInterval(function() { playNote("right") }, 416.666667);
