class Game {
    
    private score:number = 0
    private destroyed:number = 0
    private textfield:HTMLElement
    private statusbar:HTMLElement
    private bombs:Bomb[]
    private car:Car
    
    constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement

        this.car = new Car()
        this.bombs = [new Bomb(this)]
        this.gameLoop()    
    }
    
    // timer voor bommetjes
    private gameLoop():void{
        console.log("updating the game")
        requestAnimationFrame(() => this.gameLoop())
        this.car.update()

        for(let bomb of this.bombs){
            bomb.update()
        }        

    }

    public destroyBuilding(){

        this.destroyed ++
        console.log("buildings destroyed " + this.destroyed)

        switch (this.destroyed) {
            case 1:
                this.statusbar.style.backgroundPositionX = "-72px"
                break;
            case 2:
                this.statusbar.style.backgroundPositionX = "-144px"
                break;
            case 3:
            this.statusbar.style.backgroundPositionX = "-216px"
                break;
            case 4:
            this.statusbar.style.backgroundPositionX = "-288px"
            setTimeout(() => {
                alert("YOU LOST")
                this.scorePoint()
                this.statusbar.style.backgroundPositionX = "0px"
            }, 300);
            this.destroyed = 0
                break;

        }
        
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score 
    }

} 

window.addEventListener("load", () => {
    new Game();
});