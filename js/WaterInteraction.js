class WaterInteraction extends Interaction {
    constructor(config) {
        super(config),
        this.sprite = new Sprite({
            spriteSheet: "./assets/interactions/water_anim_16x32.png",
            spriteData: "./assets/interactions/water_anim_16x32.json",
            offsetX: config.spriteOffsetX,
            offsetY: config.spriteOffsetY,
            isVisible: config.spriteIsVisible,
            animationSpeed: 10,
            currentAnimationFrame: 0,
            useShadow: false,
            gameObject: config.gameObject
        })
    }

    activate(state) {
        this.sprite.currentAnimation = "idle";
        this.sprite.draw(state.cameraPerson);
    }

    trigger(player) {
        if (this.gameObject.thirst > 0 & this.gameObject.isAlive) {
            this.gameObject.thirst--;
            player.carriedWater--;
            this.sound.trigger();
            this.gameObject.updateSprite();
        }
    }
}