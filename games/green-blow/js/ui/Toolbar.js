/**
 * User: qzix13
 * Date: 23.12.13
 */

function Toolbar(app) {
    this.app = app;

    var cellSize = app.playState.cellSize;
    var rows = app.playState.rows;
    var btnsY = cellSize * rows + cellSize / 2.5;
    var txt1Y = cellSize * rows + cellSize * 0.2;
    var txt2Y = cellSize * rows + cellSize * 0.58;
    var txtScale = 0.7;
    /*var width = cellSize * 5;
    cellSize = width / 6;*/
    var halfCellSize = cellSize / 2;
    
    this.btnPause = app.phaser.add.button(halfCellSize, btnsY, 'game_atlas', this.onBtnPauseClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnPause.width = this.btnPause.height = app.playState.toolbarMaxHeight;
    this.btnPause.anchor.setTo(.5, .5);
    app.playState.toolbarGroup.add(this.btnPause);
    
    this.icoPause = app.phaser.add.child(app.playState.toolbarGroup, this.btnPause.x, this.btnPause.y, 'game_atlas');
    this.icoPause.frameName = 'ico_pause';
    this.icoPause.anchor.setTo(.5, .5);
    this.icoPause.scale.copyFrom(this.btnPause.scale);

    this.btnReset = app.phaser.add.button(cellSize + halfCellSize, btnsY, 'game_atlas', this.onBtnResetClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnReset.width = this.btnReset.height = app.playState.toolbarMaxHeight;
    this.btnReset.anchor.setTo(.5, .5);
    app.playState.toolbarGroup.add(this.btnReset);

    this.icoReset = app.phaser.add.child(app.playState.toolbarGroup, this.btnReset.x, this.btnReset.y, 'game_atlas');
    this.icoReset.frameName = 'ico_reset';
    this.icoReset.anchor.setTo(.5, .5);
    this.icoReset.scale.copyFrom(this.btnReset.scale);
    
    this.txtScore = app.phaser.add.child(app.playState.toolbarGroup, cellSize * 2 + halfCellSize, txt1Y, 'game_atlas');
    this.txtScore.frameName = 'txt_score';
    this.txtScore.anchor.setTo(.5,.5);
    this.txtScore.scale.setTo(txtScale, txtScale);

    this.txtScoreValue = app.phaser.add.bitmapText(this.txtScore.x, txt2Y, '999', { font: '28px ActionMan32', align: 'center' });
    this.txtScoreValue.anchor.setTo(.5, .5);
    app.playState.toolbarGroup.add(this.txtScoreValue);

    this.txtClicks = app.phaser.add.child(app.playState.toolbarGroup, cellSize * 3 + halfCellSize, txt1Y, 'game_atlas');
    this.txtClicks.frameName = app.phaser.device.desktop ? 'txt_clicks' : 'txt_taps';
    this.txtClicks.anchor.setTo(.5,.5);
    this.txtClicks.scale.setTo(txtScale, txtScale);

    this.txtClicksValue = app.phaser.add.bitmapText(this.txtClicks.x, txt2Y, '2', { font: '28px ActionMan32', align: 'center' });
    this.txtClicksValue.anchor.setTo(.5, .5);
    app.playState.toolbarGroup.add(this.txtClicksValue);

    this.txtLevel = app.phaser.add.child(app.playState.toolbarGroup, cellSize * 4  + halfCellSize, txt1Y, 'game_atlas');
    this.txtLevel.frameName = 'txt_level';
    this.txtLevel.anchor.setTo(.5,.5);
    this.txtLevel.scale.setTo(txtScale, txtScale);

    this.txtLevelValue = app.phaser.add.bitmapText(this.txtLevel.x, txt2Y, '30', { font: '28px ActionMan32', align: 'center' });
    this.txtLevelValue.anchor.setTo(.5, .5);
    app.playState.toolbarGroup.add(this.txtLevelValue);

    this.txtCombo = app.phaser.add.child(app.playState.toolbarGroup, halfCellSize - 10, 10, 'game_atlas');
    this.txtCombo.frameName = 'txt_combo';
    this.txtCombo.anchor.setTo(.5,.5);
    this.txtCombo.scale.setTo(txtScale, txtScale);

    this.txtComboValue = app.phaser.add.bitmapText(cellSize / 1.2 + 2, this.txtCombo.y + 4, '+315', { font: '28px ActionMan32', align: 'left' });
    this.txtComboValue.anchor.setTo(.0, .5);
    app.playState.toolbarGroup.add(this.txtComboValue);
    
    this.hideCombo();

    var currScaleX = this.txtClicksValue.scale.x;
    var currScaleY = this.txtClicksValue.scale.y;
    this.tlClicksValue = new TimelineLite();
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX + .3, y: currScaleY - .3 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX - .3, y: currScaleY + .3 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX + .2, y: currScaleY - .2 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX - .2, y: currScaleY + .2 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX + .1, y: currScaleY - .1 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX - .1, y: currScaleY + .1 } );
    this.tlClicksValue.to(this.txtClicksValue.scale, 0.1, { x: currScaleX, y: currScaleY } );
    this.tlClicksValue.gotoAndStop(0.0);
}

Toolbar.prototype.destroy = function () {
    this.app = null;

    this.btnPause.destroy();
    this.btnPause = null;
    this.icoPause.destroy();
    this.icoPause = null;
    this.btnReset.destroy();
    this.btnReset = null;
    this.icoReset.destroy();
    this.icoReset = null;
    this.txtScore.destroy();
    this.txtScore = null;
    this.txtScoreValue.destroy();
    this.txtScoreValue = null;
    this.txtClicks.destroy();
    this.txtClicks = null;
    this.txtClicksValue.destroy();
    this.txtClicksValue = null;
    this.txtLevel.destroy();
    this.txtLevel = null;
    this.txtLevelValue.destroy();
    this.txtLevelValue = null;
    this.txtCombo.destroy();
    this.txtCombo = null;
    this.txtComboValue.destroy();
    this.txtComboValue = null;
    this.tlClicksValue.clear();
    this.tlClicksValue = null;
};

Toolbar.prototype.onBtnPauseClick = function () {
    if (this.app.playState.completeDlg.showed) return;
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.app.playState.pauseDlg.show();
    //this.app.playState.completeDlg.show();
};

Toolbar.prototype.onBtnResetClick = function () {
    if (this.app.playState.completeDlg.showed) return;
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.app.playState.reset();
};

Toolbar.prototype.onBtnWalkthroughClick = function () {
    window.open('https://www.youtube.com/watch?v=VJVGHiQCOsQ', '_blank');
};

Toolbar.prototype.setScore = function (score) {
    this.txtScoreValue.setText(score.toString());
};

Toolbar.prototype.setClicks = function (clicks) {
    this.txtClicksValue.setText(clicks.toString());
};

Toolbar.prototype.setLevel = function (level) {
    this.txtLevelValue.setText(level.toString());
};

Toolbar.prototype.setCombo = function (score) {
    this.txtComboValue.visible = this.txtCombo.visible = true;
    this.txtComboValue.setText('+' + score.toString());
};

Toolbar.prototype.hideCombo = function () {
    this.txtComboValue.visible = this.txtCombo.visible = false;
    this.txtComboValue.setText('');
};

Toolbar.prototype.bubblingClicks = function () {
    this.tlClicksValue.restart();
};