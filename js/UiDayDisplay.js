class UiDayDisplay extends UiElement {
    constructor(config) {
        super(config)
    }  
    
    update(state) {
        this.sprite.currentAnimationFrame++;
    }
}