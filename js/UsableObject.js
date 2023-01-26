class UsableObject extends GameObject {
    constructor(config) {
        super(config)
        this.interaction = new ActivateInteraction({
            x: config.interaction.x,
            y: config.interaction.y,
            type: config.interaction.type,
            spriteOffsetX: config.interaction.spriteOffsetX,
            spriteOffsetY: config.interaction.spriteOffsetY,
            gameObject: this
        })
    }

    update(state) {
        this.updateSprite();
    }

    updateSprite() {
        this.sprite.currentAnimation = "standard";
    }
}