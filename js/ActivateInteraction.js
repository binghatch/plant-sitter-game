class ActivateInteraction extends Interaction {
    constructor(config) {
        super(config),
        this.sprite = new Sprite({
            spriteSheet: "./assets/interactions/default_anim_32x32.png",
            spriteData: "./assets/interactions/default_anim_32x32.json",
            offsetX: config.spriteOffsetX,
            offsetY: config.spriteOffsetY,
            isVisible: config.spriteIsVisible,
            useShadow: false,
            gameObject: config.gameObject
        })
    }

    preload() {
        this.sprite.preload();
    }

    activate(state) {
        this.sprite.currentAnimation = "idle";
        this.sprite.draw(state.cameraPerson);
    }
}