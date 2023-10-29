/**
 * User: qzix13
 * Date: 28.12.13
 */

function CompleteDlg(app) {
    this.app = app;
    this.showed = false;

    var txtScale = 0.8;
    var cellSize = app.playState.cellSize;
    var halfCellSize = cellSize / 2;
    var center = 430 / 2;
    var scale = 0.75;//0.58;
    var btnsOffset = 100;//63;
    var btns1Y = 200;
    var btns2Y = 200;//btns1Y - 60;

    this.isBusy = false;
    
    this.group = app.phaser.add.group(app.playState.completeDlgGroup);
    this.bg = app.phaser.add.child(this.group, 0, 0, 'bg_complete');
    this.bg.inputEnabled = true;

    this.txtCaption = app.phaser.add.child(this.group, 190, 40, 'game_atlas');
    this.txtCaption.frameName = 'txt_level_complete';
    this.txtCaption.anchor.setTo(.5, .5);
    this.txtCaption.scale.setTo(txtScale, txtScale);

    this.txtScore = app.phaser.add.child(this.group, 75, 105, 'game_atlas');
    this.txtScore.frameName = 'txt_score';
    this.txtScore.anchor.setTo(.5,.5);
    this.txtScore.scale.setTo(txtScale, txtScale);

    this.txtScoreValue = app.phaser.add.bitmapText(this.txtScore.x + this.txtScore.width / 1.8, this.txtScore.y + 6, '99999999', { font: '28px ActionMan32', align: 'left' });
    this.txtScoreValue.anchor.setTo(.0, .5);
    this.group.add(this.txtScoreValue);

    this.kiziLogo = app.phaser.add.child(this.group, center + btnsOffset - 10, btns1Y - 85, 'kizi');
    this.kiziLogo.anchor.setTo(.5, .5);
    this.kiziLogo.scale.setTo(.4, .4);

    this.btnReset = app.phaser.add.button(center, btns2Y, 'game_atlas', this.onBtnResetClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnReset.scale.setTo(scale, scale);
    this.btnReset.anchor.setTo(.5, .5);
    this.group.add(this.btnReset);

    this.icoReset = app.phaser.add.child(this.group, this.btnReset.x, this.btnReset.y, 'game_atlas');
    this.icoReset.frameName = 'ico_reset';
    this.icoReset.anchor.setTo(.5, .5);
    this.icoReset.scale.copyFrom(this.btnReset.scale);

    this.btnMenu = app.phaser.add.button(center - btnsOffset, btns2Y, 'game_atlas', this.onBtnMenuClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnMenu.scale.setTo(scale, scale);
    this.btnMenu.anchor.setTo(.5, .5);
    this.group.add(this.btnMenu);

    this.icoMenu = app.phaser.add.child(this.group, this.btnMenu.x, this.btnMenu.y, 'game_atlas');
    this.icoMenu.frameName = 'ico_menu';
    this.icoMenu.anchor.setTo(.5, .5);
    this.icoMenu.scale.copyFrom(this.btnMenu.scale);
    
    this.btnNext = app.phaser.add.button(center + btnsOffset, btns2Y, 'game_atlas', this.onBtnNextClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnNext.scale.setTo(scale, scale);
    this.btnNext.anchor.setTo(.5, .5);
    this.group.add(this.btnNext);

    this.icoNext = app.phaser.add.child(this.group, this.btnNext.x, this.btnNext.y, 'game_atlas');
    this.icoNext.frameName = 'ico_next';
    this.icoNext.anchor.setTo(.5, .5);
    this.icoNext.scale.copyFrom(this.btnNext.scale);

    this.app.playState.completeDlgGroup.visible = false;
    this.group.visible = false;
    this.group.y = -app.fitSizes.height;
}

CompleteDlg.prototype.destroy = function () {
    this.app = null;

    this.group.destroy();
    this.group = null;
    this.bg.destroy();
    this.bg = null;
    this.txtScore.destroy();
    this.txtScore = null;
    this.txtScoreValue.destroy();
    this.txtScoreValue = null;
    this.btnReset.destroy();
    this.btnReset = null;
    this.icoReset.destroy();
    this.icoReset = null;
    this.btnMenu.destroy();
    this.btnMenu = null;
    this.icoMenu.destroy();
    this.icoMenu = null;
    this.btnNext.destroy();
    this.btnNext = null;
    this.icoNext.destroy();
    this.icoNext = null;
    this.kiziLogo.destroy();
    this.kiziLogo = null;
};

CompleteDlg.prototype.show = function (caption, score) {
    if (this.showed) return;
    this.isBusy = true;
    this.showed = true;
    caption = caption || 'txt_level_complete';
    score = score || 0;
    this.txtCaption.frameName = caption;
    this.txtScoreValue.setText(score.toString());
    this.app.playState.completeDlgGroup.visible = this.group.visible = true;
    this.btnNext.visible = this.icoNext.visible = caption === 'txt_level_complete';
    //this.kiziLogo.frameName = 'mascot_' + this.app.phaser.rnd.integerInRange(1, 5);
    if (this.app.isCanPlayAudio && this.app.isSound) {
        if (caption != 'txt_level_failed') this.app.levelCompleteSound.play();
        else this.app.levelFailedSound.play();
    }
    this.app.saveScore(this.app.levelMng.curr, score);
    TweenLite.to(this.group, 1.0, { y: 0.0, ease: 'Expo.easeOut' } );
    TweenLite.to(this.app.playState.toolbarGroup, 1.0, { alpha: 0.0, onCompleteScope: this, onComplete: function() { this.isBusy = false; this.app.playState.toolbarGroup.visible = false; } } );
    if (window.HTML5API) HTML5API.levelEnded( { position: 'bottom', show_widget: true } );
};

CompleteDlg.prototype.hide = function (onComplete, onCompleteScope) {
    if (this.showed === false) return;
    this.isBusy = true;
    this.app.playState.toolbarGroup.visible = true;
    TweenLite.to(this.group, 0.5, { y: -this.app.fitSizes.height - 100, onCompleteScope: this, onComplete: function() 
    { this.app.playState.completeDlgGroup.visible = this.group.visible = false; this.showed = false; this.isBusy = false; } } );
    TweenLite.to(this.app.playState.toolbarGroup, 0.5, { alpha: 1.0, onComplete: onComplete, onCompleteScope: onCompleteScope } );
};

CompleteDlg.prototype.hide2 = function () {
    this.app.playState.toolbarGroup.visible = true;
    this.app.playState.toolbarGroup.alpha = 1.0;
    if (this.showed === false) return;
    this.group.y = -this.app.fitSizes.height, 
    this.app.playState.completeDlgGroup.visible = this.group.visible = false;
    this.isBusy = false;
    this.showed = false;
};

CompleteDlg.prototype.onBtnMenuClick = function () {
    if (this.isBusy) return;
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
    if (this.app.levelMng.curr >= this.app.levelMng.total) {
        this.app.levelMng.curr = 1;
        cookie.set('lc', '1');
    }
    TweenLite.killTweensOf(this.group);
    TweenLite.killTweensOf(this.app.playState.toolbarGroup);
    this.app.createMenuState();
    this.app.playState.destroy();
};

CompleteDlg.prototype.onBtnResetClick = function () {
    if (this.isBusy) return;
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
    this.app.playState.reset();
    this.hide();
};

CompleteDlg.prototype.onBtnNextClick = function () {
    if (this.isBusy) return;
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
    TweenLite.to(this.app.playState.canvas, 0.15, { alpha: 0.0, onCompleteScope: this, onComplete: function() {
        this.app.playState.canvas.visible = true;
        this.app.levelMng.next();
        this.hide2();
    } } );
    TweenLite.to(this.app.playState.canvas, 0.15, { alpha: 1.0, delay: 0.3 } );
    
    //this.app.playState.canvas.visible = false;
    /*TweenLite.delayedCall(0.1, function() {
        this.app.playState.canvas.visible = true;
        this.app.levelMng.next();
        this.hide2(); 
    }, null, this);*/
};