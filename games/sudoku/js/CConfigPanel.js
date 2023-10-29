function CConfigPanel(){
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _oText1;
    var _oText2;
    var _oText3;
    var _oText4;
    var _oText5;
    var _oText6;
    var _oText7;

    var _oHelpBg;
    var _oGroup;
    var _oParent;
    var _oButHelp;
    var _oButDel;
    var _oButSolve;
    var _oButReset;
    var _oButTime;
    var _oButHint;
    var _oButFullscreen;
    
    var _oHelp1Container;
    var _oHelp2Container;
    var _oHelp3Container;
    var _oHelp4Container;
    var _oHelp5Container;
    var _oHelp6Container;
    var _oHelp7Container;

    this._init = function(){
        s_oGame.pauseTimer(true);
        
        var oButtonX = 750;
        
        var oParent = this;
        _oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));        
        
        _oHelp1Container = new createjs.Container();
        _oHelp1Container.x = 130;
        _oHelp1Container.y = 430;
        s_oStage.addChild(_oHelp1Container);
  
        _oText1 = new createjs.Text(TEXT_GETHINT," 50px "+SECONDARY_FONT, "#008df0");
        _oText1.textAlign = "left";
        _oText1.textBaseline = "alphabetic";
        _oText1.lineWidth = 700;                  
        
        _oHelp1Container.addChild(_oText1);
       
        var oSprite = s_oSpriteLibrary.getSprite('but_help_hint');
        _oButHint = new CGfxButton(oButtonX, 0,oSprite,_oHelp1Container);
        _oButHint.addEventListener(ON_MOUSE_UP, this._onHintPress, this); 
       
        
  
        //////////////////////////////////////////////////////////////////
        
        _oHelp2Container = new createjs.Container();
        _oHelp2Container.x = 130;
        _oHelp2Container.y = 600;
        s_oStage.addChild(_oHelp2Container);
  
        _oText2 = new createjs.Text(TEXT_FILL_WITH_NOTE," 50px "+SECONDARY_FONT, "#008df0");
        _oText2.textAlign = "left";
        _oText2.textBaseline = "alphabetic";
        _oText2.lineWidth = 700;                    
        
        _oHelp2Container.addChild(_oText2);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_help_note');
        _oButHelp = new CGfxButton(oButtonX, 0,oSprite,_oHelp2Container);
        _oButHelp.addEventListener(ON_MOUSE_UP, this._onHelpPress, this); 
     
         //////////////////////////////////////////////////////////////////
        
        _oHelp3Container = new createjs.Container();
        _oHelp3Container.x = 130;
        _oHelp3Container.y = 770;
        s_oStage.addChild(_oHelp3Container);
  
        _oText3 = new createjs.Text(TEXT_SOLVE," 50px "+SECONDARY_FONT, "#008df0");
        _oText3.textAlign = "left";
        _oText3.textBaseline = "alphabetic";
        _oText3.lineWidth = 700;                    
        
        _oHelp3Container.addChild(_oText3);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_solve');
        _oButSolve = new CGfxButton(oButtonX, 0,oSprite,_oHelp3Container);
        _oButSolve.addEventListener(ON_MOUSE_UP, this._onSolvePress, this);
        
         //////////////////////////////////////////////////////////////////
        
        _oHelp4Container = new createjs.Container();
        _oHelp4Container.x = 130;
        _oHelp4Container.y = 1210;
        s_oStage.addChild(_oHelp4Container);
  
        _oText4 = new createjs.Text(TEXT_RESET," 50px "+SECONDARY_FONT, "#008df0");
        _oText4.textAlign = "left";
        _oText4.textBaseline = "alphabetic";
        _oText4.lineWidth = 700;                    
        
        _oHelp4Container.addChild(_oText4);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_reset');
        _oButReset = new CGfxButton(oButtonX, 0,oSprite,_oHelp4Container);
        _oButReset.addEventListener(ON_MOUSE_UP, this._onResetPress, this);
        
        //////////////////////////////////////////////////////////////////
        
        _oHelp5Container = new createjs.Container();
        _oHelp5Container.x = 130;
        _oHelp5Container.y = 1390;
        s_oStage.addChild(_oHelp5Container);
  
        _oText5 = new createjs.Text(TEXT_DELETE_ALL_NOTE," 50px "+SECONDARY_FONT, "#008df0");
        _oText5.textAlign = "left";
        _oText5.textBaseline = "alphabetic";
        _oText5.lineWidth = 700;                    
        
        _oHelp5Container.addChild(_oText5);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_del_note');
        _oButDel = new CGfxButton(oButtonX, 0,oSprite,_oHelp5Container);
        _oButDel.addEventListener(ON_MOUSE_UP, this._onDelPress, this); 
                
        //////////////////////////////////////////////////////////////////
        
        _oHelp6Container = new createjs.Container();
        _oHelp6Container.x = 130;
        _oHelp6Container.y = 1570;
        s_oStage.addChild(_oHelp6Container);
  
        _oText6 = new createjs.Text(TEXT_SETNOTIME," 50px "+SECONDARY_FONT, "#008df0");
        _oText6.textAlign = "left";
        _oText6.textBaseline = "alphabetic";
        _oText6.lineWidth = 700;                       
        
        _oHelp6Container.addChild(_oText6);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_time');
        _oButTime = new CGfxButton(oButtonX, 0,oSprite,_oHelp6Container);
        _oButTime.addEventListener(ON_MOUSE_UP, this._onTimePress, this);
        
        //////////////////////////////////////////////////////////////////
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        _oHelp7Container = new createjs.Container();
        _oHelp7Container.x = 130;
        _oHelp7Container.y = 1030;
        s_oStage.addChild(_oHelp7Container);
            
        if (_fRequestFullScreen && inIframe() === false){
            _oText7 = new createjs.Text(TEXT_FULLSCREEN," 50px "+SECONDARY_FONT, "#008df0");
            _oText7.textAlign = "left";
            _oText7.textBaseline = "alphabetic";
            _oText7.lineWidth = 700;                       

            _oHelp7Container.addChild(_oText7);
            
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _oButFullscreen = new CToggle(oButtonX,0,oSprite,s_bFullscreen,_oHelp7Container);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        
                     
        _oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg, _oHelp1Container, _oHelp2Container, _oHelp3Container, _oHelp4Container, _oHelp5Container, _oHelp6Container,_oHelp7Container);
        s_oStage.addChild(_oGroup);     
        
        _oHelpBg.on("pressup",function(){oParent._onExitHelp();});
        
        
    };

    this.unload = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        s_oStage.removeChild(_oGroup);
        var oParent = this;        
        _oHelpBg.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onHelpPress = function(){
        s_oGame.fillWithNote();
        _oParent._onExitHelp();
    };
    
    this._onDelPress = function(){
        s_oGame.deleteAllNote();
        _oParent._onExitHelp();
    };

    this._onSolvePress = function(){
        s_oGame.solveAndWrite();
        _oParent.unload();
    };
    
    this._onResetPress = function(){
        $(s_oMain).trigger("restart_level",1);
        s_oGame.resetGame();
        _oParent._onExitHelp();
    };
    
    this._onTimePress = function(){
        s_oGame.setNoTime();
        _oParent._onExitHelp();
    };    

    this._onHintPress = function(){
        s_oGame.getHint();
        _oParent._onExitHelp();
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    this._onExitHelp = function(){
        _oParent.unload();
        s_oGame.pauseTimer(false);
    };
    
    _oParent=this;
    this._init();

}


