function CMenu(){
    var _pStartPosAudio;
    var _pStartPosLogo;
    
    var _oBg;
    var _oButPlay;
    var _oLogo;
    var _oFade;
    var _oAudioToggle;
    
    this._init = function(){
        _pStartPosLogo = {x:20,y:20};
        
        _oBg = new createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        _oLogo = new createBitmap(s_oSpriteLibrary.getSprite('logo'));
        _oLogo.x = _pStartPosLogo.x;
        _oLogo.y = _pStartPosLogo.y; 
        s_oStage.addChild(_oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_start');
        _oButPlay = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT/2 - 90,oSprite,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};   
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,true);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			
            if(s_oSoundTrack === null){
                s_oSoundTrack = playSound("soundtrack",0.5,-1);         
            }else{
                setVolume(s_oSoundTrack,1);
            }
			 
        }
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
        
        if(s_bMobile === false){
            document.onkeydown   = onKeyDown; 
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }   
        
        _oLogo.x = _pStartPosLogo.x + iNewX;
        _oLogo.y = _pStartPosLogo.y + iNewY;
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    function onKeyDown(evt) { 
        if(!evt){ 
            evt = window.event; 
        }  

        switch(evt.keyCode) {  
           // spacebar  
           case 32: {
                   s_oMenu._onButPlayRelease();
                   break; 
               }
        }  
        evt.preventDefault();
        return false;
    }
    
    this._onButPlayRelease = function(){
        s_oMenu.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session");
    };
	
    s_oMenu = this;
        
    this._init();
}

var s_oMenu = null;