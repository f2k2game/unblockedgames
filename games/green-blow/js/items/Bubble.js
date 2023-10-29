/**
 * User: qzix13
 * Date: 15.12.13
 */

function Bubble(app, col, row, sizeIndex) {
    
    this.app = app;
    this.initSizeIndex = this.sizeIndex = sizeIndex;
    
    var cellSize = app.playState.cellSize;
    var x = col * cellSize + cellSize / 2;
    var y = row * cellSize + cellSize / 2;
    var color = app.playState.bubbleColors[sizeIndex];
    var size = app.playState.bubbleSizes[sizeIndex];

    this.sprite = app.playState.bubblesGroup.create(x, y, 'game_atlas');
    this.sprite.anchor.setTo(0.5, 0.5);
    for (var i = sizeIndex; i < 4; i++) this.sprite.animations.add('blink_' + i, app.playState.bubbleBlinkAnim[i], 18, false);
    this.sprite.play('blink_' + sizeIndex);
    this.sprite.animations.stop();
    this.sprite.body.immovable = true;
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.onDown, this);
    this.sprite.self = this;

    this.setSizeByIndex(sizeIndex);

    var currScaleX = this.sprite.scale.x;
    var currScaleY = this.sprite.scale.y;
    this.bubbling = new TimelineLite();
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX + .1, y: currScaleY - .1 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX - .1, y: currScaleY + .1 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX + .07, y: currScaleY - .07 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX - .07, y: currScaleY + .07 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX + .035, y: currScaleY - .035 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX - .035, y: currScaleY + .035 } );
    this.bubbling.to(this.sprite.scale, 0.1, { x: currScaleX, y: currScaleY } );
    this.bubbling.gotoAndStop(0.0);
    
    this.popped = false;
    this.destroyed = false;
    
    app.playState.addBubble(this);
}

Bubble.prototype.destroy = function () {
    this.destroyed = true;
    this.app = null;
    this.sprite.destroy();
    this.sprite = null;
    this.bubbling.clear();
    this.bubbling = null;
    this.popped = true;
};

/**
 * Збільшити кульку.
 * @param bullet Пуля, яка влучила. Може бути null, якщо користувач клікнув по кульці.  
 */
Bubble.prototype.grow = function (bullet) {
    if (this.destroyed) return;
    
    if (this.popped) {
        if (bullet) bullet.continue();
        return;
    }
    if (bullet) bullet.stop();
    var index = ++this.sizeIndex;
    if (index >= 4) this.pop();
    else {
        this.setColorByIndex(index);
        this.setSizeByIndex(index);
        this.bubbling.restart();
        if (this.app.isCanPlayAudio && this.app.isSound) this.app.bubbleGrowSound.play();
    }
};

Bubble.prototype.pop = function () {
    if (this.destroyed) return;
    if (this.popped) return;
    this.popped = true;
    this.sprite.exists = this.sprite.alive = false;
    
    var _pop_ = function () {
        if (this.destroyed) return;
        this.sprite.visible = false;
    
        this.app.playState.addRequest(function() {
            if (this.destroyed) return;
            this.sprite.group.remove(this.sprite);
        }, this);
    
        for (var i = 0; i < 4; i++) {
            var bullet = this.app.playState.getBullet();
            bullet.start(this.sprite.x, this.sprite.y, this.app.playState.bulletDirections[i]);
        }
        this.app.playState.addOnePoppedBubble();
        if (this.app.isCanPlayAudio && this.app.isSound) this.app.bubblePopSound.play();
    }
    var s = this.app.playState.bulletSize;
    TweenLite.to(this.sprite, 0.15, { width: s, height: s, onComplete: _pop_, onCompleteScope: this } );
};

Bubble.prototype.onDown = function () {
    if (this.destroyed) return;
    if (this.app.playState.subOneClick()) {
        this.grow();
    } else {
        this.app.playState.toolbar.bubblingClicks();
    }
};

Bubble.prototype.reset = function () {
    if (this.destroyed) return;
    TweenLite.killTweensOf(this.sprite);
    var index = this.sizeIndex = this.initSizeIndex;
    this.bubbling.gotoAndStop(0.0);
    this.setColorByIndex(index, true);
    this.setSizeByIndex(index);

    this.sprite.visible = this.sprite.exists = this.sprite.alive = true;
    this.popped = false;
    this.app.playState.bubblesGroup.add(this.sprite);
};

Bubble.prototype.setColorByIndex = function (index, stopAnimation) {
    if (this.destroyed) return;
    if (stopAnimation === undefined) stopAnimation = false;
    
    this.sprite.play('blink_' + index);
    this.sprite.animations.stop(null, true);
};

Bubble.prototype.setSizeByIndex = function (index) {
    if (this.destroyed) return;
    var size = this.app.playState.bubbleSizes[index];
    var color = this.app.playState.bubbleColors[index]
    this.sprite.frameName = 'bubble_' + color + '_0001';
    this.sprite.width = this.sprite.height = size;
    this.sprite.body.setSize(size * 0.7, size * 0.7);
};

Bubble.prototype.makeBlinking = function () {
    if (this.destroyed) return;
    if (this.popped) return;
    this.sprite.play('blink_' + this.sizeIndex);
};
