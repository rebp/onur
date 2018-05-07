class Car {
    
    private element: HTMLElement
    private posx:number
    private posy:number
        
    constructor() {

        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        
        this.posx = -(this.element.clientWidth)
        this.posy = window.innerHeight - this.element.clientHeight

    }

    public update():void {
        this.posx += 4
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if ( this.posx >= window.innerWidth ) {
            this.posx = -(this.element.clientWidth)
        }
    }

    public random(max:number, min:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
}