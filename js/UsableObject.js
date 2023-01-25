class UsableObject extends GameObject {
    constructor(config) {
        super(config)
        this.interaction = new ActivateInteraction({
            x: config.interaction.x,
            y: config.interaction.y,
            type: config.interaction.type,
            gameObject: this
        })
    }

    update(state) {
        // this.interaction.draw();
        this.updateSprite();
    }

    updateSprite() {
        this.sprite.currentAnimation = "deactivated";
    }
}