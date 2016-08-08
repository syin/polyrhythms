// constants: button colours
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
var tempoLeft = 500;
var tempoRight = 375;

var playNote = function(hand) {
    var startTime = new Date().getTime();
    
    if (hand === "left") {

        // remove previous event listeners
        if (leftAttached) {
            $(document).off("keydown.leftNamespace");
            setColor("LH_btn", unpressed);
            restoreText("LH_btn_text");
            leftAttached = "false";
        }

        flashCircle("LH_btn");
        playSound("left_hand_audio");

        // console.log("triplet eighth " + new Date().getTime());
        $(document).on("keydown.leftNamespace", function (e) { leftEventListener(e, startTime); });

    } else if (hand === "right") {

        // remove previous event listeners
        if (rightAttached) {
            $(document).off("keydown.rightNamespace");
            setColor("RH_btn", unpressed);
            restoreText("RH_btn_text");
            rightAttached = "false";
        }

        playSound("right_hand_audio");

        flashCircle("RH_btn");

        // console.log("sixteenth " + new Date().getTime());
        $(document).on("keydown.rightNamespace", function (e) { rightEventListener(e, startTime); });

    }


}

var leftEventListener = function(e, startTime) {
    leftAttached = "true";

    if(e.keyCode == 70) {
        // console.log("left was pressed " + timeElapsed);
        var currentTime = new Date().getTime();
        var timeElapsed = currentTime - startTime;
        var score = calculateScore(timeElapsed)

        setColor("LH_btn", score);
        removeText("LH_btn_text");
    }
};

var rightEventListener = function(e, startTime) {
    rightAttached = "true";

    if(e.keyCode == 74) {
        // console.log("right was pressed " + timeElapsed);
        var currentTime = new Date().getTime();
        var timeElapsed = currentTime - startTime;
        var score = calculateScore(timeElapsed)

        setColor("RH_btn", score);
        removeText("RH_btn_text");
    }
};

var calculateScore = function (timeElapsed) {
    var score;

    if (timeElapsed < 70) {
        score = great;
    } else if (timeElapsed < 140) {
        score = good;
    } else if (timeElapsed < 210) {
        score = ok;
    } else if (timeElapsed < 280) {
        score = bad;
    } else {
        score = miss;
    }

    return score;
};

var playSound = function (soundType) {
    var sound = document.getElementById(soundType);
    sound.play()
};

var flashCircle = function (circleID) {
    var property = document.getElementById(circleID);
    property.style.border = '4px solid #fff';
    setTimeout(function(){unflashCircle(circleID)}, 100);
};

var unflashCircle = function (circleID) {
    var property = document.getElementById(circleID);
    property.style.border = '4px solid #787878';
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

var changeTempo = function (input) {

    if (input.value < 24) input.value = 24;
    if (input.value > 208) input.value = 208;

    tempoLeft = 1000 / ((input.value / 60) * 3); // triplet eighths
    tempoRight = 1000 / ((input.value / 60) * 4); // sixteenths

    if (leftTimer) clearInterval(leftTimer);
    leftTimer = setInterval(function() { playNote("left") }, tempoLeft);

    if (rightTimer) clearInterval(rightTimer);
    rightTimer = setInterval(function() { playNote("right") }, tempoRight);

};

function is_touch_device() {
    // http://stackoverflow.com/a/4819886
    return 'ontouchstart' in window        // works on most browsers 
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

var detectMobile = function () {
    if (is_touch_device()) {
        document.getElementById("mobile-note").style.display = 'block';

        close = document.getElementById("close");
        close.addEventListener('click', function() {
            document.getElementById("mobile-note").style.display = 'none';
        }, false);
    }
};

detectMobile();
var leftTimer = setInterval(function() { playNote("left") }, tempoLeft);
var rightTimer = setInterval(function() { playNote("right") }, tempoRight);
