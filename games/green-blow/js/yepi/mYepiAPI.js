
//mYepiAPI_SoundControl("on" / "off") ? set sound on/off.
mYepiAPI_SoundControl = function(sound_on_off){
	console.log("mYepiAPI_SoundControl: " + sound_on_off.toString());
    var app = getBlastballApp();
    if (!app) return;
	if(sound_on_off === "on"){
        app.unmute();
	} else {
        app.mute();
	}	
};

//mYepiAPI_gamePause(on/off) ?  "pause = on", "unpause=off" the game
mYepiAPI_gamePause = function(pause_on_off){
	console.log("mYepiAPI_gamePause: " + pause_on_off.toString());
    var app = getBlastballApp();
    if (!app) return;
	if(pause_on_off === "on"){
        app.pause();
	} else {
        app.unpause();
	}
};


//mYepiAPI_gameRestart() ?  Restart Game, "Play Again"
mYepiAPI_gameRestart = function(){
    console.log("mYepiAPI_gameRestart");
    var app = getBlastballApp();
    if (!app) return;
    window.blastballApp.resetGame();
};


//mYepiAPI_gameResize(w,h) ?  Resize game to fit game's canvas to size of w=wifth, h=height
mYepiAPI_gameResize = function(w,h){
    console.log("mYepiAPI_gameResize [" + w.toString() + "," + h.toString() + "]");
    var app = getBlastballApp();
    if (!app) return;
    app.reqWidth = w;
    app.reqHeight = h;
    app.resizeGame(w, h);
};

getBlastballApp = function() {
    if (window.hasOwnProperty('blastballApp')) return window.blastballApp;
    else if (parent.hasOwnProperty('blastballApp')) return parent.blastballApp;
    else if (top.hasOwnProperty('blastballApp')) return top.blastballApp;
    else console.log('There is no property blastballApp');
};