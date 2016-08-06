// constants: colours
var miss = "#f24e4e";
var bad = "#f57e7e";
var ok = "#fef5f5";
var good = "#d1dec5";
var great = "#abc394";
var unpressed = "#ffffff";

document.addEventListener("keydown", function(event) {
    if(event.keyCode == 70) {
        console.log("Left was pressed");
        setColor("LH_btn", miss);
        removeText("LH_btn_text");

        document.addEventListener("keyup", function onKeyup() {
            document.removeEventListener("keyup", onKeyup);
            setColor("LH_btn", unpressed);
            restoreText("LH_btn_text");
        }, false);

    }
    else if(event.keyCode == 74) {
        console.log("Right was pressed");
        setColor("RH_btn", miss);
        removeText("RH_btn_text");

        document.addEventListener("keyup", function onKeyup() {
            document.removeEventListener("keyup", onKeyup);
            setColor("RH_btn", unpressed);
            restoreText("RH_btn_text");
        }, false);
    }
});


setInterval(function() {
    playSound("left_hand_audio");
    console.log("triplet eighth");
}, 555.55556);

setInterval(function() {
    console.log("sixteenth");
    playSound("right_hand_audio");
}, 416.666667);

var calculateScore = function calculateScore() {
    // TODO
};

var playSound = function playSound(sound_type) {
    var sound = document.getElementById(sound_type);
    sound.play()
};

var setColor = function setColor(btn, color) {
    var property = document.getElementById(btn);
    property.style.backgroundColor = color;
};

var removeText = function removeText(btn) {
    var property = document.getElementById(btn);
    property.style.display = "none";
};

var resoreText = function restoreText(btn) {
    var property = document.getElementById(btn);
    property.style.display = "inline";
};