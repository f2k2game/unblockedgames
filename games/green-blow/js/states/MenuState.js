/**
 * User: qzix13
 * Date: 27.12.13
 */

function MenuState(app) {
    this.app = app;
    this.app.menuState = this;
    
    this.windowWidth = 520;
    this.windowHeight = 700;

    this.canvas = app.phaser.add.group(app.phaser.world, 'menu_state_canvas');
    this.bg = app.phaser.add.tileSprite(0, 0, 640, 960, 'bg_menu');
    this.canvas.add(this.bg);
    this.mainLayer = app.phaser.add.group(this.canvas);
    this.canvas.add(app.bgOver._container);

    this.gameName = app.phaser.add.child(this.mainLayer, 0, 0, 'game_name');
    this.gameName.anchor.setTo(0.5, 0.5);
    this.gameName.scale.setTo(0.85, 0.85);
    this.gameName.x = this.windowWidth / 2;
    this.gameName.y = 200;

    this.kiziLogo = app.phaser.add.child(this.mainLayer, 0, 0, 'kizi');
    this.kiziLogo.anchor.setTo(.5, .5);
    this.kiziLogo.scale.setTo(.6, .6);
    this.kiziLogo.x = this.app.originSizes.gameWidth - this.kiziLogo.width - 30;
    this.kiziLogo.y = this.app.originSizes.gameHeight - this.kiziLogo.height + 25;

    var scale = 0.55;
    this.btnMusic = app.phaser.add.button(this.windowWidth - 110, 40, 'game_atlas', this.onBtnMusicClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnMusic.scale.setTo(scale, scale);
    this.btnMusic.anchor.setTo(.5, .5);
    this.mainLayer.add(this.btnMusic);
    
    this.icoMusic = app.phaser.add.child(this.mainLayer, this.btnMusic.x, this.btnMusic.y, 'game_atlas');
    this.icoMusic.frameName = this.app.isMusic ? 'ico_music' : 'ico_music_off';
    this.icoMusic.anchor.setTo(.5, .5);
    this.icoMusic.scale.copyFrom(this.btnMusic.scale);
    
    this.btnSound = app.phaser.add.button(this.windowWidth - 45, 40, 'game_atlas', this.onBtnSoundClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnSound.scale.setTo(scale, scale);
    this.btnSound.anchor.setTo(.5, .5);
    this.mainLayer.add(this.btnSound);

    this.icoSound = app.phaser.add.child(this.mainLayer, this.btnSound.x, this.btnSound.y, 'game_atlas');
    this.icoSound.frameName = this.app.isSound ? 'ico_sound' : 'ico_sound_off';
    this.icoSound.anchor.setTo(.5, .5);
    this.icoSound.scale.copyFrom(this.btnSound.scale);

    scale = 0.9;
    this.btnPlay = app.phaser.add.button(this.windowWidth / 2, this.windowHeight / 1.8, 'button_play', this.onBtnPlayClick, this, 2, 0, 1);
    this.btnPlay.scale.setTo(scale, scale);
    this.btnPlay.anchor.setTo(.5, .5);
    this.mainLayer.add(this.btnPlay);
    scale -= 0.04;
    this.twBtnPlay = app.phaser.add.tween(this.btnPlay.scale).to( { x: scale, y: scale }, 400, null, true, 0.0, 100000, true);

    scale = 0.7;
    this.btnInfo = app.phaser.add.button(this.btnPlay.x - 100, this.btnPlay.y + 150, 'game_atlas', this.onBtnInfoClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnInfo.scale.setTo(scale, scale);
    this.btnInfo.anchor.setTo(.5, .5);
    this.mainLayer.add(this.btnInfo);

    this.icoInfo = app.phaser.add.child(this.mainLayer, this.btnInfo.x, this.btnInfo.y, 'game_atlas');
    this.icoInfo.frameName = 'ico_info';
    this.icoInfo.anchor.setTo(.5, .5);
    this.icoInfo.scale.copyFrom(this.btnInfo.scale);

    this.btnReset = app.phaser.add.button(this.btnPlay.x + 100, this.btnPlay.y + 150, 'game_atlas', this.onBtnResetClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnReset.scale.setTo(scale, scale);
    this.btnReset.anchor.setTo(.5, .5);
    this.mainLayer.add(this.btnReset);

    this.icoReset = app.phaser.add.child(this.mainLayer, this.btnReset.x, this.btnReset.y, 'game_atlas');
    this.icoReset.frameName = 'ico_reset';
    this.icoReset.anchor.setTo(.5, .5);
    this.icoReset.scale.copyFrom(this.btnReset.scale);
    
    this.creditsGroup = app.phaser.add.group(this.mainLayer);
    this.bgCredits = app.phaser.add.child(this.creditsGroup, 0, 0, 'bg_credits');
    this.bgCredits.inputEnabled = true;
    this.creditsGroup.x = (this.windowWidth - this.bgCredits.width) / 2;
    this.creditsYInScreen = this.creditsGroup.y = (this.windowHeight - this.bgCredits.height) / 2;
    this.creditsYOutScreen = -this.bgCredits.height;
    
    this.btnCreditsClose = app.phaser.add.button(this.bgCredits.width / 2, this.bgCredits.height + 15, 'game_atlas', this.onBtnCreditsCloseClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnCreditsClose.scale.setTo(scale, scale);
    this.btnCreditsClose.anchor.setTo(.5, .5);
    this.creditsGroup.add(this.btnCreditsClose);

    this.txtCreditsOk = app.phaser.add.bitmapText(this.btnCreditsClose.x, this.btnCreditsClose.y + 6, 'OK', { font: '36px ActionMan46', align: 'center' });
    this.txtCreditsOk.anchor.setTo(.5, .5);
    this.creditsGroup.add(this.txtCreditsOk);
    this.creditsGroup.visible = false;

    
    this.clearGroup = app.phaser.add.group(this.mainLayer);
    this.bgClear = app.phaser.add.child(this.clearGroup, 0, 0, 'bg_clear');
    this.bgClear.inputEnabled = true;
    this.bgClear.scale.setTo(0.9, 0.9);
    this.clearGroup.x = (this.windowWidth - this.bgClear.width) / 2;
    this.clearYInScreen = this.clearGroup.y = (this.windowHeight - this.bgClear.height) / 2;
    this.clearYOutScreen = -this.bgClear.height;
    
    scale = 0.7;
    this.btnClearYes = app.phaser.add.button(this.bgClear.width / 4, this.bgClear.height / 1.3, 'game_atlas', this.onBtnClearYesClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnClearYes.scale.setTo(scale, scale);
    this.btnClearYes.anchor.setTo(.5, .5);
    this.clearGroup.add(this.btnClearYes);

    this.txtClearYes = app.phaser.add.bitmapText(this.btnClearYes.x, this.btnClearYes.y + 6, 'YES', { font: '40px ActionMan46', align: 'center' });
    this.txtClearYes.anchor.setTo(.5, .5);
    this.txtClearYes.scale.copyFrom(this.btnClearYes.scale);
    this.clearGroup.add(this.txtClearYes);

    this.btnClearNo = app.phaser.add.button(this.bgClear.width / 1.3, this.bgClear.height / 1.3, 'game_atlas', this.onBtnClearNoClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnClearNo.scale.setTo(scale, scale);
    this.btnClearNo.anchor.setTo(.5, .5);
    this.clearGroup.add(this.btnClearNo);

    this.txtClearNo = app.phaser.add.bitmapText(this.btnClearNo.x, this.btnClearNo.y + 6, 'NO', { font: '40px ActionMan46', align: 'center' });
    this.txtClearNo.anchor.setTo(.5, .5);
    this.txtClearNo.scale.copyFrom(this.btnClearNo.scale);
    this.clearGroup.add(this.txtClearNo);
    this.clearGroup.visible = false;

    var txtScale = 0.8;
    this.txtScore = app.phaser.add.child(this.mainLayer, 10, this.windowHeight - 30, 'game_atlas');
    this.txtScore.frameName = 'txt_score';
    this.txtScore.anchor.setTo(.0,.5);
    this.txtScore.scale.setTo(txtScale, txtScale);

    this.txtScoreValue = app.phaser.add.bitmapText(this.txtScore.x + this.txtScore.width + 5, this.txtScore.y + 5, '0', { font: '28px ActionMan32', align: 'left' });
    this.txtScoreValue.anchor.setTo(.0, .5);
    this.txtScoreValue.setText(app.getTotalScore().toString());
    this.mainLayer.add(this.txtScoreValue);

    
};

MenuState.prototype.destroy = function () {
    this.app.menuState = null;
    this.app = null;
    this.twBtnPlay.stop();
    this.twBtnPlay = null;
    
    this.canvas.destroy();
    this.canvas = null;
    this.bg.destroy();
    this.bg = null;
    this.mainLayer.destroy();
    this.mainLayer = null;
    this.gameName.destroy();
    this.gameName = null;
    this.kiziLogo.destroy();
    this.kiziLogo = null;
    this.btnMusic.destroy();
    this.btnMusic = null;
    this.icoMusic.destroy();
    this.icoMusic = null;;
    this.btnSound.destroy();
    this.btnSound = null;;
    this.icoSound.destroy();
    this.icoSound = null;;
    this.btnPlay.destroy();
    this.btnPlay = null;
    this.btnInfo.destroy();
    this.btnInfo = null;
    this.icoInfo.destroy();
    this.icoInfo = null;
    this.btnReset.destroy();
    this.btnReset = null;
    this.icoReset.destroy();
    this.icoReset = null;
    this.creditsGroup.destroy();
    this.creditsGroup = null;
    this.bgCredits.destroy();
    this.bgCredits = null;
    this.btnCreditsClose.destroy();
    this.btnCreditsClose = null;
    this.txtCreditsOk.destroy();
    this.txtCreditsOk = null;
    this.clearGroup.destroy();
    this.clearGroup = null;
    this.bgClear.destroy();
    this.bgClear = null;
    this.btnClearYes.destroy();
    this.btnClearYes = null;
    this.txtClearYes.destroy();
    this.txtClearYes = null;
    this.btnClearNo.destroy();
    this.btnClearNo = null;
    this.txtClearNo.destroy();
    this.txtClearNo = null;
    this.txtScore.destroy();
    this.txtScore = null;
    this.txtScoreValue.destroy();
    this.txtScoreValue = null;
    /*this.btnMoreGames.destroy();
    this.btnMoreGames = null;*/
};

MenuState.prototype.resize = function () {
    var scale = this.app.scale;
    this.bg.scale.x = this.bg.scale.y = scale;
    this.bg.y = this.app.fitSizes.height - 960 * scale;

    this.mainLayer.scale.setTo(scale, scale);
    this.mainLayer.x = (this.app.originSizes.width - this.windowWidth) / 2 * scale;
    this.mainLayer.y = (this.app.fitSizes.height - this.windowHeight * scale) / 2;
    
    this.creditsYOutScreen = -this.bgCredits.height - this.mainLayer.y - 150;
    if (this.creditsGroup.visible === false)
        this.creditsGroup.y = this.creditsYOutScreen;

    this.clearYOutScreen = -this.bgClear.height - this.mainLayer.y - 150;
    if (this.clearGroup.visible === false)
        this.clearGroup.y = this.clearYOutScreen;
};

MenuState.prototype.onBtnPlayClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.creditsGroup.visible) return;
    if (this.clearGroup.visible) return;
    this.app.createPlayState();
    this.destroy();
};

MenuState.prototype.onBtnInfoClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.creditsGroup.visible) return;
    if (this.clearGroup.visible) return;
    this.creditsGroup.visible = true;
    TweenLite.to(this.creditsGroup, 1.0, { y: this.creditsYInScreen, ease: 'Expo.easeOut' } );
};

MenuState.prototype.onBtnResetClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.creditsGroup.visible) return;
    if (this.clearGroup.visible) return;
    this.clearGroup.visible = true;
    TweenLite.to(this.clearGroup, 1.0, { y: this.clearYInScreen, ease: 'Expo.easeOut' } );
};

MenuState.prototype.onBtnMusicClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    var isMusic = !this.app.isMusic;
    this.refreshBtns();
    if (isMusic) this.app.unmute();
    else this.app.mute();
};

MenuState.prototype.onBtnSoundClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.app.isSound = !this.app.isSound;
    this.refreshBtns();
};

MenuState.prototype.refreshBtns = function () {
    this.icoMusic.frameName = this.app.isMusic ? 'ico_music' : 'ico_music_off';
    this.icoSound.frameName = this.app.isSound ? 'ico_sound' : 'ico_sound_off';
};

MenuState.prototype.onBtnCreditsCloseClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    TweenLite.to(this.creditsGroup, 0.6, { y: this.creditsYOutScreen, ease: 'Expo.easeOut', onCompleteScope: this, onComplete: function() {
        this.creditsGroup.visible = false;
    } } );
}

MenuState.prototype.onBtnClearYesClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    cookie.empty();
    for (var i = 0; i < 30; i++) this.app.score[i] = 0;
    this.app.levelMng.curr = 1;
    this.txtScoreValue.setText(this.app.getTotalScore().toString());
    TweenLite.to(this.clearGroup, 0.6, { y: this.clearYOutScreen, ease: 'Expo.easeOut', onCompleteScope: this, onComplete: function() {
        this.clearGroup.visible = false;
    } } );
};

MenuState.prototype.onBtnClearNoClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    TweenLite.to(this.clearGroup, 0.6, { y: this.clearYOutScreen, ease: 'Expo.easeOut', onCompleteScope: this, onComplete: function() {
        this.clearGroup.visible = false;
    } } );
};
