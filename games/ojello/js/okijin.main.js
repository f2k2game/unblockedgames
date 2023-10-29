///////////////////////////////////////////////////////////////////////////////
// file okijin.main.js
// Copyright (c) 2015 Frédéric J. Rézeau. All rights reserved.
///////////////////////////////////////////////////////////////////////////////

// Document has loaded.
$(document).ready(function () {
    "use strict";

    // Supported game events.

    var onGameLoading = function (percent) {
        // Event called when game is loading.
        // Example use:
        // console.log("Loading " + percent + "%");
    };

    var onGameSessionStarted = function (session) {
        // Event called when a new level has started.
        // Example use:
        // console.log("Started level " + session.level);
        window.dispatchEvent(new CustomEvent('BoredButtonStarted'));
    };

    var onGameSessionEnded = function (session) {
        // Event called when a level has ended.
        // Example use:
        // console.log("Ended level " + session.level + ", status: " + ((session.score === 1) ? "passed" : "failed"));
        window.dispatchEvent(new CustomEvent('BoredButtonGameOver'));
    };

    // Initialize the game.
    var settings = {
        "root": "ojello",
        "onGameLoading": onGameLoading,
        "onGameSessionStarted": onGameSessionStarted,
        "onGameSessionEnded": onGameSessionEnded,
        "useHighResolution": (categorizr.isDesktop ? true : false)
    };
    OkijinGame.initialize(settings);

    // Display the game.
    $("#canvas").fadeIn();
});

// Window is resized.
$(window).resize(function () {
    "use strict";
    if (OkijinGame.getCurrentGameState()) {
        // Reset the display.
        OkijinGame.resetDisplay();
    }
});

// Prevent scrolling when moving.
$(document).on("touchmove", function (e) {
    "use strict";
    e.preventDefault();
});

// Provides requestAnimationFrame in a cross browser way. @author paulirish / http://paulirish.com/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        "use strict";
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}
