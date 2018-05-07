/// <reference path="DomObject.ts" />

class Upgrade extends DomObject{

    private posy:number
    private posx:number
    private speed:number = 0

    constructor() {
        super('upgrade')

        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * window.innerWidth 

        let color:number = Math.random() * 360;        
        this.element.style.webkitFilter = "hue-rotate("+color+"deg)";
        this.element.style.filter = "hue-rotate("+color+"deg)";

        setTimeout(() => {
            this.speed = 4
        }, 3000);

    }

    public update():void {
        this.posy += this.speed
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`


        if( this.posy >= window.innerHeight  ) {
            this.posy = -(this.element.clientHeight)
            this.posx = Math.random() * window.innerWidth 
            this.speed = 0
         }

    }

    public getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }

}
