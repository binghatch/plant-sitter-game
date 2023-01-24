class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            spriteSheet: config.sprite.spriteSheet || "../assets/characters/Bob_idle_anim_16x16.png",
            spriteData: config.sprite.spriteData || "../assets/characters/Bob_idle_anim_16x16.json",
            useShadow: config.useShadow
        });
    }

    preload() {
        this.sprite.preload();
    }

    update() {
        
    }

}