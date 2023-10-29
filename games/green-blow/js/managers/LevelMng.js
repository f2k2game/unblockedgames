/**
 * User: qzix13
 * Date: 27.12.13
 */

function LevelMng(app) {
    app.levelMng = this;
    this.app = app;
    this.total = LevelMng.levels.length;
    this.tutorial = null;
    var curr = cookie.get('lc');
    this.curr = curr || 1;
}

LevelMng.prototype.create = function (level) {
    level = level || this.curr;
    if (level < 1) level = 1;
    else if (level > this.total) level = 1;//this.total;
    this.curr = level;
    cookie.set('lc', level.toString());
    level--;
    
    var levelData = LevelMng.levels[level];
    var clicks = levelData.clicks;
    var bubbles = levelData.bubbles;
    var n = bubbles.length;
    
    /*var i = 0;
    var j = 0;
    var b;
    for (i = 0; i < this.app.playState.rows; i++) {
        for (j = 0; j < this.app.playState.cols; j++) {
            new Bubble(this.app, j, i, this.app.phaser.rnd.integerInRange(0, 4));
        }
    }*/
    for (var i = 0; i < n; i++) {
        var col = bubbles[i].c;
        var row = bubbles[i].r;
        var index = bubbles[i].i;
        new Bubble(this.app, col, row, index);
    }
    this.app.playState.resetLevelData(this.curr, clicks);
    
    if (level === 0) {
        if (this.tutorial) {
            this.tutorial.destroy();
            this.tutorial = null;
        }
        this.tutorial = this.app.phaser.add.child(this.app.playState.gameLayer, 
            this.app.playState.cellSize * 3 - this.app.playState.cellSize / 2,
            this.app.playState.cellSize * 4 - this.app.playState.cellSize / 2, 'tutorial_' + (this.app.phaser.device.desktop ? 'click' : 'tap'));
        this.tutorial.anchor.setTo(.5, .5);
        this.tutorial.scale.setTo(0.8, 0.8); 
    }

    if (window.HTML5API) HTML5API.levelStarted();
};

LevelMng.prototype.destroy = function () {
    if (this.app.playState === null) return;
    
    var i = 0, n = 0;
    var bubbles = this.app.playState._bubbles; 
    var bullets = this.app.playState._bullets; 
    for (i = 0, n = bubbles.length; i < n; i++) {
        bubbles[i].destroy();
    }
    bubbles.splice(0, n);

    for (i = 0, n = bullets.length; i < n; i++) {
        bullets[i].stop();
    }
    
    if (this.tutorial) {
        this.tutorial.destroy();
        this.tutorial = null;
    }
};

LevelMng.prototype.next = function () {
    this.destroy();
    this.create(++this.curr);
};


LevelMng.levels = [
    /** Description
     *  clicks - За яку максимальну к-сть кліків необхідно пройти левел.
     *  bubbles - масив із розташування та розмірами шариків.
     *  c - (col) колонка (0-4).
     *  r - (row) рядок (0-5).
     *  i - (index) Індекс розміру шарика (0-3).
     * */
    /* 1 */ { clicks: 1, bubbles: [ { c:2, r: 2, i:3 } ] },
    /* 2 */ { clicks: 1, bubbles: [ { c:1, r: 3, i:3 }, { c:3, r: 3, i:3 } ] },
    /* 3 */ { clicks: 1, bubbles: [ { c:2, r: 1, i:3 }, { c:2, r: 2, i:3 }, { c:2, r: 3, i:2 }, { c:2, r: 4, i:3 } ] },
    /* 4 */ { clicks: 2, bubbles: [ { c:0, r: 2, i:3 }, { c:0, r: 3, i:2 }, { c:2, r: 2, i:2 }, { c:2, r: 3, i:3 }, { c:4, r: 2, i:3 }, { c:4, r: 3, i:2 } ] },
    /* 5 */ { clicks: 1, bubbles: [ { c:1, r: 1, i:3 }, { c:1, r: 3, i:2 }, { c:1, r: 5, i:2 }, { c:2, r: 1, i:3 }, { c:2, r: 3, i:1 }, { c:2, r: 5, i:3 }, { c:3, r: 1, i:3 }, { c:3, r: 3, i:3 }, { c:3, r: 5, i:2 } ] },
    /* 6 */ { clicks: 1, bubbles: [ { c:1, r: 1, i:3 }, { c:1, r: 2, i:2 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:3 }, { c:2, r: 1, i:1 }, { c:2, r: 4, i:2 }, { c:3, r: 1, i:3 }, { c:3, r: 2, i:2 }, { c:3, r: 3, i:3 }, { c:3, r: 4, i:3 } ] },
    /* 7 */ { clicks: 2, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 1, i:3 }, { c:0, r: 2, i:2 }, { c:0, r: 4, i:3 }, { c:0, r: 5, i:2 }, { c:1, r: 2, i:3 }, { c:1, r: 3, i:1 }, { c:1, r: 4, i:3 }, { c:3, r: 2, i:3 }, { c:3, r: 3, i:1 }, { c:3, r: 4, i:3 }, { c:4, r: 0, i:2 }, { c:4, r: 1, i:3 }, { c:4, r: 2, i:2 }, { c:4, r: 4, i:3 }, { c:4, r: 5, i:2 } ] },
    /* 8 */ { clicks: 3, bubbles: [ { c:0, r: 3, i:2 }, { c:1, r: 0, i:3 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:1 }, { c:2, r: 0, i:1 }, { c:2, r: 1, i:2 }, { c:2, r: 3, i:0 }, { c:2, r: 4, i:3 }, { c:2, r: 5, i:3 }, { c:3, r: 0, i:3 }, { c:3, r: 3, i:3 }, { c:3, r: 4, i:2 }, { c:4, r: 3, i:2 } ] },
    /* 9 */ { clicks: 2, bubbles: [ { c:1, r: 1, i:2 }, { c:1, r: 2, i:1 }, { c:1, r: 4, i:3 }, { c:1, r: 5, i:1 }, { c:2, r: 1, i:3 }, { c:2, r: 2, i:3 }, { c:2, r: 4, i:2 }, { c:2, r: 5, i:3 }, { c:3, r: 1, i:2 }, { c:3, r: 2, i:1 }, { c:3, r: 4, i:3 }, { c:3, r: 5, i:1 } ] },
    /* 10 */ { clicks: 2, bubbles: [ { c:0, r: 0, i:3 }, { c:0, r: 2, i:2 }, { c:0, r: 3, i:1 }, { c:1, r: 1, i:3 }, { c:1, r: 4, i:3 }, { c:2, r: 1, i:2 }, { c:2, r: 2, i:3 }, { c:2, r: 3, i:3 }, { c:2, r: 4, i:0 }, { c:2, r: 5, i:3 }, { c:3, r: 1, i:3 }, { c:3, r: 4, i:3 }, { c:4, r: 0, i:3 }, { c:4, r: 2, i:1 }, { c:4, r: 3, i:2 } ] },
    /* 11 */ { clicks: 4, bubbles: [ { c:1, r: 1, i:2 }, { c:1, r: 4, i:3 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:1 }, { c:2, r: 2, i:2 }, { c:2, r: 3, i:3 }, { c:2, r: 4, i:0 }, { c:2, r: 5, i:3 }, { c:3, r: 1, i:2 }, { c:3, r: 4, i:3 } ] },
    /* 12 */ { clicks: 3, bubbles: [ { c:0, r: 1, i:2 }, { c:0, r: 3, i:3 }, { c:0, r: 5, i:2 }, { c:1, r: 0, i:3 }, { c:1, r: 2, i:3 }, { c:1, r: 4, i:1 }, { c:2, r: 1, i:0 }, { c:2, r: 3, i:3 }, { c:2, r: 5, i:3 }, { c:3, r: 0, i:3 }, { c:3, r: 2, i:3 }, { c:3, r: 4, i:1 }, { c:4, r: 1, i:2 }, { c:4, r: 3, i:3 }, { c:4, r: 5, i:2 } ] },
    /* 13 */ { clicks: 2, bubbles: [ { c:0, r: 1, i:2 }, { c:0, r: 4, i:3 }, { c:1, r: 0, i:3 }, { c:1, r: 1, i:2 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:0 }, { c:1, r: 5, i:2 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:3 }, { c:2, r: 2, i:2 }, { c:2, r: 3, i:3 }, { c:3, r: 0, i:1 }, { c:3, r: 1, i:2 }, { c:3, r: 3, i:3 }, { c:3, r: 4, i:0 }, { c:3, r: 5, i:2 }, { c:4, r: 1, i:3 }, { c:4, r: 4, i:3 } ] },
    /* 14 */ { clicks: 3, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 5, i:2 }, { c:1, r: 0, i:2 }, { c:1, r: 1, i:2 }, { c:1, r: 2, i:2 }, { c:1, r: 3, i:2 }, { c:1, r: 4, i:2 }, { c:1, r: 5, i:2 }, { c:2, r: 2, i:1 }, { c:2, r: 3, i:3 }, { c:3, r: 0, i:2 }, { c:3, r: 1, i:2 }, { c:3, r: 2, i:2 }, { c:3, r: 3, i:2 }, { c:3, r: 4, i:2 }, { c:3, r: 5, i:2 }, { c:4, r: 0, i:2 }, { c:4, r: 5, i:2 } ] },
    /* 15 */ { clicks: 3, bubbles: [ { c:0, r: 1, i:3 }, { c:0, r: 2, i:2 }, { c:0, r: 3, i:3 }, { c:0, r: 4, i:3 }, { c:0, r: 5, i:1 }, { c:1, r: 1, i:2 }, { c:1, r: 2, i:1 }, { c:1, r: 5, i:3 }, { c:2, r: 1, i:1 }, { c:2, r: 3, i:2 }, { c:2, r: 5, i:3 }, { c:3, r: 1, i:3 }, { c:3, r: 4, i:0 }, { c:3, r: 5, i:2 }, { c:4, r: 1, i:2 }, { c:4, r: 2, i:2 }, { c:4, r: 3, i:3 }, { c:4, r: 4, i:2 }, { c:4, r: 5, i:1 } ] },
    /* 16 */ { clicks: 3, bubbles: [ { c:0, r: 0, i:3 }, { c:0, r: 1, i:2 }, { c:0, r: 2, i:1 }, { c:0, r: 3, i:0 }, { c:1, r: 0, i:0 }, { c:1, r: 2, i:3 }, { c:1, r: 5, i:3 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:2 }, { c:2, r: 2, i:3 }, { c:2, r: 3, i:1 }, { c:2, r: 4, i:2 }, { c:2, r: 5, i:3 }, { c:3, r: 0, i:0 }, { c:3, r: 2, i:3 }, { c:3, r: 5, i:3 }, { c:4, r: 0, i:3 }, { c:4, r: 1, i:2 }, { c:4, r: 2, i:1 }, { c:4, r: 3, i:0 } ] },
    /* 17 */ { clicks: 5, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 2, i:2 }, { c:0, r: 3, i:1 }, { c:0, r: 5, i:2 }, { c:1, r: 1, i:3 }, { c:1, r: 4, i:3 }, { c:2, r: 2, i:2 }, { c:2, r: 3, i:3 }, { c:3, r: 1, i:3 }, { c:3, r: 4, i:2 }, { c:4, r: 0, i:3 }, { c:4, r: 2, i:1 }, { c:4, r: 3, i:0 }, { c:4, r: 5, i:3 } ] },
    /* 18 */ { clicks: 4, bubbles: [ { c:0, r: 2, i:1 }, { c:0, r: 3, i:2 }, { c:1, r: 1, i:2 }, { c:1, r: 2, i:0 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:2 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:3 }, { c:2, r: 4, i:3 }, { c:2, r: 5, i:2 }, { c:3, r: 1, i:2 }, { c:3, r: 2, i:3 }, { c:3, r: 3, i:2 }, { c:3, r: 4, i:2 }, { c:4, r: 2, i:0 }, { c:4, r: 3, i:1 } ] },
    /* 19 */ { clicks: 5, bubbles: [ { c:0, r: 1, i:2 }, { c:0, r: 2, i:1 }, { c:1, r: 0, i:2 }, { c:1, r: 2, i:1 }, { c:1, r: 3, i:2 }, { c:1, r: 4, i:3 }, { c:1, r: 5, i:2 }, { c:2, r: 1, i:2 }, { c:2, r: 3, i:3 }, { c:2, r: 4, i:0 }, { c:3, r: 0, i:2 }, { c:3, r: 2, i:1 }, { c:3, r: 3, i:2 }, { c:3, r: 4, i:3 }, { c:3, r: 5, i:2 }, { c:4, r: 1, i:2 }, { c:4, r: 2, i:1 } ] },
    /* 20 */ { clicks: 4, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 5, i:3 }, { c:1, r: 0, i:1 }, { c:1, r: 1, i:2 }, { c:1, r: 4, i:2 }, { c:1, r: 5, i:1 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:3 }, { c:2, r: 2, i:0 }, { c:2, r: 3, i:2 }, { c:2, r: 4, i:3 }, { c:2, r: 5, i:2 }, { c:3, r: 0, i:1 }, { c:3, r: 1, i:2 }, { c:3, r: 4, i:1 }, { c:3, r: 5, i:0 }, { c:4, r: 0, i:2 }, { c:4, r: 5, i:3 } ] },
    /* 21 */ { clicks: 5, bubbles: [ { c:0, r: 1, i:2 }, { c:0, r: 3, i:3 }, { c:1, r: 0, i:2 }, { c:1, r: 1, i:1 }, { c:1, r: 2, i:2 }, { c:1, r: 3, i:0 }, { c:1, r: 4, i:3 }, { c:2, r: 1, i:2 }, { c:2, r: 3, i:3 }, { c:3, r: 0, i:2 }, { c:3, r: 1, i:0 }, { c:3, r: 2, i:3 }, { c:3, r: 3, i:1 }, { c:3, r: 4, i:3 }, { c:4, r: 1, i:2 }, { c:4, r: 3, i:3 } ] },
    /* 22 */ { clicks: 6, bubbles: [ { c:0, r: 0, i:3 }, { c:0, r: 4, i:3 }, { c:0, r: 5, i:1 }, { c:1, r: 2, i:2 }, { c:1, r: 3, i:1 }, { c:1, r: 4, i:3 }, { c:2, r: 0, i:0 }, { c:2, r: 1, i:1 }, { c:2, r: 2, i:2 }, { c:2, r: 3, i:1 }, { c:2, r: 4, i:3 }, { c:2, r: 5, i:1 }, { c:3, r: 2, i:2 }, { c:3, r: 3, i:1 }, { c:3, r: 4, i:3 }, { c:4, r: 0, i:3 }, { c:4, r: 4, i:3 }, { c:4, r: 5, i:1 } ] },
    /* 23 */ { clicks: 6, bubbles: [ { c:0, r: 1, i:2 }, { c:0, r: 2, i:3 }, { c:0, r: 5, i:2 }, { c:1, r: 2, i:0 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:2 }, { c:2, r: 0, i:2 }, { c:2, r: 1, i:3 }, { c:2, r: 5, i:1 }, { c:3, r: 2, i:0 }, { c:3, r: 3, i:3 }, { c:3, r: 4, i:2 }, { c:4, r: 1, i:2 }, { c:4, r: 2, i:3 }, { c:4, r: 5, i:2 } ] },
    /* 24 */ { clicks: 4, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 1, i:2 }, { c:0, r: 2, i:2 }, { c:0, r: 3, i:2 }, { c:1, r: 0, i:2 }, { c:1, r: 2, i:1 }, { c:1, r: 4, i:3 }, { c:1, r: 5, i:2 }, { c:2, r: 0, i:2 }, { c:2, r: 3, i:0 }, { c:2, r: 4, i:3 }, { c:2, r: 5, i:2 }, { c:3, r: 0, i:2 }, { c:3, r: 2, i:1 }, { c:3, r: 4, i:3 }, { c:3, r: 5, i:2 }, { c:4, r: 0, i:2 }, { c:4, r: 1, i:2 }, { c:4, r: 2, i:2 }, { c:4, r: 3, i:2 } ] },
    /* 25 */ { clicks: 4, bubbles: [ { c:0, r: 0, i:3 }, { c:0, r: 3, i:2 }, { c:0, r: 4, i:2 }, { c:0, r: 5, i:3 }, { c:1, r: 1, i:1 }, { c:1, r: 3, i:3 }, { c:1, r: 5, i:2 }, { c:2, r: 0, i:2 }, { c:2, r: 2, i:1 }, { c:2, r: 3, i:2 }, { c:2, r: 5, i:0 }, { c:3, r: 1, i:1 }, { c:3, r: 3, i:3 }, { c:3, r: 5, i:2 }, { c:4, r: 0, i:3 }, { c:4, r: 3, i:2 }, { c:4, r: 4, i:2 }, { c:4, r: 5, i:3 } ] },
    /* 26 */ { clicks: 4, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 1, i:2 }, { c:0, r: 4, i:3 }, { c:0, r: 5, i:1 }, { c:1, r: 1, i:3 }, { c:1, r: 2, i:2 }, { c:1, r: 3, i:2 }, { c:1, r: 4, i:0 }, { c:2, r: 2, i:1 }, { c:2, r: 3, i:2 }, { c:3, r: 1, i:0 }, { c:3, r: 2, i:2 }, { c:3, r: 3, i:2 }, { c:3, r: 4, i:3 }, { c:4, r: 0, i:1 }, { c:4, r: 1, i:3 }, { c:4, r: 4, i:2 }, { c:4, r: 5, i:2 } ] },
    /* 27 */ { clicks: 5, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 2, i:1 }, { c:0, r: 4, i:2 }, { c:1, r: 0, i:3 }, { c:1, r: 2, i:3 }, { c:1, r: 4, i:1 }, { c:2, r: 0, i:1 }, { c:2, r: 1, i:2 }, { c:2, r: 2, i:1 }, { c:2, r: 3, i:2 }, { c:2, r: 4, i:1 }, { c:2, r: 5, i:3 }, { c:3, r: 0, i:3 }, { c:3, r: 2, i:3 }, { c:3, r: 4, i:1 }, { c:4, r: 0, i:2 }, { c:4, r: 2, i:1 }, { c:4, r: 4, i:2 } ] },
    /* 28 */ { clicks: 5, bubbles: [ { c:0, r: 0, i:1 }, { c:0, r: 4, i:2 }, { c:0, r: 5, i:2 }, { c:1, r: 0, i:3 }, { c:1, r: 2, i:1 }, { c:1, r: 3, i:3 }, { c:1, r: 5, i:1 }, { c:2, r: 2, i:2 }, { c:2, r: 5, i:2 }, { c:3, r: 0, i:1 }, { c:3, r: 2, i:3 }, { c:3, r: 3, i:2 }, { c:3, r: 5, i:0 }, { c:4, r: 0, i:3 }, { c:4, r: 4, i:1 }, { c:4, r: 5, i:3 } ] },
    /* 29 */ { clicks: 5, bubbles: [ { c:0, r: 0, i:2 }, { c:0, r: 5, i:2 }, { c:1, r: 0, i:2 }, { c:1, r: 1, i:2 }, { c:1, r: 2, i:2 }, { c:1, r: 4, i:2 }, { c:2, r: 1, i:2 }, { c:2, r: 2, i:0 }, { c:2, r: 4, i:2 }, { c:2, r: 5, i:2 }, { c:3, r: 0, i:2 }, { c:3, r: 1, i:2 }, { c:3, r: 2, i:2 }, { c:3, r: 4, i:2 }, { c:4, r: 0, i:2 }, { c:4, r: 5, i:2 } ] },
    /* 30 */ { clicks: 3, bubbles: [ { c:0, r: 3, i:3 }, { c:1, r: 0, i:3 }, { c:1, r: 1, i:3 }, { c:1, r: 2, i:0 }, { c:1, r: 3, i:3 }, { c:1, r: 4, i:3 }, { c:1, r: 5, i:0 }, { c:2, r: 0, i:3 }, { c:2, r: 1, i:0 }, { c:2, r: 4, i:0 }, { c:2, r: 5, i:3 }, { c:3, r: 0, i:0 }, { c:3, r: 1, i:3 }, { c:3, r: 2, i:3 }, { c:3, r: 3, i:0 }, { c:3, r: 4, i:3 }, { c:3, r: 5, i:3 }, { c:4, r: 2, i:3 } ] },
];
