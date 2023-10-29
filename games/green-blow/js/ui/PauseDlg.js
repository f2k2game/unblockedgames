/**
 * User: qzix13
 * Date: 27.12.13
 */

function PauseDlg(app) {
    this.app = app;
    
    /*this.bg = app.phaser.add.graphics(0, 0);
    this.bg.beginFill(0x0, 0.4);
    this.bg.drawRect(0, 0, 640, 960);
    this.bg.endFill();
    app.playState.pauseDlgGroup.add(this.bg);*/

    this.bg = app.phaser.add.child(app.playState.pauseDlgGroup, 0, 0, 'bg_pause');
    this.bg.inputEnabled = true;
    
    this.txtPause = app.phaser.add.child(app.playState.pauseDlgGroup, app.originSizes.width / 2, app.originSizes.height / 3.4, 'game_atlas');
    this.txtPause.frameName = 'txt_pause';
    this.txtPause.anchor.setTo(.5,.5);
    this.txtPause.scale.setTo(.8,.8);

    var center = app.originSizes.width / 2;
    var scale = 0.85;
    var btnsOffset = 100;
    var btns1Y = app.originSizes.height / 2.4;
    var btns2Y = btns1Y + btnsOffset;
    var btns3Y = btns2Y + btnsOffset;
    var btns4Y = btns3Y + btnsOffset;
    var txtScale = 0.7;

    this.btnMenu = app.phaser.add.button(center - btnsOffset, btns1Y, 'game_atlas', this.onBtnMenuClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnMenu.scale.setTo(scale, scale);
    this.btnMenu.anchor.setTo(.5, .5);
    app.playState.pauseDlgGroup.add(this.btnMenu);

    this.icoMenu = app.phaser.add.child(app.playState.pauseDlgGroup, this.btnMenu.x, this.btnMenu.y, 'game_atlas');
    this.icoMenu.frameName = 'ico_menu';
    this.icoMenu.anchor.setTo(.5, .5);
    this.icoMenu.scale.copyFrom(this.btnMenu.scale);

    this.btnReset = app.phaser.add.button(center, btns1Y, 'game_atlas', this.onBtnResetClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnReset.scale.setTo(scale, scale);
    this.btnReset.anchor.setTo(.5, .5);
    app.playState.pauseDlgGroup.add(this.btnReset);

    this.icoReset = app.phaser.add.child(app.playState.pauseDlgGroup, this.btnReset.x, this.btnReset.y, 'game_atlas');
    this.icoReset.frameName = 'ico_reset';
    this.icoReset.anchor.setTo(.5, .5);
    this.icoReset.scale.copyFrom(this.btnReset.scale);

    this.btnPlay = app.phaser.add.button(center + btnsOffset, btns1Y, 'game_atlas', this.onBtnPlayClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnPlay.scale.setTo(scale, scale);
    this.btnPlay.anchor.setTo(.5, .5);
    app.playState.pauseDlgGroup.add(this.btnPlay);

    this.icoPlay = app.phaser.add.child(app.playState.pauseDlgGroup, this.btnPlay.x, this.btnPlay.y, 'game_atlas');
    this.icoPlay.frameName = 'ico_play';
    this.icoPlay.anchor.setTo(.5, .5);
    this.icoPlay.scale.copyFrom(this.btnPlay.scale);

    this.btnMusic = app.phaser.add.button(center - btnsOffset / 2, btns2Y, 'game_atlas', this.onBtnMusicClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnMusic.scale.setTo(scale, scale);
    this.btnMusic.anchor.setTo(.5, .5);
    app.playState.pauseDlgGroup.add(this.btnMusic);

    this.icoMusic = app.phaser.add.child(app.playState.pauseDlgGroup, this.btnMusic.x, this.btnMusic.y, 'game_atlas');
    this.icoMusic.frameName = this.app.isMusic ? 'ico_music' : 'ico_music_off';
    this.icoMusic.anchor.setTo(.5, .5);
    this.icoMusic.scale.copyFrom(this.btnMusic.scale);

    this.btnSound = app.phaser.add.button(center + btnsOffset / 2, btns2Y, 'game_atlas', this.onBtnSoundClick, this, 'button_100_over', 'button_100_up', 'button_100_down');
    this.btnSound.scale.setTo(scale, scale);
    this.btnSound.anchor.setTo(.5, .5);
    app.playState.pauseDlgGroup.add(this.btnSound);

    this.icoSound = app.phaser.add.child(app.playState.pauseDlgGroup, this.btnSound.x, this.btnSound.y, 'game_atlas');
    this.icoSound.frameName = this.app.isSound ? 'ico_sound' : 'ico_sound_off';
    this.icoSound.anchor.setTo(.5, .5);
    this.icoSound.scale.copyFrom(this.btnSound.scale);

    this.kiziLogo = app.phaser.add.child(app.playState.pauseDlgGroup, 0, 0, 'kizi');
    this.kiziLogo.anchor.setTo(.5, .5);
    this.kiziLogo.scale.setTo(.6, .6);
    this.kiziLogo.x = this.app.originSizes.gameWidth / 2;
    this.kiziLogo.y = this.app.originSizes.gameHeight / 1.1;
}

PauseDlg.prototype.destroy = function () {
    this.app = null;
    this.bg.destroy();
    this.bg = null;
    this.txtPause.destroy();
    this.txtPause = null;
    this.btnMenu.destroy();
    this.btnMenu = null;
    this.icoMenu.destroy();
    this.icoMenu = null;
    this.btnReset.destroy();
    this.btnReset = null;
    this.icoReset.destroy();
    this.icoReset = null;
    this.btnPlay.destroy();
    this.btnPlay = null;
    this.icoPlay.destroy();
    this.icoPlay = null;
    this.btnMusic.destroy();
    this.btnMusic = null;
    this.icoMusic.destroy();
    this.icoMusic = null;
    this.btnSound.destroy();
    this.btnSound = null;
    this.icoSound.destroy();
    this.icoSound = null;
    this.kiziLogo.destroy();
    this.kiziLogo = null;

};

PauseDlg.prototype.show = function () {
    this.app.playState.pauseDlgGroup.visible = true;
    this.app.playState.pause(true);
};

PauseDlg.prototype.hide = function () {
    this.app.playState.pauseDlgGroup.visible = false;
    this.app.playState.pause(false);
};

PauseDlg.prototype.onBtnMenuClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
    
    this.app.createMenuState();
    this.app.playState.destroy();
};

PauseDlg.prototype.onBtnResetClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.hide();
    this.app.playState.reset();

    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
};

PauseDlg.prototype.onBtnPlayClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.hide();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
};

PauseDlg.prototype.onBtnMusicClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
    var isMusic = !this.app.isMusic;
    this.refreshBtns();
    if (isMusic) this.app.unmute();
    else this.app.mute();
};

PauseDlg.prototype.onBtnSoundClick = function () {
    if (this.app.isCanPlayAudio && this.app.isSound) this.app.buttonDownSound.play();
    this.app.isSound = !this.app.isSound;
    this.refreshBtns();
    if (this.app.isMusic && !this.app.mainThemeSound.isPlaying) this.app.mainThemeSound.play('', 0, 1, true, true);
};

PauseDlg.prototype.onBtnWalkthroughClick = function () {
    window.open('https://www.youtube.com/watch?v=VJVGHiQCOsQ', '_blank');
};

PauseDlg.prototype.refreshBtns = function () {
    this.icoMusic.frameName = this.app.isMusic ? 'ico_music' : 'ico_music_off';
    this.icoSound.frameName = this.app.isSound ? 'ico_sound' : 'ico_sound_off';
};
