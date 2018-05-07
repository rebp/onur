"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomObject = (function () {
    function DomObject(element) {
        this.element = document.createElement(element);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
    }
    return DomObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this, 'bomb') || this;
        _this.posy = -(_this.element.clientHeight);
        _this.posx = Math.random() * window.innerWidth;
        _this.speed = 8;
        return _this;
    }
    Bomb.prototype.update = function () {
        this.posy += this.speed;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posy >= window.innerHeight) {
            this.reset();
            Game.getInstance().destroyBuilding();
        }
    };
    Bomb.prototype.reset = function () {
        this.posy = -(this.element.clientHeight);
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth);
    };
    Bomb.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return Bomb;
}(DomObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "car") || this;
        _this.speed = 0;
        _this.posx = Math.floor(Math.random() * window.innerWidth);
        _this.posy = window.innerHeight - _this.element.clientHeight;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Car.prototype.update = function () {
        this.posx += this.speed;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posx >= window.innerWidth) {
            this.posx = -(this.element.clientWidth);
        }
    };
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speed = -10;
                break;
            case 39:
                this.speed = 10;
                break;
        }
    };
    Car.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speed = 0;
                break;
            case 39:
                this.speed = 0;
                break;
        }
    };
    Car.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return Car;
}(DomObject));
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car();
        this.upgrade = new Upgrade();
        this.bombs = [new Bomb()];
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        console.log("updating the game");
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.car.update();
        this.upgrade.update();
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var bomb = _a[_i];
            bomb.update();
            if (Util.checkCollision(this.car.getBoundingClientRect(), bomb.getBoundingClientRect())) {
                bomb.reset();
                Game.getInstance().scorePoint();
            }
        }
        if (Util.checkCollision(this.car.getBoundingClientRect(), this.upgrade.getBoundingClientRect())) {
            this.statusbar.style.backgroundPositionX = "0px";
            this.reset();
        }
    };
    Game.prototype.destroyBuilding = function () {
        var _this = this;
        this.destroyed++;
        console.log("buildings destroyed " + this.destroyed);
        switch (this.destroyed) {
            case 1:
                this.statusbar.style.backgroundPositionX = "-72px";
                break;
            case 2:
                this.statusbar.style.backgroundPositionX = "-144px";
                break;
            case 3:
                this.statusbar.style.backgroundPositionX = "-216px";
                break;
            case 4:
                this.statusbar.style.backgroundPositionX = "-288px";
                setTimeout(function () {
                    _this.statusbar.style.backgroundPositionX = "0px";
                    _this.reset();
                }, 300);
                break;
        }
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    Game.prototype.reset = function () {
        this.score = 0;
        this.destroyed = 0;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Upgrade = (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade() {
        var _this = _super.call(this, 'upgrade') || this;
        _this.speed = 0;
        _this.posy = -(_this.element.clientHeight);
        _this.posx = Math.random() * window.innerWidth;
        var color = Math.random() * 360;
        _this.element.style.webkitFilter = "hue-rotate(" + color + "deg)";
        _this.element.style.filter = "hue-rotate(" + color + "deg)";
        setTimeout(function () {
            _this.speed = 4;
        }, 3000);
        return _this;
    }
    Upgrade.prototype.update = function () {
        this.posy += this.speed;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posy >= window.innerHeight) {
            this.posy = -(this.element.clientHeight);
            this.posx = Math.random() * window.innerWidth;
            this.speed = 0;
        }
    };
    Upgrade.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return Upgrade;
}(DomObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map