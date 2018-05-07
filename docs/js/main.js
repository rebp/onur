"use strict";
var Bomb = (function () {
    function Bomb(game) {
        var _this = this;
        this.game = game;
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = -(this.element.clientHeight);
        this.posx = Math.random() * window.innerWidth;
        this.element.addEventListener('click', function () {
            _this.reset();
            _this.game.scorePoint();
        });
    }
    Bomb.prototype.update = function () {
        this.posy += 10;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posy >= window.innerHeight) {
            this.reset();
            this.game.destroyBuilding();
        }
    };
    Bomb.prototype.reset = function () {
        this.posy = -(this.element.clientHeight);
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth);
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
    return Car;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car();
        this.bombs = [new Bomb(this)];
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        console.log("updating the game");
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.car.update();
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var bomb = _a[_i];
            bomb.update();
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
                    alert("YOU LOST");
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
    new Game();
});
//# sourceMappingURL=main.js.map