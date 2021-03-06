/// <reference path="DomObject.ts" />

class Bomb extends DomObject {    

    private posy:number
    private posx:number
    private speed:number
        
    constructor() {
        super('bomb')

        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * window.innerWidth 
        this.speed = 8

    }

    public update():void {

        this.posy += this.speed
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if( this.posy >= window.innerHeight  ) {
            this.reset()
            Game.getInstance().destroyBuilding();
         }

    }

    public reset():void {
        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth)       
    }

    public getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }

}