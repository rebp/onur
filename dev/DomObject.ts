class DomObject {

    private element: HTMLElement

    constructor(car:string) {
        this.element = document.createElement(car)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
    }
    
}