onload = function() {
    'use strict';
    var $jscomp = {
        scope: {},
        inherits: function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            for (var d in b)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, d);
                    e && Object.defineProperty(a, d, e)
                } else
                    a[d] = b[d]
        }
    };
    $jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (c.get || c.set)
            throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
    ;
    $jscomp.getGlobal = function(a) {
        return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
    }
    ;
    $jscomp.global = $jscomp.getGlobal(this);
    $jscomp.polyfill = function(a, b, c, d) {
        if (b) {
            c = $jscomp.global;
            a = a.split(".");
            for (d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && $jscomp.defineProperty(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    ;
    $jscomp.polyfill("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, d) {
            var e = this.length || 0;
            0 > c && (c = Math.max(0, e + c));
            if (null == d || d > e)
                d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = a;
            return this
        }
    }, "es6-impl", "es3");
    function SfxrParams() {
        this.setSettings = function(a) {
            for (var b = 0; 24 > b; b++)
                this[String.fromCharCode(97 + b)] = a[b] || 0;
            .01 > this.c && (this.c = .01);
            a = this.b + this.c + this.e;
            .18 > a && (a = .18 / a,
            this.b *= a,
            this.c *= a,
            this.e *= a)
        }
    }
    function SfxrSynth() {
        this._params = new SfxrParams;
        var a, b, c, d, e, f, h, l, n, r, t, m;
        this.reset = function() {
            var a = this._params;
            d = 100 / (a.f * a.f + .001);
            e = 100 / (a.g * a.g + .001);
            f = 1 - a.h * a.h * a.h * .01;
            h = -a.i * a.i * a.i * 1E-6;
            a.a || (t = .5 - a.n / 2,
            m = 5E-5 * -a.o);
            l = 1 + a.l * a.l * (0 < a.l ? -.9 : 10);
            n = 0;
            r = 1 == a.m ? 0 : (1 - a.m) * (1 - a.m) * 2E4 + 32
        }
        ;
        this.totalReset = function() {
            this.reset();
            var d = this._params;
            a = d.b * d.b * 1E5;
            b = d.c * d.c * 1E5;
            c = d.e * d.e * 1E5 + 12;
            return 3 * ((a + b + c) / 3 | 0)
        }
        ;
        this.synthWave = function(V, K) {
            var g = this._params
              , L = 1 != g.s || g.v
              , x = g.v * g.v * .1
              , M = 1 + 3E-4 * g.w
              , u = g.s * g.s * g.s * .1
              , W = 1 + 1E-4 * g.t
              , X = 1 != g.s
              , Y = g.x * g.x
              , Z = g.g
              , N = g.q || g.r
              , aa = g.r * g.r * g.r * .2
              , O = g.q * g.q * (0 > g.q ? -1020 : 1020)
              , P = g.p ? ((1 - g.p) * (1 - g.p) * 2E4 | 0) + 32 : 0
              , ba = g.d
              , Q = g.j / 2
              , ca = g.k * g.k * .01
              , G = g.a
              , H = a
              , da = 1 / a
              , ea = 1 / b
              , fa = 1 / c
              , g = 5 / (1 + g.u * g.u * 20) * (.01 + u);
            .8 < g && (g = .8);
            for (var g = 1 - g, I = !1, R = 0, z = 0, A = 0, S = 0, E = 0, B, C = 0, p, v = 0, w, J = 0, k, T = 0, y, U = 0, F = Array(1024), D = Array(32), q = F.length; q--; )
                F[q] = 0;
            for (q = D.length; q--; )
                D[q] = 2 * Math.random() - 1;
            for (q = 0; q < K; q++) {
                if (I)
                    return q;
                P && ++T >= P && (T = 0,
                this.reset());
                r && ++n >= r && (r = 0,
                d *= l);
                f += h;
                d *= f;
                d > e && (d = e,
                0 < Z && (I = !0));
                p = d;
                0 < Q && (U += ca,
                p *= 1 + Math.sin(U) * Q);
                p |= 0;
                8 > p && (p = 8);
                G || (t += m,
                0 > t ? t = 0 : .5 < t && (t = .5));
                if (++z > H)
                    switch (z = 0,
                    ++R) {
                    case 1:
                        H = b;
                        break;
                    case 2:
                        H = c
                    }
                switch (R) {
                case 0:
                    A = z * da;
                    break;
                case 1:
                    A = 1 + 2 * (1 - z * ea) * ba;
                    break;
                case 2:
                    A = 1 - z * fa;
                    break;
                case 3:
                    A = 0,
                    I = !0
                }
                N && (O += aa,
                w = O | 0,
                0 > w ? w = -w : 1023 < w && (w = 1023));
                L && M && (x *= M,
                1E-5 > x ? x = 1E-5 : .1 < x && (x = .1));
                y = 0;
                for (var ga = 8; ga--; ) {
                    v++;
                    if (v >= p && (v %= p,
                    3 == G))
                        for (B = D.length; B--; )
                            D[B] = 2 * Math.random() - 1;
                    switch (G) {
                    case 0:
                        k = v / p < t ? .5 : -.5;
                        break;
                    case 1:
                        k = 1 - v / p * 2;
                        break;
                    case 2:
                        k = v / p;
                        k = 6.28318531 * (.5 < k ? k - 1 : k);
                        k = 1.27323954 * k + .405284735 * k * k * (0 > k ? 1 : -1);
                        k = .225 * ((0 > k ? -1 : 1) * k * k - k) + k;
                        break;
                    case 3:
                        k = D[Math.abs(32 * v / p | 0)]
                    }
                    L && (B = C,
                    u *= W,
                    0 > u ? u = 0 : .1 < u && (u = .1),
                    X ? (E += (k - C) * u,
                    E *= g) : (C = k,
                    E = 0),
                    C += E,
                    S += C - B,
                    k = S *= 1 - x);
                    N && (F[J % 1024] = k,
                    k += F[(J - w + 1024) % 1024],
                    J++);
                    y += k
                }
                y *= .125 * A * Y;
                V[q] = 1 <= y ? 32767 : -1 >= y ? -32768 : 32767 * y | 0
            }
            return K
        }
    }
    var synth = new SfxrSynth;
    window.jsfxr = function(a) {
        synth._params.setSettings(a);
        var b = synth.totalReset();
        a = new Uint8Array(4 * ((b + 1) / 2 | 0) + 44);
        var b = 2 * synth.synthWave(new Uint16Array(a.buffer,44), b)
          , c = new Uint32Array(a.buffer,0,44);
        c[0] = 1179011410;
        c[1] = b + 36;
        c[2] = 1163280727;
        c[3] = 544501094;
        c[4] = 16;
        c[5] = 65537;
        c[6] = 44100;
        c[7] = 88200;
        c[8] = 1048578;
        c[9] = 1635017060;
        c[10] = b;
        return a.buffer
    }
    ;
    var Camera = function(a, b, c) {
        this.ctx = a;
        this.sky = c;
        this.size = b;
        this.pos = new Vec;
        this.resize()
    };
    Camera.prototype.resize = function() {
        var a = this.size
          , b = this.ctx.canvas
          , c = b.clientWidth / b.clientHeight;
        1 < c ? (b.width = Math.round(a * c),
        b.height = a) : (b.width = a,
        b.height = Math.round(a / c))
    }
    ;
    Camera.prototype.render = function(a) {
        var b = this.ctx
          , c = b.canvas
          , d = c.width
          , c = c.height
          , e = a.canvas.width
          , f = a.canvas.width
          , h = Math.round(this.pos.x) - Math.round(d / 2)
          , l = Math.round(this.pos.y) - Math.round(c / 2)
          , n = 0
          , r = 0;
        b.fillStyle = this.sky;
        b.fillRect(0, 0, d, c);
        0 > h && (n = -h,
        h = 0);
        0 > l && (r = -l,
        l = 0);
        h + d > e && (d = e - h);
        l + c > f && (c = f - l);
        0 < d && 0 < c && b.drawImage(a.canvas, h, l, d, c, n, r, d, c)
    }
    ;
    var Game = function(a, b, c) {
        var d = location.search.match(/^\?(\d+)$/);
        this.store = JSON.parse(localStorage.getItem("theos") || '{"time": 0,"index":0}');
        this.index = parseInt(d ? d[1] : this.store.index);
        this.draw = a;
        this.cam = c;
        this.cfg = b;
        this.grid = 72;
        this.margin = 40;
        Sfx.add("key", [0, , .035, , .49, .17, , .37, , , , , , .52, , .44, , , 1, , , , , .5]).add("slide", [3, .52, 1, , 1, 1, 1, .6599, , , , -1, , , , , , , .44, , , .66, .5, .4]).add("jump", [0, , .16, , .18, .27, , .21, , , , , , .22, , , , , .74, , , , , .5]).add("won", [2, .005, .18, .13, .44, .51, , .35, .19, .02, .81, -.8, .89, .44, , .49, -.78, -.46, .99, , -.045, .012, .004, .35]).add("lose", [1, .003, .03, .02, .87, .22, , .016, -.16, , .08, -.36, .067, , .75, .04, -.75, .001, .73, -.016, .89, .24, -.19, .5]).add("boss", [1, .17, .19, .41, .38, .14, , .001, .001, , .96, .77, .31, , .077, .66, .5, .64, .99, .04, .38, .05, 6E-4, .4]).add("cog", [0, , .39, , , .27, , , , .53, .72, , -.8234, -.0142, -.0921, , , , 1, , -.0417, , , .3])
    };
    Game.prototype.update = function() {
        var a = this.scene
          , b = this.cam
          , c = 300;
        a.update();
        if (a.stoped) {
            var d = Date.now() - a.stoped;
            1E3 < d ? a.won ? this.next() : this.load() : c -= d / 20
        }
        b && b.size != c && (b.size = c,
        b.resize())
    }
    ;
    Game.prototype.render = function() {
        var a = this.scene
          , b = a.hero
          , c = this.draw
          , d = this.cam;
        a.render(c);
        d && (d.pos.add(b.pos.clone().sub(d.pos).div(4)),
        d.render(c.ctx))
    }
    ;
    Game.prototype.pos = function(a, b, c) {
        if (2 > a.length)
            return null;
        var d = this.margin
          , e = this.grid;
        c = d + (c || e / 2);
        b = d + (b || e / 2);
        return (new Vec(a.shift(),a.shift())).multiply(e).add(c, b)
    }
    ;
    Game.prototype.next = function() {
        window.dispatchEvent(new CustomEvent('BoredButtonGameOver'));
        var a = this.store
          , b = this.scene;
        a.time += b.stoped - b.started;
        ++this.index >= this.cfg.length && (this.index = 0,
        a.time = 0);
        this.load();
        a.index = this.index;
        localStorage.setItem("theos", JSON.stringify(a))
    }
    ;
    Game.prototype.load = function() {
        var a = this, b, c, d = new Room(this.grid,this.margin), e = [], f = [], h = this.index, l = this.cfg[h].split("|"), n = this.draw.ctx.canvas;
        l.forEach(function(h) {
            var l = h.substr(0, 1)
              , m = h.substr(1).split(",").map(parseFloat);
            switch (l) {
            case "H":
                b = new Hero(a.pos(m, 60),new Vec(n.width,n.height));
                m[0] && b.turn();
                break;
            case "M":
                d.map(m);
                break;
            case "G":
                d.glitch = m;
                break;
            case "D":
                c = new Door(a.pos(m, 56),a.pos(m, 56));
                break;
            case "C":
                e.push(new Cog(a.pos(m, 56),a.pos(m, 56)));
                break;
            case "E":
                e.push(new Evil(a.pos(m)));
                break;
            case "B":
                e.push(new Boss(a.pos(m)));
                break;
            case "R":
                e.push(new Rod(a.pos(m)));
                break;
            case "W":
                e.push(new Win(a.pos(m)));
                break;
            case "X":
                c = new Gate(a.pos(m),a.store.time);
                break;
            case "#":
                f.push(h.substr(1))
            }
        });
        Math.seed = h;
        this.scene = new Scene(b,d,c,e,f);
        this.cam && (this.cam.pos = b.pos.clone())
    }
    ;
    Game.prototype.tap = function() {
        var a = this.scene;
        a.started ? a.stoped || a.hero.jump() : a.start()
    }
    ;
    var Icon = function(a) {
        this.draw = new Draw(a)
    };
    Icon.prototype.render = function(a) {
        var b = this.draw
          , c = b.grad("#fc0", "#333", 12, -4, -4);
        b.scale(8).to(12, 12).begin().ellipse(11.3).fill(c).stroke().to(-3, 5).rect(6, 1, 0).end().to(0, -3).ellipse(5).fill(1).ellipse(2).fill(0).merge(!1, a)
    }
    ;
    var Item = function(a) {
        this.pos = a
    };
    Item.prototype.pre = function(a) {}
    ;
    Item.prototype.start = function() {}
    ;
    Item.prototype.stop = function() {}
    ;
    Item.prototype.update = function(a) {}
    ;
    Item.prototype.render = function(a) {}
    ;
    var Scene = function(a, b, c, d, e) {
        this.room = b;
        this.hero = a;
        this.exit = c;
        this.mobs = d || [];
        this.text = e || [];
        this.img = this.won = !1;
        this.stoped = this.started = 0
    };
    Scene.prototype.render = function(a) {
        a.clear();
        this.img ? a.img(this.img) : (this.room.pre(a),
        this.exit.pre(a),
        this.mobs.forEach(function(b) {
            return b.pre(a)
        }),
        this.img = a.merge());
        this.exit.render(a);
        this.mobs.forEach(function(b) {
            return b.render(a)
        });
        this.hero.render(a);
        !this.started && 0 < this.text.length && a.begin().to(this.hero.pos.clone().add(-16, -22)).text(this.text, 0, 5, 1).end()
    }
    ;
    Scene.prototype.start = function() {
        this.started = Date.now();
        this.hero.start();
        this.exit.start();
        this.mobs.forEach(function(a) {
            return a.start()
        })
    }
    ;
    Scene.prototype.stop = function() {
        this.stoped = Date.now();
        this.hero.stop();
        this.exit.stop();
        this.mobs.forEach(function(a) {
            return a.stop()
        })
    }
    ;
    Scene.prototype.update = function() {
        var a = this.hero
          , b = this.room
          , c = this.exit;
        !this.stoped && this.started && ((a.update(b),
        this.mobs.forEach(function(c) {
            return c.update(a, b)
        }),
        a.alive) ? c.update(a) && (this.won = !0,
        Sfx.play("won"),
        this.stop()) : (Sfx.play("lose"),
        this.stop()))
    }
    ;
    function $(a, b) {
        b = b || document;
        return b.querySelector(a)
    }
    function on(a, b, c) {
        b.split(",").forEach(function(b) {
            a.addEventListener(b.trim(), c, !1)
        })
    }
    Math.seed = 6;
    Math.rnd = function(a, b) {
        b = b || 0;
        Math.seed = (9301 * Math.seed + 49297) % 233280;
        return b + Math.seed / 233280 * ((a || 1) - b)
    }
    ;
    var Sfx = function() {};
    Sfx.add = function(a, b) {
        b = jsfxr(b);
        Sfx.ctx || (Sfx.ctx = window.AudioContext ? new AudioContext : new webkitAudioContext,
        Sfx.buffer = {},
        Sfx.master = Sfx.ctx.createGain(),
        Sfx.master.connect(Sfx.ctx.destination));
        Sfx.ctx.decodeAudioData(b, function(b) {
            Sfx.buffer[a] = b
        });
        return Sfx
    }
    ;
    Sfx.play = function(a, b) {
        if (Sfx.buffer[a]) {
            var c = Sfx.ctx.createBufferSource();
            c.mixer = Sfx.ctx.createGain();
            c.mixer.connect(Sfx.master);
            c.loop = b || !1;
            c.buffer = Sfx.buffer[a];
            c.connect(c.mixer);
            c.start(Sfx.ctx.currentTime);
            return c
        }
    }
    ;
    var Draw = function(a) {
        this.ctx = a;
        this.rgb = "#000 #fff #666 #999 #ccc rgba(192,192,192,.9)".split(" ");
        a.font = "13px sans-serif"
    };
    Draw.prototype.color = function(a) {
        a = a || 0;
        return a in this.rgb ? this.rgb[a] : a
    }
    ;
    Draw.prototype.shadow = function(a, b, c, d) {
        var e = this.ctx;
        e.shadowColor = this.color(a || 0);
        e.shadowBlur = b || 3;
        e.shadowOffsetX = c || 0;
        e.shadowOffsetY = d || 0;
        return this
    }
    ;
    Draw.prototype.grad = function(a, b, c, d, e) {
        c = this.ctx.createRadialGradient(d || 0, e || 0, 0, 0, 0, c);
        c.addColorStop(0, a);
        c.addColorStop(1, b);
        return c
    }
    ;
    Draw.prototype.glin = function(a, b, c, d, e, f) {
        c = this.ctx.createLinearGradient(c, d, e, f);
        c.addColorStop(0, a);
        c.addColorStop(1, b);
        return c
    }
    ;
    Draw.prototype.begin = function() {
        this.ctx.save();
        return this
    }
    ;
    Draw.prototype.end = function() {
        this.ctx.restore();
        return this
    }
    ;
    Draw.prototype.scale = function(a, b) {
        this.ctx.scale(a, b || a);
        return this
    }
    ;
    Draw.prototype.to = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        this.ctx.translate(a, b);
        return this
    }
    ;
    Draw.prototype.rotate = function(a) {
        this.ctx.rotate(a * Math.PI / 180);
        return this
    }
    ;
    Draw.prototype.composite = function(a) {
        this.ctx.globalCompositeOperation = a || "source-over";
        return this
    }
    ;
    Draw.prototype.fill = function(a) {
        var b = this.ctx;
        b.fillStyle = this.color(a);
        b.fill();
        return this
    }
    ;
    Draw.prototype.stroke = function(a, b) {
        var c = this.ctx;
        c.lineWidth = b || 1;
        c.strokeStyle = this.color(a);
        c.stroke();
        return this
    }
    ;
    Draw.prototype.clear = function(a, b) {
        var c = this.ctx.canvas;
        this.ctx.clearRect(0, 0, a || c.width, b || c.height);
        return this
    }
    ;
    Draw.prototype.line = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        var c = this.ctx;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(a, b);
        c.closePath();
        return this
    }
    ;
    Draw.prototype.rect = function(a, b, c) {
        var d = this.ctx;
        if (void 0 !== c)
            return d.fillStyle = this.color(c),
            d.fillRect(0, 0, a, b),
            this;
        d.beginPath();
        d.rect(0, 0, a, b);
        d.closePath();
        return this
    }
    ;
    Draw.prototype.ellipse = function(a, b, c) {
        var d = this.ctx;
        d.beginPath();
        d.ellipse(0, 0, a, b || a, c || 0, 0, 2 * Math.PI);
        d.closePath();
        return this
    }
    ;
    Draw.prototype.ngon = function(a, b, c) {
        var d = this.ctx;
        d.beginPath();
        for (var e = 0; e < a; e++) {
            var f = 2 * Math.PI / a;
            if (0 < e) {
                var h = f * e;
                d.lineTo(Math.sin(h) * b, Math.cos(h) * b)
            } else
                d.moveTo(0, b);
            c && (f *= e + .5,
            d.lineTo(Math.sin(f) * c, Math.cos(f) * c))
        }
        d.closePath();
        return this
    }
    ;
    Draw.prototype.path = function(a) {
        var b = this.ctx
          , c = a[0];
        b.beginPath();
        b.moveTo(c.x, c.y);
        for (var d = 1; d < a.length; d++)
            c = a[d],
            b.lineTo(c.x, c.y);
        b.closePath();
        return this
    }
    ;
    Draw.prototype.merge = function(a, b) {
        var c = new Image;
        c.src = this.ctx.canvas.toDataURL();
        a && (this.store = c);
        b && (c.onload = function() {
            return b.call(c)
        }
        );
        return c
    }
    ;
    Draw.prototype.text = function(a, b, c, d) {
        var e = this.ctx
          , f = 0
          , h = 0;
        a instanceof Array || (a = [a]);
        a.forEach(function(a) {
            a = e.measureText(a);
            a.width > f && (f = a.width)
        });
        h = 14 * a.length;
        this.begin();
        d && this.ngon(3, 5).fill(c).to(-15, -7 - h);
        this.rect(f + 10, h + 6, c);
        e.fillStyle = this.color(b);
        for (b = 0; b < a.length; b++)
            e.fillText(a[b], 5, 14 * b + 14);
        return this.end()
    }
    ;
    Draw.prototype.img = function(a, b, c, d, e) {
        this.ctx.drawImage(a, b || 0, c || 0, d || a.width, e || a.height);
        return this
    }
    ;
    Draw.prototype.sprite = function(a, b, c, d, e, f, h, l) {
        this.ctx.drawImage(this.store, Math.round(a), Math.round(b), c, d, Math.round(e || 0), Math.round(f || 0), h || c, l || d);
        return this
    }
    ;
    var Sprite = function(a) {
        this.draw = a
    };
    Sprite.prototype.render = function(a) {
        var b = this.draw;
        b.begin();
        for (var c = 1; -2 < c; c--)
            for (var d = -1; 2 > d; d++)
                b.begin().to(24 * d + 24, 24 * c + 24),
                this.hero(d, c),
                b.end(),
                b.begin().to(24 * d + 120, 24 * c + 24),
                this.evil(d, c),
                b.end();
        b.begin().to(72, 0);
        this.hero(0, 0, !0);
        b.end();
        b.begin().to(168, 0);
        this.rod(0, 0, !0);
        b.end();
        b.to(0, 72);
        for (c = 0; 3 > c; c++)
            b.begin().to(32 * c, 0),
            this.cog(10 * c),
            b.end();
        b.to(0, 32);
        this.door();
        b.to(0, 32);
        for (c = 0; 6 > c; c++)
            b.begin().to(72 * c, 0),
            this.boss(15 * c, c / 2),
            b.end();
        b.end().merge(!0, a)
    }
    ;
    Sprite.prototype.boss = function(a, b) {
        this.draw.begin().to(36, 36).rotate(a).to(-6, -32).rect(12, 64, "#FFC107").to(-26, 26).rect(64, 12, "#FFC107").end().begin().to(36, 36).rotate(a + 45).to(-6, -32).rect(12, 64, "#ff9800").to(-26, 26).rect(64, 12, "#ff9800").end().begin().to(16, 20).rect(40, 32).fill("#ff9800").stroke(0).to(12, 10).rect(16, 12, 1).to(3 + b / 2, 2 + b / 2).rect(10 - b, 8 - b, 0).end()
    }
    ;
    Sprite.prototype.door = function() {
        this.draw.begin().rect(24, 32, 0).to(1, 1).rect(22, 30, "#333").to(14, 14).rect(5, 2, 0).end().begin().to(24, 0).rect(24, 32, 0).to(12, 19).rect(11, 12, 2).to(-6, 6).rect(17, 6, 3).end().begin().to(60, 8).begin().to(-7, 16).rect(6, 8, "#003").to(1, 1).rect(4, 6, "#669").end().begin().to(-3, 0).rect(6, 24, "#003").to(1, 1).rect(4, 22, "#669").end().ellipse(10.5, 7).fill("#669").stroke("#003").ellipse(5, 3).composite("destination-out").fill(1).composite().stroke("#003").end()
    }
    ;
    Sprite.prototype.cog = function(a) {
        var b = this.draw
          , c = b.grad("#ccc", "#666", 16);
        b.begin().to(16, 16).rotate(a).ngon(15, 15.3, 12).fill(c).stroke().ellipse(3).fill(0).end()
    }
    ;
    Sprite.prototype.hero = function(a, b, c) {
        var d = this.draw
          , e = d.grad("#f44336", "#f44336", 12, -4, -4);
        d.to(12, 12).begin().ellipse(11.3).fill(e).stroke().to(-3 - a, 5 + b).rect(6, 1, 0).end();
        c ? d.to(-4, -2).rect(8, 2, 0) : d.to(a, b - 3).ellipse(5).fill(1).to(a, b).ellipse(2).fill(0)
    }
    ;
    Sprite.prototype.evil = function(a, b) {
        var c = this.draw
          , d = c.grad("#0c0", "#060", 12, -4, -4);
        c.to(12, 12).begin().ngon(20, 11.5, 10).fill(d).stroke().to(a, b).ellipse(4.5).fill(1).to(a, b).ellipse(2).fill(0).end()
    }
    ;
    Sprite.prototype.rod = function() {
        this.draw.begin().to(4, 0).rect(16, 48, 0).to(1, 1).rect(14, 46, 3).to(2, 10).rect(10, 10, 1).to(3, 3).rect(4, 4, 0).to(0, 16).rect(4, 1, 0).end()
    }
    ;
    var Boss = function(a) {
        Item.call(this, a);
        this.size = 32;
        this.speed = new Vec;
        this.velociy = 1;
        this.frame = 0
    };
    $jscomp.inherits(Boss, Item);
    Boss.prototype.start = function() {
        var a = Sfx.play("boss", !0);
        a.mixer.gain.value = 0;
        this.sfx = a
    }
    ;
    Boss.prototype.stop = function() {
        this.sfx.stop()
    }
    ;
    Boss.prototype.update = function(a, b) {
        this.speed = a.pos.clone().sub(this.pos).bit().multiply(this.velociy);
        this.pos.x += this.speed.x;
        b.collide(this.pos, this.size);
        this.pos.y += this.speed.y;
        b.collide(this.pos, this.size);
        b = a.pos.clone().sub(this.pos).mag();
        var c = 1 - b / 300;
        this.sfx.mixer.gain.value = .1 < c ? c : .1;
        b < this.size + a.size && (a.alive = !1);
        this.frame += .5
    }
    ;
    Boss.prototype.render = function(a) {
        var b = this.pos.clone().sub(36);
        a.sprite(Math.round(this.frame) % 6 * 72, 136, 72, 72, b.x, b.y)
    }
    ;
    var Cog = function(a, b) {
        Item.call(this, a.clone());
        this.line = b ? new Line(a,b) : null;
        this.size = 16;
        this.speed = 1;
        this.frame = 0
    };
    $jscomp.inherits(Cog, Item);
    Cog.prototype.start = function() {
        var a = Sfx.play("cog", !0);
        a.mixer.gain.value = 0;
        this.sfx = a
    }
    ;
    Cog.prototype.stop = function() {
        this.sfx.stop()
    }
    ;
    Cog.prototype.pre = function(a) {
        var b = this.line;
        b && a.begin().to(b.begin).line(b.end.clone().sub(b.begin)).stroke(0, 6).end()
    }
    ;
    Cog.prototype.render = function(a) {
        var b = this.pos.clone().sub(this.size);
        a.sprite(Math.round(this.frame) % 3 * 32, 72, 32, 32, b.x, b.y)
    }
    ;
    Cog.prototype.update = function(a) {
        var b = this.pos
          , c = this.line
          , d = this.speed;
        c && (b.add(c.vec.clone().multiply(d)),
        b.clone().sub(c.end).mag() < d && (b = c.end.clone(),
        this.line = new Line(c.end,c.begin)));
        b = a.pos.clone().sub(b).mag();
        c = 1 - b / 150;
        this.sfx.mixer.gain.value = 0 < c ? c : 0;
        b < this.size + a.size && (a.alive = !1);
        this.frame += .5
    }
    ;
    var Door = function(a, b) {
        Item.call(this, a);
        this.key = b || !1;
        this.open = b ? !1 : !0;
        this.size = 12
    };
    $jscomp.inherits(Door, Item);
    Door.prototype.render = function(a) {
        var b = (new Vec(-12,-16)).add(this.pos);
        a.sprite(this.key ? 0 : 24, 104, 24, 32, b.x, b.y);
        this.key && (b = (new Vec(-12,-16)).add(this.key),
        a.sprite(48, 104, 24, 32, b.x, b.y))
    }
    ;
    Door.prototype.update = function(a) {
        var b = !1;
        this.key ? a.pos.clone().sub(this.key).mag() < this.size && (Sfx.play("key"),
        this.key = !1) : b = a.pos.clone().sub(this.pos).mag() < this.size;
        b && (this.open = !0);
        return b
    }
    ;
    var Evil = function(a) {
        Item.call(this, a);
        this.size = 12;
        this.speed = new Vec;
        this.velociy = .5;
        this.collide = new Vec
    };
    $jscomp.inherits(Evil, Item);
    Evil.prototype.update = function(a, b) {
        this.speed = a.pos.clone().sub(this.pos).bit().multiply(this.velociy);
        this.pos.x += this.speed.x;
        this.collide.y = b.collide(this.pos, this.size);
        this.pos.y += this.speed.y;
        this.collide.x = b.collide(this.pos, this.size);
        a.pos.clone().sub(this.pos).mag() < this.size + a.size && (a.alive = !1)
    }
    ;
    Evil.prototype.render = function(a) {
        var b = this.pos.clone().sub(12)
          , c = this.speed.clone().bit();
        this.collide.x && (c.y = 0);
        this.collide.y && (c.x = 0);
        c.multiply(24);
        a.sprite(c.x + 120, c.y + 24, 24, 24, b.x, b.y)
    }
    ;
    var Gate = function(a, b) {
        Door.call(this, a);
        this.size = 32;
        this.time = b
    };
    $jscomp.inherits(Gate, Door);
    Gate.prototype.pre = function(a) {
        var b = this.pos.clone().sub(36, 28)
          , c = a.glin("#09c", "#cff", 0, 0, 0, 64)
          , d = Math.floor(this.time / 1E3) % 60 + 100 + ""
          , d = (Math.floor(this.time / 6E4) + 100 + "").substr(-2) + ":" + d.substr(-2);
        a.begin().to(b).rect(72, 64, c).to(1, 1).rect(34, 62).stroke(0, 2).to(36, 0).rect(34, 62).stroke(0, 2).to(-1, 36).ngon(6, 10).stroke(0, 2).to(-20, -60).text(d, 4, 0).end()
    }
    ;
    Gate.prototype.render = function(a) {}
    ;
    var Hero = function(a, b) {
        Item.call(this, a);
        this.size = 12;
        this.bound = b;
        this.alive = !0;
        this.speed = new Vec;
        this.minSpeed = new Vec;
        this.maxSpeed = new Vec(3,5);
        this.velocity = new Vec(.1,.15);
        this.jumpSpeed = new Vec(3,-5);
        this.collide = new Vec
    };
    $jscomp.inherits(Hero, Item);
    Hero.prototype.render = function(a) {
        var b = this.pos.clone().sub(12)
          , c = new Vec(72,0);
        this.alive && (c = this.speed.clone().bit(),
        this.collide.x && (c.y = 0),
        this.collide.y && (c.x = 0),
        c.multiply(24).add(24));
        a.sprite(c.x, c.y, 24, 24, b.x, b.y)
    }
    ;
    Hero.prototype.update = function(a) {
        var b = this.pos
          , c = this.size
          , d = this.speed
          , e = this.bound
          , f = new Vec;
        this.speed.add(this.velocity).max(this.maxSpeed);
        b.x += d.x;
        f.y = a.collide(b, c, !0);
        b.y += d.y;
        f.x = a.collide(b, c, !0);
        !this.sfx && 0 < d.y && f.x != f.y ? this.sfx = Sfx.play("slide", !0) : f.x == f.y && this.stop();
        if (f.x || f.y && !this.collide.y)
            d.y = this.minSpeed.y;
        this.collide = f;
        if (b.x < -c || b.y < -c || b.x > e.x + c || b.y > e.y + c)
            this.alive = !1
    }
    ;
    Hero.prototype.stop = function() {
        this.sfx && (this.sfx.stop(),
        this.sfx = !1)
    }
    ;
    Hero.prototype.turn = function() {
        this.velocity.x = -this.velocity.x;
        this.speed.x = -this.speed.x
    }
    ;
    Hero.prototype.jump = function() {
        var a = this.collide;
        if (a.x || a.y)
            this.speed.y = this.jumpSpeed.y,
            a.y && !a.x && this.turn(),
            Sfx.play("jump"),
            this.srcSlide && this.srcSlide.stop()
    }
    ;
    var Rod = function(a) {
        Item.apply(this, arguments)
    };
    $jscomp.inherits(Rod, Item);
    Rod.prototype.pre = function(a) {
        var b = this.pos.clone().sub(12);
        a.begin().to(b.x, b.y - 10).text(["Skipping classes", "again, Theodor?"], 0, 5, 1).end()
    }
    ;
    Rod.prototype.render = function(a) {
        var b = this.pos.clone().sub(12);
        a.sprite(168, 0, 24, 48, b.x, b.y)
    }
    ;
    var Room = function(a, b) {
        this.grid = a;
        this.margin = b;
        this.dots = [];
        this.lines = [];
        this.glitch = []
    };
    Room.prototype.map = function(a) {
        var b = this.grid, c = this.margin, d = this.lines, e = [], f, h = 0, l = a[0] * b, n = a[1] * b;
        e.push((new Vec(l,n)).add(c));
        for (f = 1; f < a.length - 1; f++)
            f % 2 ? l = a[f + 1] * b : n = a[f + 1] * b,
            e.push((new Vec(l,n)).add(c)),
            d.push(new Line(e[h],e[++h]));
        d.push(new Line(e[h],e[0]));
        this.dots.push(e)
    }
    ;
    Room.prototype.pre = function(a) {
        var b = a.ctx.canvas.width
          , c = a.ctx.canvas.height;
        a.begin().rect(b, c, "#333");
        for (var d = 0; d < this.dots.length; d++)
            a.path(this.dots[d]).fill(d ? "#333" : "#fefefe").stroke(0, 2);
        for (d = 0; 100 > d; d++) {
            var e = Math.round(Math.rnd(8, 10))
              , f = Math.round(Math.rnd(4, 6))
              , h = Math.round(Math.rnd(0, b - e))
              , l = Math.round(Math.rnd(0, c - f));
            a.begin().to(h, l).rect(e, f, "rgba(0,0,0,.1)").end()
        }
        a.end();
        for (b = 0; b < this.glitch.length; b++)
            c = this.lines[this.glitch[b]],
            a.begin().to(c.begin).line(c.end.clone().sub(c.begin)).shadow("#fefefe").stroke("#fefefe", 3).end()
    }
    ;
    Room.prototype.collide = function(a, b, c) {
        for (var d = 0, e = 0; e < this.lines.length; e++)
            if (!(c && -1 < this.glitch.indexOf(e))) {
                var f = this.lines[e].project(a)
                  , f = a.clone().sub(f)
                  , h = f.mag();
                h < b && (a.add(f.clone().div(h).multiply(b - h)),
                d = 1)
            }
        return d
    }
    ;
    var Win = function(a) {
        Item.apply(this, arguments)
    };
    $jscomp.inherits(Win, Item);
    Win.prototype.pre = function(a) {
        var b = this.pos
          , c = a.glin("#09c", "#cff", 0, 0, 0, 24);
        a.begin().to(b.x - 16, b.y - 12).rect(32, 24, c).to(1, 1).rect(10, 22).stroke(0, 2).to(10, 0).rect(10, 22).stroke(0, 2).to(10, 0).rect(10, 22).stroke(0, 2).end()
    }
    ;
    var Line = function(a, b) {
        this.begin = a;
        this.end = b;
        this.vec = b.clone().sub(a).norm()
    };
    Line.prototype.project = function(a) {
        var b = -1;
        a = a.clone().sub(this.begin);
        var c = this.end.clone().sub(this.begin);
        this.begin.eq(this.end) || (b = (a.x * c.x + a.y * c.y) / (c.x * c.x + c.y * c.y));
        return 0 > b ? this.begin.clone() : 1 < b ? this.end.clone() : c.clone().multiply(b).add(this.begin)
    }
    ;
    var Vec = function(a, b) {
        this.x = a || 0;
        this.y = b || 0
    };
    Vec.prototype.clone = function() {
        return new Vec(this.x,this.y)
    }
    ;
    Vec.prototype.eq = function(a) {
        return this.x == a.x && this.y == a.y
    }
    ;
    Vec.prototype.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    ;
    Vec.prototype.max = function(a) {
        this.x > a.x && (this.x = a.x);
        this.x < -a.x && (this.x = -a.x);
        this.y > a.y && (this.y = a.y);
        this.y < -a.y && (this.y = -a.y);
        return this
    }
    ;
    Vec.prototype.add = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        void 0 === b && (b = a);
        this.x += a;
        this.y += b;
        return this
    }
    ;
    Vec.prototype.sub = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        void 0 === b && (b = a);
        this.x -= a;
        this.y -= b;
        return this
    }
    ;
    Vec.prototype.div = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        void 0 === b && (b = a);
        this.x = 0 < a ? this.x / a : 0;
        this.y = 0 < b ? this.y / b : 0;
        return this
    }
    ;
    Vec.prototype.multiply = function(a, b) {
        a instanceof Vec && (b = a.y,
        a = a.x);
        void 0 === b && (b = a);
        this.x *= a;
        this.y *= b;
        return this
    }
    ;
    Vec.prototype.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    }
    ;
    Vec.prototype.norm = function() {
        this.div(this.mag());
        return this
    }
    ;
    Vec.prototype.zero = function() {
        this.y = this.x = 0;
        return this
    }
    ;
    Vec.prototype.bit = function() {
        this.x = 0 < this.x ? 1 : 0 > this.x ? -1 : 0;
        this.y = 0 < this.y ? 1 : 0 > this.y ? -1 : 0;
        return this
    }
    ;
    Vec.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    var game = new Game(new Draw($("#game").getContext("2d")),"M3,7,7,6,3|H4,6|D5,6|W6,6|#The door is open.|#I have to escape!;M4,8,6,3,8,1,2,3,4|H4,7|D7,2|#I can jump up walls!;M0,0,10,10,0|M1,1,9,9,1,3,7,7,3,5,4,6,6,4,2,8,8,2,1|H1,0|D2,0,5,5|#The door is locked.|#I need a key!;M0,10,10,0,0|M2,9,6,2,8,1,4,8,2|G7,11|H0,9|D7,0,3,7|#This wall has no texture!|#Is it a glitch?;M0,0,10,10,0|M2,2,4,6,6,2,8,8,2|H4,9,1|D2,9,3.8,5|B6,9|#Uh-oh! The Sentinel.|#Can't jump through him.;M0,0,1,2,4,6,5,1,2,0,6,4,7,2,9,1,7,0,10,3,8,4,10,7,8,9,9,8,10,10,7,6,9,5,6,10,0,7,3,3,1,4,2,6,1,5,0|M1,8,4,7,5,9,1|H8,9,1|D6.8,0,1.2,5|#I can get out through|#the Libraryinth.;M0,10,10,0,0|M1,1,3,3,4,1,6,3,7,1,9,5,8,9,7,4,3,9,2,5,1|M4,6,6,8,4|H1,0|D4,0,5,5|E1,5|E8,5|#What was that noise...;M0,0,10,10,0|M1,1,9,5,8,2,5,3,7,7,3,5,4,6,6,4,3,3,4,2,2,8,8,6,9,9,1|M6,0,7,1,6|M7,6,8,7,7|H4,0,1|D5,5,7,0|G26,19|#Oh no, dead-end!;M0,10,10,7,1,6,10,3,1,2,10,1,0,4,9,5,0,8,9,9,0|C3,9|C5,9|C7,9|C3,5|C5,5|C7,5|C3,1|C5,1|C7,1|H1,9|D0,9,9,1|#Through the Basement.|#Jump over the cogs.;M0,0,10,10,0|M1,2,4,3,1|M6,2,9,3,6|M1,4,2,6,1|M3,4,7,6,3|M8,4,9,6,8|M1,7,3,8,7,7,9,8,8,9,2,8,1|H2,1|D7,1,5,9|E2,3|E7,3|#The Infected Ones.|#They got me!;M0,10,10,0,0|M1,1,9,2,6,8,9,9,1,8,4,2,1|G5,9,11,15|H6,7|D3,7,8,0|C3,5,0,5|C6,5,9,5|C3,0|C6,0|E1,0|#Almost there...|#Where's the exit?;M0,2,1,1,2,2,3,1,4,2,5,1,6,2,7,1,8,2,9,1,10,9,9,8,8,10,7,8,6,10,5,8,4,10,3,8,2,10,1,8,0,7,1,6,2,7,3,6,4,7,5,6,6,7,7,6,8,7,9,3,8,5,7,3,6,5,5,3,4,5,3,3,2,5,1,3,0|H8,7|D-.2,2,-.2,7|C1,4|C3,4|C5,4|C7,4|C1,9|C3,9|C5,9|C7,9|#Oops, wrong turn.|#Great. More cogs.;M0,0,10,2,8,3,10,4,9,5,10,7,8,8,10,10,0,8,1,7,0,5,2,4,0,2,1,1,0|M2,2,4,3,2|M5,3,7,4,5|M3,5,5,6,3|M6,5,8,6,6|M2,8,4,9,2|M5,8,7,9,5|H1,9|D8,9,0,0|E9,3|E0,3|#Too quiet. I have a bad|#feeling about this.;M0,0,10,10,8,2,1,6,7,8,6,7,5,8,1,9,7,10,0|H8,9|D6,9,5,6|C8,8|C9,7|C8,6|C9,5|C8,4|C9,3|C8,2|C9,1|E6,7|#Double trouble.|#Even better.;M0,10,2,2,4,10,10,4,9,2,10,0,8,8,6,0,0,2,1,4,0|H0,9|D-.2,1,9.2,1|C2,1,5,1|C4,9,7,9|#The Workshop.|#Might be tricky.;M0,0,10,10,0|M1,3,2,2,3,1,7,2,8,3,9,7,8,8,7,9,6,7,7,6,8,4,7,3,6,2,4,3,3,4,2,6,3,7,4,9,3,8,2,7,1|M4,4,6,6,4|H4,0|D5,0,4,3|C2,1,0,1|C7,1,9,1|C1,7,1,9|C8,7,8,9|#Hope I get out|#in one piece.;M0,0,2,1,8,0,10,2,9,8,10,10,8,9,2,10,0,8,1,2,0|M2,2,4,3,3,5,2|M5,2,8,4,7,3,5|M2,6,3,7,5,8,2|M7,5,8,8,6,7,7|H0,9|D9.2,9,-.2,1|B9,1|#The Sentinel is on my|#track. Gotta hurry!;M0,0,3,2,4,0,5,1,6,0,9,2,10,3,9,5,10,6,9,8,10,9,9,10,6,8,5,10,4,9,3,10,0|M1,1,2,3,1|M1,4,2,6,1|M1,7,2,9,1|M3,3,4,5,3|M3,6,4,8,3|M5,2,6,4,5|M5,5,6,7,5|M7,1,8,3,7|M7,4,8,6,7|M7,7,8,9,7|H1,9|D5,4,7,0|C2,1.7,4,1.7|C6,5.7,8,5.7|#Jump around the Gym|#and I'll be at the Gates.;M0,10,4,9,2,1,8,2,3,3,8,4,3,7,8,6,4,5,9,10,10,0,0|G5,9|H2,0|D7,6,3,9|C4,0,5,0|E5,6|B0,0|W6,6|#Final test. Tough,|#but I'm almost out.;M2,4,8,6,2|H4,5|X5,5|R3,5|#Hello Mr Rodman.".split(";"),new Camera($("#cam").getContext("2d"),300,"#333"));
    function update() {
        game.update();
        game.render();
        requestAnimationFrame(update)
    }
    on(document, "mousedown,touchstart", function(a) {
        a.preventDefault();
        game.tap()
    });
    on(document, "keydown", function(a) {
        32 == a.keyCode && (a.preventDefault(),
        game.tap())
    });
    on(window, "resize", function() {
        game.cam.resize()
    });
    (new Icon($("#icon").getContext("2d"))).render(function() {
        $("link[rel=apple-touch-icon]").href = this.src;
        $("link[rel=icon]").href = this.src
    });
    (new Sprite(game.draw)).render(function() {
        game.load();
        update()
    });
}
;

//# sourceMappingURL=script.js.map
