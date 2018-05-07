class Util {

    private static instance: Util;
    
    private constructor() {}

    public static getInstance() {
        if (! Util.instance) {
            Util.instance = new Util();
        }
        return Util.instance;
    }

    public static checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
              b.left <= a.right &&
              a.top <= b.bottom &&
              b.top <= a.bottom)
    }

}