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

// progressbar.js from http://progressbarjs.readthedocs.io/en/latest/
var circleOutline = new ProgressBar.Circle(LH_btn, {
    strokeWidth: 2,
    easing: 'linear',
    duration: 555.55556,
    color: '#ffffff',
    trailColor: '#eee',
    trailWidth: 0.5,
    svgStyle: null,
    text: {
        value: 'press f',  
        style: {
            color: '#787878',
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)'
            }
        },
    }
});

var playNote = function(hand) {
    var startTime = new Date().getTime();
    
    if (hand === "left") {

        // remove previous event listeners
        if (leftAttached) {
            $(document).off("keydown.leftNamespace");
            setColor("LH_btn", unpressed);
            // restoreText("LH_btn_text");
            leftAttached = "false";
        }

        circleOutline.animate(1.0, function() {
            console.log('Animation has finished');
        });
        playSound("left_hand_audio");
        console.log("triplet eighth " + new Date().getTime());
        $(document).on("keydown.leftNamespace", leftEventListener.bind(leftEventListener, startTime));

    } else if (hand === "right") {

        // remove previous event listeners
        if (rightAttached) {
            $(document).off("keydown.rightNamespace");
            setColor("RH_btn", unpressed);
            // restoreText("RH_btn_text");
            rightAttached = "false";
        }

        playSound("right_hand_audio");
        console.log("sixteenth " + new Date().getTime());
        $(document).on("keydown.rightNamespace", rightEventListener.bind(rightEventListener, startTime));

    }


}

var leftEventListener = function(startTime) {
    leftAttached = "true";

    if(event.keyCode == 70) {
        console.log("left was pressed");
        var currentTime = new Date().getTime();
        var timeElapsed = currentTime - startTime;
        console.log(timeElapsed);
        var score = calculateScore(timeElapsed)

        setColor("LH_btn", score);
        // removeText("LH_btn_text");
    }
};

var rightEventListener = function(startTime) {
    rightAttached = "true";

    if(event.keyCode == 74) {
        console.log("right was pressed");
        var currentTime = new Date().getTime();
        var timeElapsed = currentTime - startTime;
        console.log(timeElapsed);
        var score = calculateScore(timeElapsed)

        setColor("RH_btn", score);
        // removeText("RH_btn_text");
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
 
var leftTimer = setInterval(function() { playNote("left") }, 555.55556);
// var rightTimer = setInterval(function() { playNote("right") }, 416.666667);
