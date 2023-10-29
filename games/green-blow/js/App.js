/**
 * User: qzix13
 * Date: 11.12.13
 */

(function () {

    var app = {
        phaser: null,
        menuState: null,
        playState: null,
        levelMng: null,
        bgOver: null,
        score: [],
        
        originSizes: {
            width: 640,
            height: 960,
            gameWidth: 640,
            gameHeight: 712,
        },
        
        fitSizes: {
            width: null,
            height: null,
            gameWidth: null,
            gameHeight: null,
        },
        scale: 1.0,
        
        reqWidth: null,
        reqHeight: null,

        isCanPlayAudio: true,
        isSound: true,
        isMusic: true,
        buttonDownSound: null,
        bubbleGrowSound: null,
        bubblePopSound: null,
        levelCompleteSound: null,
        mainThemeSound: null,
        isPaused: false,
        
        //gotoSponsor: function () {  window.open('http://a10.com', '_blank'); },
        createMenuState: function () { this.menuState = new MenuState(this); resizeGame(); this.menuState.resize(); },
        createPlayState: function () { this.playState = new PlayState(this); resizeGame(); this.playState.resize(); },
        saveScore: function (level, score) {
            level--;
            if (this.score[level] < score) {
                this.score[level] = score;
                cookie.set('s' + level, score);
            }
        },
        getTotalScore: function () {
            var s = 0;
            for (var i = 0; i < 30; i++) {
                s += this.score[i];
            }
            return s;
        },

        mute: function () {
            if (this.isCanPlayAudio && this.isMusic && this.mainThemeSound) {
                this.mainThemeSound.stop();
                this.isMusic = false;
                if (this.menuState) this.menuState.refreshBtns();
                if (this.playState) this.playState.pauseDlg.refreshBtns();
            }
        },

        unmute: function () {
            if (this.isCanPlayAudio && this.isMusic === false && this.mainThemeSound) {
                this.isMusic = true;
                this.mainThemeSound.stop();
                this.mainThemeSound.play('', 0, 1, true, true);
                if (this.menuState) this.menuState.refreshBtns();
                if (this.playState) this.playState.pauseDlg.refreshBtns();
            }
        },

        pause: function () {
            this.isPaused = true;
            if (this.mainThemeSound) {
                this.mainThemeSound.stop();
            }
            if (this.playState) {
                if (this.playState.completeDlgGroup.visible === false) {
                    this.playState.pauseDlgGroup.visible = true;
                    this.playState.pause(true);
                }

            }
        },

        resume: function () {
            this.isPaused = false;
            if (this.mainThemeSound) {
                this.mainThemeSound.stop();
                if (this.isMusic && !this.mainThemeSound.pendingPlayback) this.mainThemeSound.play('', 0, 1, true, true);
            }
            
        },

        unpause: function () {
            this.resume();
            if (this.playState) {
                if (this.playState.completeDlgGroup.visible === false) {
                    this.playState.pauseDlgGroup.visible = false;
                    this.playState.pause(false);
                }

            }

        },

        resetGame: function () {
            if (this.playState) this.playState.destroy();
            if (!this.menuState) this.createMenuState();
            
            this.menuState.onBtnClearYesClick();
            if (this.isCanPlayAudio && this.isMusic && this.mainThemeSound) {
                this.mainThemeSound.stop();
                this.mainThemeSound.play('', 0, this.isMusic ? 1 : 0, true);
            }
        }
    };
    
    window.blastballApp = app;

    var txtLoading = null;
    //var spilLogoL = null;
    var txtLoadingValue = null;
    var picRotatePhone = null;

    resizeGame();
    window.addEventListener('resize', resizeGame, false);
    window.addEventListener('orientationchange', resizeGame, false);
    app.phaser = new Phaser.Game(app.originSizes.width, app.originSizes.height, Phaser.CANVAS, 'gameArea',
        { preload: preload, loadUpdate: loadUpdate, create: create, update: update/*, render: render*/ } );

    function resizeGame(width, height) {
        var screenWidth, screenHeight;
        if (typeof width === 'number' && typeof height === 'number') {
            screenWidth = width;
            screenHeight = height;
        } else if (app.reqWidth && app.reqHeight) {
            screenWidth = app.reqWidth;
            screenHeight = app.reqHeight;
            if (app.fitSizes.width === screenWidth && app.fitSizes.height === screenHeight) return;
        } else {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
        }
        
        var width = app.originSizes.width;
        var height = app.originSizes.height;
        var gameWidth = app.originSizes.gameWidth;
        var gameHeight = app.originSizes.gameHeight;

        var gameSize = calcScreenFit(gameWidth / gameHeight, screenWidth, screenHeight);
        app.fitSizes.width = width *= gameSize.width / gameWidth;
        app.fitSizes.height = height *= gameSize.height / gameHeight;
        if (app.fitSizes.width > screenWidth) app.fitSizes.width = width = screenWidth;
        if (app.fitSizes.height > screenHeight) app.fitSizes.height = height = screenHeight;
        app.fitSizes.gameWidth = gameSize.width;
        app.fitSizes.gameHeight = gameSize.height;
        app.scale = app.fitSizes.gameWidth / app.originSizes.gameWidth;

        var gameArea = document.getElementById('gameArea');
        gameArea.style.width = width + 'px';
        gameArea.style.height = height + 'px';
        gameArea.style.marginLeft = (window.innerWidth / 2 - width / 2) + 'px';
        gameArea.style.marginTop = 0;//(window.innerHeight / 2 - height / 2) + 'px';

        if (app.phaser) {
            app.phaser.width = width;
            app.phaser.height = height;
            app.phaser.stage.bounds.width = app.phaser.width;
            app.phaser.stage.bounds.height = app.phaser.height;
            app.phaser.renderer.resize(app.phaser.width, app.phaser.height);
        }

        if (app.bgOver) {
            app.bgOver.x = (app.fitSizes.width - 540 * app.scale) / 2;
            app.bgOver.y = (app.fitSizes.height - 704 * app.scale) / 2;
            app.bgOver.scale.x = app.bgOver.scale.y = app.scale;
            //app.bgOver.y = (app.fitSizes.height - 960 * app.scale) / 2;
        }
        if (app.menuState) app.menuState.resize();
        if (app.playState) app.playState.resize();
        

        if (txtLoading) {
            txtLoading.scale.setTo(.9 * app.scale, .9 * app.scale);
            txtLoading.x = app.fitSizes.width / 2;
            txtLoading.y = app.fitSizes.height / 2 - 60 * app.scale;
        }

        if (txtLoadingValue) {
            txtLoadingValue.scale.setTo(.9 * app.scale, .9 * app.scale);
            txtLoadingValue.x = app.fitSizes.width / 2;
            txtLoadingValue.y = app.fitSizes.height / 2 - 20 * app.scale;
        }

        /*if (spilLogoL) {
            spilLogoL.scale.setTo(.8 * app.scale, .8 * app.scale);
            spilLogoL.x = app.fitSizes.width / 2;
            if (spilLogoL.currentFrame.name === 'logo_l') {
                spilLogoL.y = app.fitSizes.height / 2 + 200 * app.scale;
            } else if (spilLogoL.currentFrame.name === 'splash') {
                spilLogoL.y = app.fitSizes.height / 2;
            }
        }*/

        if ((app.playState || app.menuState) && window.orientation != undefined) {
            if (picRotatePhone == null && app.phaser) {
                picRotatePhone = app.phaser.add.sprite(app.fitSizes.width / 2, app.fitSizes.height / 2, 'rotate_phone');
                picRotatePhone.anchor.setTo(0.5, 0.5);
                picRotatePhone.visible = false;
            }

            if (picRotatePhone) {
                var portrait = Math.abs(parseInt(window.orientation)) != 90;
    
                picRotatePhone.x = app.fitSizes.width / 2;
                picRotatePhone.y = app.fitSizes.height / 2;
                //picRotatePhone.width = 242 * app.scale * 2; 
                //picRotatePhone.height = 305 * app.scale * 2; 
                picRotatePhone.scale.setTo(app.scale * 1.4, app.scale * 1.4);
                
                if (app.playState) app.playState.canvas.visible = portrait;
                if (app.menuState) app.menuState.canvas.visible = portrait;
                /*if (txtLoading) txtLoading.visible = portrait;
                if (spilLogoL) spilLogoL.visible = portrait;
                if (txtLoadingValue) txtLoadingValue.visible = portrait;*/
                picRotatePhone.visible = !portrait;
            }
        }
        
        //if (app.phaser) console.log(app.phaser._paused);
        //if (app.fpsText) app.phaser.world.bringToTop(app.fpsText);
    }

    app.resizeGame = resizeGame;

        function preload() {
        app.phaser.load.image('rotate_phone', 'assets/images/rotate_phone.png');
        app.phaser.load.image('loading', 'assets/images/txt_loading.png');
        //app.phaser.load.image('logo_l', 'assets/images/spil/logo_l.png');
        app.phaser.load.bitmapFont('action_man_nums', 'assets/fonts/action_man_nums_32.png', 'assets/fonts/action_man_nums_32.fnt')
        app.phaser.load.onFileComplete.add(onFileComplete);
        
        var ext = (app.phaser.device.iOS || app.phaser.device.macOS) ? 'm4a' : 'ogg';
        app.phaser.load.audio('bubble_grow', 'assets/sounds/' + ext + '/bubble_grow.' + ext);
        app.phaser.load.audio('bubble_pop', 'assets/sounds/' + ext + '/bubble_pop.' + ext);
        app.phaser.load.audio('button_click', 'assets/sounds/' + ext + '/button_click.' + ext);
        app.phaser.load.audio('level_complete', 'assets/sounds/' + ext + '/level_complete.' + ext);
        app.phaser.load.audio('level_failed', 'assets/sounds/' + ext + '/level_failed.' + ext);
        app.phaser.load.audio('main_theme', 'assets/sounds/' + ext + '/main_theme.' + ext);

        app.phaser.load.image('initializing', 'assets/images/txt_initializing.png');
        app.phaser.load.image('kizi', 'assets/images/kizi_logo.png');
        app.phaser.load.image('tutorial_click', 'assets/images/txt_tutorial_click.png');
        app.phaser.load.image('tutorial_tap', 'assets/images/txt_tutorial_tap.png');
        app.phaser.load.atlasXML('game_atlas', 'assets/images/game_atlas.png', 'assets/images/game_atlas.xml');
        app.phaser.load.image('bg_menu', 'assets/images/bg_menu.png');
        app.phaser.load.image('bg_play', 'assets/images/bg_play.png');
        app.phaser.load.image('bg_pause', 'assets/images/bg_pause.png');
        app.phaser.load.image('bg_complete', 'assets/images/bg_complete.png');
        app.phaser.load.image('bg_credits', 'assets/images/bg_credits.png');
        app.phaser.load.image('bg_clear', 'assets/images/bg_clear.png');
        app.phaser.load.image('game_name', 'assets/images/game_name.png');
        app.phaser.load.spritesheet('button_play', 'assets/images/button_play_sheet.png', 160, 160);
        app.phaser.load.spritesheet('button_more_games', 'assets/images/button_more_games_sheet.png', 250, 100);
        app.phaser.load.bitmapFont('action_man_chars', 'assets/fonts/action_man_chars_46.png', 'assets/fonts/action_man_chars_46.fnt')

        //app.phaser.load.atlasXML('spil_atlas', 'assets/images/spil/spil_atlas.png', 'assets/images/spil/spil_atlas.xml');
        //app.phaser.load.image('splash', 'assets/images/spil/splash.png');
    }
    
    function onFileComplete(progress, key, success, totalLoadedFiles, fileListLength) {
        var x = app.fitSizes.width / 2;
        var y = app.fitSizes.height / 2;
        if (key === 'loading') {
            txtLoading = app.phaser.add.sprite(x, y - 60 * app.scale, 'loading');
            txtLoading.anchor.setTo(.5,.5);
            txtLoading.scale.setTo(.9 * app.scale, .9 * app.scale);
        }/* else if (key === 'logo_l') {
            spilLogoL = app.phaser.add.sprite(x, y + 200 * app.scale, 'logo_l');
            spilLogoL.anchor.setTo(.5,.5);
            spilLogoL.scale.setTo(.5 * app.scale, .5 * app.scale);
            spilLogoL.inputEnabled = true;
            spilLogoL.events.onInputDown.add(function() { app.gotoSponsor(); });
        }*/ else if (key === 'action_man_nums') {
            txtLoadingValue = app.phaser.add.bitmapText(x, y - 30 * app.scale, '0%', { font: '32px ActionMan32', align: 'center' });
            txtLoadingValue.anchor.setTo(.5, .5);
            txtLoadingValue.scale.setTo(.9 * app.scale, .9 * app.scale);
            app.phaser.load.onFileComplete.remove(onFileComplete);
        }
        resizeGame();
    }
    
    function loadUpdate() {
        if (txtLoadingValue) txtLoadingValue.setText(app.phaser.load.progress + '%');
    }

    function create() {
        app.phaser.onPause.add(app.pause, app);
        app.phaser.onResume.add(app.resume, app);
        
        txtLoadingValue.setText('100%');
        
        app.isCanPlayAudio = app.phaser.device.canPlayAudio('ogg') || app.phaser.device.canPlayAudio('m4a');
        TweenLite.delayedCall(app.isCanPlayAudio ? 0.2 : 1.0, function() {
            
            for (var i = 0; i < 30; i++) {
                var score = parseInt(cookie.get('s' + i));
                if (score) app.score[i] = score;
                else app.score[i] = 0;
            }
            txtLoading.loadTexture('initializing');
            txtLoading.visible = false;
            txtLoadingValue.visible = false;
            
            /*spilLogoL.loadTexture('splash');
            spilLogoL.x = app.fitSizes.width / 2;
            spilLogoL.y = app.fitSizes.height / 2;*/
            //resizeGame();
            if (app.isCanPlayAudio) {
                app.buttonDownSound = app.phaser.add.audio('button_click');
                app.bubbleGrowSound = app.phaser.add.audio('bubble_grow');
                app.bubblePopSound = app.phaser.add.audio('bubble_pop');
                app.levelCompleteSound = app.phaser.add.audio('level_complete');
                app.levelFailedSound = app.phaser.add.audio('level_failed');
                app.mainThemeSound = app.phaser.add.audio('main_theme');
                app.mainThemeSound.play('', 0, app.isMusic ? 1 : 0, true);
            }

            /*setTimeout(function () { */run(); /*}, 3000);*/
        });
    }
    
    function run() {
        app.bgOver = app.phaser.add.group(this.canvas);
        app.bgOver.create(0, 0, 'game_atlas', 'bg_over_left');
        app.bgOver.create(0, 0, 'game_atlas', 'bg_over_top');
        app.bgOver.create(0, 700, 'game_atlas', 'bg_over_top');
        app.bgOver.create(536, 0, 'game_atlas', 'bg_over_left');
        app.levelMng = new LevelMng(app);
        app.createMenuState();
        //app.createPlayState();
        /*app.fpsText = app.phaser.add.text(10, 10, "FPS: 60", { font: '20px Verdana', fill: '#ffffff', align: 'left' });
         app.phaser.world.add(app.fpsText);*/
        resizeGame();
        
        app.phaser.cache.removeImage('loading');
        app.phaser.cache.removeImage('initializing');
        //app.phaser.cache.removeImage('logo_l');
        app.phaser.cache.removeImage('splash');
        txtLoading.destroy();
        txtLoading = null;
        txtLoadingValue.destroy();
        txtLoadingValue = null;
        /*spilLogoL.destroy();
        spilLogoL = null;*/
    }

    function update() {
        if (app.playState) {
            app.playState.update();
        }
        
        //if (app.fpsText) app.fpsText.setText(app.phaser.time.fps);
    }

    /*function render() {
        app.phaser.debug.line('orientation :' + picRotatePhone, 10, 10);
    }*/
    
    function calcScreenFit(aspectRatio, screenW, screenH, isCentering) {
        isCentering = isCentering == undefined ? false : true;
        
        var width = screenW;
        var height = screenH;

        // Тільки одному всесвіту відомо як воно працює!!!
        if (aspectRatio < 1 && screenW >= screenH) {
            width = Math.floor(screenH * aspectRatio);
        } else if (aspectRatio >= 1 && screenW <= screenH) {
            height = Math.floor(screenW / aspectRatio);
        } else {
            if (Math.floor(screenH * aspectRatio) > screenW) height = screenW / aspectRatio;
            else width = Math.floor(screenH * aspectRatio);
        }

        if (isCentering) return { x: (screenW - width) / 2, y: (screenH - height) / 2, width: width, height: height };
        return {x: 0, y: 0, width: width, height: height };
    }

    /*function openURL(url){
        var _a=document.createElement("a");
        _a.href=url;
        _a.target="_blank";
        var _div=document.getElementById("gm4html5_div_id");
        document.body.insertBefore(_a,_div);
        _a.click();
    }*/
    
}) ();