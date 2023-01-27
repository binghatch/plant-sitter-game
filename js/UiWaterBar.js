class UiWaterBar extends UiElement {
    constructor(config) {
        super(config)
    }

    update(state) {
        this.sprite.currentAnimationFrame = 20 - state.player.carriedWater;
    }
}