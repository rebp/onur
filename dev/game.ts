class Game {

    private static instance: Game;
    
    private score:number = 0
    private destroyed:number = 0
    private textfield:HTMLElement
    private statusbar:HTMLElement
    private bombs:Bomb[]
    private car:Car
    private upgrade:Upgrade
    
    private constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement

        this.car = new Car()
        this.upgrade = new Upgrade()
        this.bombs = [new Bomb()]

        this.gameLoop()    
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    private gameLoop():void{
        console.log("updating the game")
        requestAnimationFrame(() => this.gameLoop())
        this.car.update()
        this.upgrade.update()

        for(let bomb of this.bombs){
            bomb.update()
            if( Util.checkCollision( this.car.getBoundingClientRect(), bomb.getBoundingClientRect()  ) ) {
                bomb.reset()
                Game.getInstance().scorePoint();
            }
        }

        if( Util.checkCollision( this.car.getBoundingClientRect(), this.upgrade.getBoundingClientRect()  ) ) {
            this.statusbar.style.backgroundPositionX = "0px"
            this.reset()
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
                this.statusbar.style.backgroundPositionX = "0px"
                this.reset()
            }, 300);            
                break;

        }
        
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score 
    }

    public reset() {
        this.score = 0
        this.destroyed = 0
    }

} 

window.addEventListener("load", () => {
    Game.getInstance();
});