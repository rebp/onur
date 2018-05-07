"use strict";
var Bomb = (function () {
    function Bomb() {
        var _this = this;
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = -(this.element.clientHeight);
        this.posx = Math.random() * window.innerWidth;
        this.element.addEventListener('click', function () {
            _this.reset();
            Game.getInstance().scorePoint();
        });
    }
    Bomb.prototype.update = function () {
        this.posy += 6;
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
}());
var Car = (function () {
    function Car() {
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = -(this.element.clientWidth);
        this.posy = window.innerHeight - this.element.clientHeight;
    }
    Car.prototype.update = function () {
        this.posx += 4;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posx >= window.innerWidth) {
            this.posx = -(this.element.clientWidth);
        }
    };
    Car.prototype.random = function (max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Car.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car();
        this.bomb = new Bomb();
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
        this.bomb.update();
        if (Util.checkCollision(this.car.getBoundingClientRect(), this.bomb.getBoundingClientRect())) {
            alert("BOOM!!!");
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
                    _this.scorePoint();
                    _this.statusbar.style.backgroundPositionX = "0px";
                }, 300);
                this.destroyed = 0;
                break;
        }
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
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