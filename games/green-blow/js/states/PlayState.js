/**
 * User: qzix13
 * Date: 12.12.13
 */

function PlayState(app) {
    
    app.playState = this;
    this.app = app;
    this.toolbarMaxHeight = 70;
    this.cols = 5;
    this.rows = 6;
    this.cellSize = 100;
    this.bulletSize = 25;
    this.bulletDirections = ['left', 'right', 'up', 'down'];
    this.bubbleSizes = [65, 75, 85, 95]; // from smaller to biggest (green, blue, yellow, red).
    this.bubbleColors = ['green', 'blue', 'yellow', 'red'];
    this.bubbleBlinkAnim = [
        Phaser.Animation.generateFrameNames('bubble_green_', 1, 9, '', 4),
        Phaser.Animation.generateFrameNames('bubble_blue_', 1, 9, '', 4),
        Phaser.Animation.generateFrameNames('bubble_yellow_', 1, 9, '', 4),
        Phaser.Animation.generateFrameNames('bubble_red_', 1, 9, '', 4)
    ];

    this.canvas = app.phaser.add.group(app.phaser.world, 'play_state_canvas');
    this.bg = app.phaser.add.tileSprite(0, 0, 640, 960, 'bg_play');
    this.canvas.add(this.bg);
    this.gameLayer = app.phaser.add.group(this.canvas);
    this.bulletsGroup = app.phaser.add.group(this.gameLayer);
    this.bubblesGroup = app.phaser.add.group(this.gameLayer);
    this.toolbarGroup = app.phaser.add.group(this.gameLayer);
    this.pauseDlgGroup = app.phaser.add.group(this.canvas);
    this.completeDlgGroup = app.phaser.add.group(this.canvas);
    this.canvas.add(app.bgOver._container);
    
    this.toolbar = new Toolbar(app);
    this.pauseDlg = new PauseDlg(app);
    this.pauseDlg.hide();
    this.completeDlg = new CompleteDlg(app);
    
    this._bullets = [];
    this._bulletsCache = [];
    this._bubbles = [];
    this._requests = []; // { callback:function, callbackContext:Object, callbackArgs:Array }
    this._addRequestsBlocked = false; // блокується в середині блоку обробки запитів.
    this._isCheckCollide = true;
    this._idleDelay = 0;
    this._bulletsZeroDelay = 0;
    this._leftClicks = 0;
    this._levelClicks = 3;
    this._score = 0;
    this._countPoppedBubblesCombo = 0;
    this._countPoppedBubbles = 0;
    this._pause = false;
    
    app.levelMng.create(app.levelMng.curr);
    this.resize();
}

PlayState.prototype.destroy = function () {
    var i = 0, n = 0;
    this.app.playState = null;
    this.app = null;
    this.bulletDirections = null;
    this.bubbleSizes = null;
    this.bubbleColors = null;
    this.bubbleBlinkAnim = null;
    
    for (i = 0, n = this._bubbles.length; i < n; i++) {
        this._bubbles[i].destroy();
    }

    for (i = 0, n = this._bullets.length; i < n; i++) {
        this._bullets[i].destroy();
    }

    for (i = 0, n = this._bulletsCache.length; i < n; i++) {
        this._bulletsCache[i].destroy();
    }

    this.canvas.destroy();
    this.canvas = null;
    this.gameLayer.destroy();
    this.gameLayer = null;
    this.bg.destroy();
    this.bg = null;
    this.bulletsGroup.destroy();
    this.bulletsGroup = null;
    this.bubblesGroup.destroy();
    this.bubblesGroup = null;
    this.toolbarGroup.destroy();
    this.toolbarGroup = null;
    this.pauseDlgGroup.destroy();
    this.pauseDlgGroup = null;
    this.toolbar.destroy();
    this.toolbar = null;
    this.pauseDlg.destroy();
    this.pauseDlg = null;
    this.completeDlg.destroy();
    this.completeDlg = null;
    
    this._bullets = null;
    this._bulletsCache = null;
    this._bubbles = null;
    this._requests = null;
};

PlayState.prototype.resize = function () {
    var scale = this.app.scale;
    this.bg.scale.x = this.bg.scale.y = scale;
    this.bg.y = this.app.fitSizes.height - 960 * scale;

    this.gameLayer.scale.setTo(scale, scale);
    this.gameLayer.x = (this.app.originSizes.width - this.cols * this.cellSize) / 2 * scale;
    this.gameLayer.y = (this.app.fitSizes.height - (this.rows * this.cellSize * scale) - this.toolbarMaxHeight * scale) / 2;

    this.pauseDlgGroup.scale.setTo(scale, scale);
    //this.pauseDlgGroup.x = (this.app.originSizes.width - ) / 2 * scale;
    this.pauseDlgGroup.y = (this.app.fitSizes.height - this.app.originSizes.height * scale) / 2;
    this.completeDlgGroup.scale.setTo(scale, scale);
    this.completeDlgGroup.x = (this.app.fitSizes.width - 400 * scale) / 2;
    this.completeDlgGroup.y = (this.app.fitSizes.height - 250 * scale) / 2.2;
};

PlayState.prototype.update = function () {
    if (this._pause) return;
    var i = 0, j = 0, n = 0, m = 0;
    
    if (this._isCheckCollide && this._bullets.length > 0) {
        var bullet, bubble;
        for (i = 0, n = this._bullets.length; i < n; i++) {
            bullet = this._bullets[i].sprite;
            for (j = 0, m = this._bubbles.length; j < m; j++) {
                bubble = this._bubbles[j].sprite;
                if (this.distance(bullet.x, bullet.y, bubble.x, bubble.y) < this.bulletSize) {
                    bullet.self.pause();
                    bubble.self.grow(bullet.self);
                }
            }
        }
        
        this._bulletsZeroDelay = 0;
    } else {
        this.writeComboScore();
        this._bulletsZeroDelay++;
        if (this._bulletsZeroDelay > 20 && this._leftClicks <= 0) this.completeDlg.show('txt_level_failed', this._score);
    }
    
    this._idleDelay++;
    if (this._idleDelay > 300 / this._bubbles.length) {
        n = this.app.phaser.rnd.integerInRange(1, 3);
        for (i = 0; i < n; i++) {
            var numBubble = this.app.phaser.rnd.integerInRange(0, this._bubbles.length);
            this._bubbles[numBubble].makeBlinking();
        }
        this._idleDelay = 0;
    }
    
    // Перевіряємо чи вилетіли кулі за екран.
    var n = this._bullets.length;
    var i = 0;
    var gameWidth = this.app.originSizes.width;
    var gameHeight = this.app.originSizes.height;
    for (i = 0; i < n; i++) {
        var bullet = this._bullets[i];
        var bulletSpr = bullet.sprite;

        var x = bulletSpr.x;
        var y = bulletSpr.y + this.gameLayer.y;
        var size = bulletSpr.width + 50;
        if (x < -size || x > gameWidth + size
            || y < -size || y > gameHeight) {
            bullet.stop();
        }

        if (bullet.direction == 'left' || bullet.direction == 'right') bulletSpr.y = bullet.initY;
        else if (bullet.direction == 'up' || bullet.direction == 'down') bulletSpr.x = bullet.initX;
    }
    
    // requests
    if (this._requests.length > 0) {
        this._addRequestsBlocked = true;
        var n = this._requests.length;
        for (i = 0; i < n; i++) {
            if (this._requests[i] == null) continue;
            var callback = this._requests[i].callback;
            var callbackContext = this._requests[i].callbackContext;
            var callbackArgs = this._requests[i].callbackArgs;
            callback.call(callbackContext, callbackArgs);
        }
        this._requests.splice(0, n);
        this._addRequestsBlocked = false;
    }
};

PlayState.prototype.addBubble = function (bubble) {
    var index = this._bubbles.indexOf(bubble, 0);
    if (index < 0) this._bubbles[this._bubbles.length] = bubble;
};

PlayState.prototype.addBullet = function (bullet) {
    var index = this._bullets.indexOf(bullet, 0);
    if (index < 0) this._bullets[this._bullets.length] = bullet;

    index = this._bulletsCache.indexOf(bullet, 0);
    if (index >= 0) this._bulletsCache.splice(index, 1);
};

PlayState.prototype.addBulletInCache = function (bubble) {
    var index = this._bulletsCache.indexOf(bubble, 0);
    if (index < 0) this._bulletsCache[this._bulletsCache.length] = bubble;

    index = this._bullets.indexOf(bubble, 0);
    if (index >= 0) this._bullets.splice(index, 1);
};

PlayState.prototype.addRequest = function (callback, callbackContext, callbackArgs) {
    if (this._addRequestsBlocked) throw 'Adding requests blocked.'
    
    callbackContext = callbackContext || null;
    callbackArgs = callbackArgs || null; 
    if (callback == null) return;
    this._requests[this._requests.length] = { 
        callback: callback, 
        callbackContext: callbackContext, 
        callbackArgs: callbackArgs 
    };
};

PlayState.prototype.getBullet = function () {
    var bullet = this._bulletsCache.pop();
    if (bullet == null) bullet = new Bullet(this.app);
    return bullet;
};

PlayState.prototype.pause = function (isPause) {
    this._pause = isPause;
    
    var i = 0, n = 0;
    if (this._bullets) {
        n = this._bullets.length;
        for (i = 0; i < n; i++) {
            if (isPause) this._bullets[i].pause();
            else this._bullets[i].continue();
        }
    }
};

PlayState.prototype.reset = function () {
    this._isCheckCollide = false;
    var i = 0;
    var n = this._bullets.length;
    for (i = 0; i < n; i++) this._bullets[i].stop();
    n = this._bubbles.length;
    for (i = 0; i < n; i++) this._bubbles[i].reset();

    this.resetLevelData(this.app.levelMng.curr, this._levelClicks);
    this._requests.splice(0, n);
    this._addRequestsBlocked = false;
    this._isCheckCollide = true;
};

PlayState.prototype.resetLevelData = function (level, clicks) {
    this.toolbar.setScore(this._score = 0);
    this.toolbar.setClicks(this._leftClicks = this._levelClicks = clicks);
    this.toolbar.setLevel(level);
    this.toolbar.hideCombo();
    this._countPoppedBubblesCombo = 0;
    this._countPoppedBubbles = 0;
};

PlayState.prototype.addOnePoppedBubble = function () {
    if (++this._countPoppedBubblesCombo >= 4) {
        this.toolbar.setCombo(this.getComboScore());
    }
    this.toolbar.setScore(this._score += 75);
    
    this._countPoppedBubbles++;
    if (this._countPoppedBubbles >= this._bubbles.length) {
        this.writeComboScore();
        if (this.app.levelMng.curr >= this.app.levelMng.total) {
            this.completeDlg.show('txt_congratulations', this._score);
        } else {
            this.completeDlg.show('txt_level_complete', this._score);
        }
    }
};

PlayState.prototype.subOneClick = function () {
    this._bulletsZeroDelay = 0;
    this.writeComboScore();
    var canClick = this._leftClicks-- > 0;
    if (this._leftClicks < 0) this._leftClicks = 0;
    this.toolbar.setClicks(this._leftClicks);
    return canClick;
};

PlayState.prototype.writeComboScore = function () {
    if (this._countPoppedBubblesCombo == 0) return;
    // Додати бали за комбо.
    if (this._countPoppedBubblesCombo >= 4) {
        this.toolbar.setScore(this._score += this.getComboScore());
    }
    this._countPoppedBubblesCombo = 0;
    this.toolbar.hideCombo();
};

PlayState.prototype.getComboScore = function () {
    return this._countPoppedBubblesCombo * (5 + this._countPoppedBubblesCombo * 5);
};

PlayState.prototype.distance = function (x1, y1, x2, y2) {
    var dX = x1 - x2;
    var dY = y1 - y2;
    return Math.sqrt(dX * dX + dY * dY);
};