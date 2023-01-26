class UiDayDisplay extends UiElement {
    constructor(config) {
        super(config),

        // Animation Speed Override
        this.dayDuration = config.dayDuration || 200,
        this.day = config.day || 0

    }  
    
    update(state) {
        if (frameCount % this.dayDuration === 0 && this.day < 6) {
            this.day++;
            console.log(this.day);
            this.sprite.currentAnimationFrame++;
        }
    }
}