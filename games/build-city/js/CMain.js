function CMain(oData){
    var _bUpdate = true;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oHelp;
    var _oMenu;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas); 
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.soundLoaded = function(){
         _iCurResource++;
         var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this.removePreloader();
        }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound("./sounds/bonus.ogg", "bonus");
                createjs.Sound.registerSound("./sounds/end_level.ogg", "end_level");
                createjs.Sound.registerSound("./sounds/fall_fail.ogg", "fall_fail");
                createjs.Sound.registerSound("./sounds/fall_ok.ogg", "fall_ok");
                createjs.Sound.registerSound("./sounds/click.ogg", "click");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/bonus.mp3", "bonus");
                createjs.Sound.registerSound("./sounds/end_level.mp3", "end_level");
                createjs.Sound.registerSound("./sounds/fall_fail.mp3", "fall_fail");
                createjs.Sound.registerSound("./sounds/fall_ok.mp3", "fall_ok");
                createjs.Sound.registerSound("./sounds/click.mp3", "click");
        }
        RESOURCE_TO_LOAD += 6;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bonus","./sprites/bonus.png");
        s_oSpriteLibrary.addSprite("hook","./sprites/hook.png");
        s_oSpriteLibrary.addSprite("crane","./sprites/crane.png");
        s_oSpriteLibrary.addSprite("block1","./sprites/block1.png");
        s_oSpriteLibrary.addSprite("block2","./sprites/block2.png");
        s_oSpriteLibrary.addSprite("block3","./sprites/block3.png");
        s_oSpriteLibrary.addSprite("but_back_home","./sprites/but_back_home.png");
        s_oSpriteLibrary.addSprite("but_play_again","./sprites/but_play_again.png");
        s_oSpriteLibrary.addSprite("but_start","./sprites/but_start.png");
        s_oSpriteLibrary.addSprite("hit_area","./sprites/hit_area.png");
        s_oSpriteLibrary.addSprite("game_bg","./sprites/game_bg.jpg");
        s_oSpriteLibrary.addSprite("perfect_landing","./sprites/perfect_landing.png");
        s_oSpriteLibrary.addSprite("logo","./sprites/logo.png");
        s_oSpriteLibrary.addSprite("exit_button","./sprites/exit_button.png");
        s_oSpriteLibrary.addSprite("bird","./sprites/bird.png");
        s_oSpriteLibrary.addSprite("cloud_1","./sprites/cloud_1.png");
        s_oSpriteLibrary.addSprite("cloud_2","./sprites/cloud_2.png");
        s_oSpriteLibrary.addSprite("cloud_3","./sprites/cloud_3.png");
        s_oSpriteLibrary.addSprite("cloud_4","./sprites/cloud_4.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("information_panel","./sprites/information_panel.png");
        s_oSpriteLibrary.addSprite("floor_icon","./sprites/floor_icon.png");
        s_oSpriteLibrary.addSprite("help1","./sprites/help1.jpg");
        s_oSpriteLibrary.addSprite("help2","./sprites/help2.png");
        s_oSpriteLibrary.addSprite("trajectory","./sprites/trajectory.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this.removePreloader();
        }
    };
    
    this.preloaderReady = function(){
        this._loadImages();
		
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
    };
    
    this.removePreloader = function(){
        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack",0.5,-1);                                    
        
        this.gotoMenu();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        if(s_bAudioActive === true){
            createjs.Sound.setMute(true);
        }
        
        if(s_oGame !== null){
            s_oGame.stopUpdate();
        }
        
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
    };

    this.startUpdate = function(){
        if(s_bAudioActive){
            createjs.Sound.setMute(false);
        }
        
        s_iPrevTime = new Date().getTime();
        if(s_oGame !== null){
            s_oGame.startUpdate();
        }
        
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
    };

    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    _oData = oData;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;