function CGameOver(iX,iY){
    var _oMsgText;
    var _oMsgTextStroke;
    var _oScoreText;
    var _oScoreTextStroke;
    var _oButPlayAgain;
    var _oButBackHome;
    var _oContainer;
    
    this._init = function(iX,iY){
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oContainer.x = iX;
        _oContainer.y = iY;
        s_oStage.addChild(_oContainer);

	var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oMsgTextStroke = new createjs.Text(TEXT_GAMEOVER ,"80px "+FONT_GAME, "#403e39");
        _oMsgTextStroke.x = CANVAS_WIDTH/2;
        _oMsgTextStroke.y = 840;
        _oMsgTextStroke.outline = 4;
        _oMsgTextStroke.textAlign = "center";
	_oMsgTextStroke.textBaseline  = "alphabetic";
        _oContainer.addChild(_oMsgTextStroke);
        
        _oMsgText = new createjs.Text(TEXT_GAMEOVER ,"80px "+FONT_GAME, "#ffff21");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = 840;
        _oMsgText.textAlign = "center";
	_oMsgText.textBaseline  = "alphabetic";
        _oContainer.addChild(_oMsgText);

        _oScoreTextStroke  = new createjs.Text(TEXT_SCORE +":\n0" ,"100px "+FONT_GAME, "#403e39");
        _oScoreTextStroke.x = CANVAS_WIDTH/2;
        _oScoreTextStroke.y = 1040;
        _oScoreTextStroke.outline = 5;
        _oScoreTextStroke.textAlign = "center";
	_oScoreTextStroke.textBaseline  = "alphabetic";
        _oContainer.addChild(_oScoreTextStroke);
        
        _oScoreText = new createjs.Text(TEXT_SCORE +":\n0","100px "+FONT_GAME, "#ffff21");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = 1040;
        _oScoreText.textAlign = "center";
	_oScoreText.textBaseline  = "alphabetic";
        _oContainer.addChild(_oScoreText);

	_oButPlayAgain = new CGfxButton(860,1340,s_oSpriteLibrary.getSprite('but_play_again'),_oContainer);
        _oButPlayAgain.addEventListener(ON_MOUSE_UP, this.onButPlayAgainRelease, this);
		
	_oButBackHome = new CGfxButton(540,1340,s_oSpriteLibrary.getSprite('but_back_home'),_oContainer);
        _oButBackHome.addEventListener(ON_MOUSE_UP, this._onButBackHomeRelease, this);
        
    };
    
    this.show = function(iScore){
        _oScoreText.text = TEXT_SCORE +":\n"+iScore;
        _oScoreTextStroke.text = TEXT_SCORE +":\n"+iScore;
        
	createjs.Tween.get(_oContainer).to({alpha:1}, 500);
        
        setVolume(s_oSoundTrack,1);
        
        $(s_oMain).trigger("save_score",iScore);
    };
    
    this._onButBackHomeRelease = function(){
        s_oGame.onExit();
    };
	
    this.onButPlayAgainRelease = function(){
        _oContainer.alpha = 0;
        s_oGame.unload();
        s_oMain.gotoGame();
    };
    
    this.isVisible = function(){
        return _oContainer.alpha===0?false:true;
    };
	
    this._init(iX,iY);
}