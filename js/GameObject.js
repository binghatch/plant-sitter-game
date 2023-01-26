class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0,
        this.y = config.y || 0,
        this.direction = config.direction || "down",
        this.sprite = new Sprite({
            gameObject: this,
            spriteSheet: config.sprite.spriteSheet || "../assets/characters/Bob_anim_32x32.png",
            spriteData: config.sprite.spriteData || "../assets/characters/Bob_anim_32x32.json",
            offsetX: config.sprite.offsetX || 0,
            offsetY: config.sprite.offsetY || 0,
            isVisible: config.spriteIsVisible || true,
            animationSpeed: 10,
            currentAnimationFrame: 0,
            useShadow: config.sprite.useShadow,
        }),
        this.isPlayerControlled = config.isPlayerControlled || false,
        this.walls = config.walls
    }

    preload() {
        this.sprite.preload();
    }

    mount(map) {
        this.isMounted = true;
        if (this.walls) {
            this.walls.forEach(wall => {
                map.addWall(utils.pixelsToCoord(this.x + wall.x), utils.pixelsToCoord(this.y + wall.y));
            })
        }
        if (this.interaction) {
            map.addInteraction(this.interaction);
        }

    }

    update() {
        this.sprite.update();
    }

}