/**
 * User: qzix13
 * Date: 18.12.13
 */

function Bullet(app) {
    this.app = app;
    this.sprite = new Phaser.Sprite(app.phaser, 0, 0, 'game_atlas', 'bullet');
    this.sprite.visible = this.sprite.exists = this.sprite.alive = false;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.width = this.sprite.height = app.playState.bulletSize;
    this.sprite.body.allowRotation = false;
    this.sprite.body.allowGravity = false;
    this.speed = 450;
    this.initX = -1;
    this.initY = -1;
    
    this.sprite.self = this;
    
    this.busy = false;
    this.destroyed = false;
}

Bullet.prototype.destroy = function () {
    this.destroyed = true;
    this.busy = true;
    this.app = null;
    this.sprite.destroy();
    this.sprite = null;
};

/**
 * Запуск/перезапуск кульки.
 * @param x Координата x
 * @param y Координата y
 * @param direction Напрямок руху (left|right|up|down)
 */
Bullet.prototype.start = function (x, y, direction) {
    if (this.destroyed) return;
    if (this.busy) return;
    this.busy = true;
    
    this.initX = this.sprite.x = x;
    this.initY = this.sprite.y = y;
    this.direction = direction;
    this.defineVel();
    
    this.app.playState.addRequest(function() {
        if (this.destroyed) return;
        this.sprite.visible = this.sprite.exists = this.sprite.alive = true;
        this.app.playState.bulletsGroup.add(this.sprite);
        this.app.playState.addBullet(this);
    }, this);
};

Bullet.prototype.pause = function () {
    if (this.destroyed) return;
    /*this.sprite.visible = */this.sprite.exists = this.sprite.alive = false;
    this.sprite.body.velocity.setTo(0, 0);
};

Bullet.prototype.continue = function () {
    if (this.destroyed) return;
    /*this.sprite.visible = */this.sprite.exists = this.sprite.alive = true;
    this.defineVel();
};

Bullet.prototype.stop = function () {
    if (this.destroyed) return;
    this.sprite.visible = this.sprite.exists = this.sprite.alive = false;
    this.sprite.body.velocity.setTo(0, 0);
    this.sprite.x = this.sprite.y = -100;

    this.app.playState.addRequest(function() {
        if (this.destroyed) return;
        this.busy = false;
        if (this.sprite.group) this.sprite.group.remove(this.sprite);
        this.app.playState.addBulletInCache(this);
    }, this);
    
};

Bullet.prototype.defineVel = function () {
    if (this.destroyed) return;
    if (this.direction == 'left') this.sprite.body.velocity.setTo(-this.speed, 0);
    else if (this.direction == 'right') this.sprite.body.velocity.setTo(this.speed, 0);
    else if (this.direction == 'up') this.sprite.body.velocity.setTo(0, -this.speed);
    else if (this.direction == 'down') this.sprite.body.velocity.setTo(0, this.speed);
};