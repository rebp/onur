/// <reference path="DomObject.ts" />

class Car extends DomObject {

    private posx:number
    private posy:number
    private speed:number = 0
        
    constructor() {
        super("car");
        
        this.posx = Math.floor(Math.random() * window.innerWidth) 
        this.posy = window.innerHeight - this.element.clientHeight
    
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

    }

    public update():void {
        this.posx += this.speed
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if ( this.posx >= window.innerWidth ) {
            this.posx = -(this.element.clientWidth)
        }
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:
            this.speed = -10
            break
        case 39:
            this.speed = 10
            break
        }
    }

    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:
            this.speed = 0
            break
        case 39:
            this.speed = 0
            break
        }
    }


    public getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }
}