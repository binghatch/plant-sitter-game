class UiElement {
    constructor(config) {
        this.x = config.x,
        this.y = config.y,
        this.isAbsolute = true;
        this.sprite = new Sprite({
            spriteSheet: config.sprite.spriteSheet,
            spriteData: config.sprite.spriteData,
            offsetX: config.sprite.spriteOffsetX || 0,
            offsetY: config.sprite.spriteOffsetY || 0,
            isVisible: true,
            useShadow: false,
            animationSpeed: 0,
            currentAnimationFrame: 0,
            gameObject: this
        })
    }

    preload() {
        this.sprite.preload();
    }

}