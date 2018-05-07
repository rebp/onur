class Bomb {
    
    private element: HTMLElement
    private posy:number
    private posx:number
    private game:Game
        
    constructor(game:Game) {
        this.game = game
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);

        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * window.innerWidth  

        this.element.addEventListener('click', () => {
            this.reset()
            this.game.scorePoint()
        })

    }

    public update():void {

        this.posy += 10
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if( this.posy >= window.innerHeight  ) {
            this.reset()
            this.game.destroyBuilding()
         }

    }

    public reset():void {
        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth)       
    }


}