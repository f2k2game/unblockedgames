function CHelpPanel(oParentContainer){
    var _oText1;
    var _oTextStroke1;
    var _oText2;
    var _oTextStroke2;
    
    var _oThis;
    var _oContainer;
    var _oParentContainer;

    this._init = function(){
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        
        var oGraphics = new createjs.Graphics().beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var oFade = new createjs.Shape(oGraphics);
        oFade.alpha = 0.8;
        _oContainer.addChild(oFade);
        
        var oSprite = s_oSpriteLibrary.getSprite('help1');
        var oHelpBg = createBitmap(oSprite);
        oHelpBg.regX = oSprite.width/2;
        oHelpBg.x = CANVAS_WIDTH/2;
        oHelpBg.y = 520;
        _oContainer.addChild(oHelpBg);
        
        oSprite = s_oSpriteLibrary.getSprite('help2');
        oHelpBg = createBitmap(oSprite);
        oHelpBg.regX = oSprite.width/2;
        oHelpBg.x = CANVAS_WIDTH/2 + 50;
        oHelpBg.y = 1400;
        _oContainer.addChild(oHelpBg);
        
        _oTextStroke1 = new createjs.Text(TEXT_HELP1,"60px "+FONT_GAME, "#403e39");
        _oTextStroke1.x = CANVAS_WIDTH/2;
        _oTextStroke1.y = 300;
        _oTextStroke1.textAlign = "center";
        _oTextStroke1.lineWidth = CANVAS_WIDTH - 400;
        _oTextStroke1.outline = 6;
        _oContainer.addChild(_oTextStroke1);
  
        _oText1 = new createjs.Text(TEXT_HELP1,"60px "+FONT_GAME, "#ffff21");
        _oText1.x = CANVAS_WIDTH/2;
        _oText1.y = 300;
        _oText1.textAlign = "center";
        _oText1.lineWidth = CANVAS_WIDTH - 400;
        _oContainer.addChild(_oText1);             
        
        _oTextStroke2 = new createjs.Text(TEXT_HELP2,"60px "+FONT_GAME, "#403e39");
        _oTextStroke2.x = CANVAS_WIDTH/2;
        _oTextStroke2.y = 1270;
        _oTextStroke2.textAlign = "center";
        _oTextStroke2.lineWidth = CANVAS_WIDTH - 400;
        _oTextStroke2.outline = 6;
        _oContainer.addChild(_oTextStroke2);
  
        _oText2 = new createjs.Text(TEXT_HELP2,"60px "+FONT_GAME, "#ffff21");
        _oText2.x = CANVAS_WIDTH/2;
        _oText2.y = 1270;
        _oText2.textAlign = "center";
        _oText2.lineWidth = CANVAS_WIDTH - 400;
        _oContainer.addChild(_oText2);                 
        
        var oParent = this;
        _oContainer.on("pressup",function(){oParent._onExitHelp();});
    };

    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);

        var oParent = this;
        _oContainer.off("pressup",function(){oParent._onExitHelp();});
    };

    this._onExitHelp = function(){
        _oThis.unload();
        
        s_oGame.startGame();
    };

    _oParentContainer = oParentContainer;
    _oThis = this;
    
    this._init();

}
