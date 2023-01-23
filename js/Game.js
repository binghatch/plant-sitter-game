class Game {
    constructor(config) {
        this.background;
        this.hero;
    }

    preload() {
        this.background = loadImage("../assets/maps/office-demo.png");
        this.hero = new GameObject({
            x: 2,
            y: 4,
            sprite: {
                spriteSheet: "../assets/characters/Bob_idle_anim_16x16.png",
                spriteData: "../assets/characters/Bob_idle_anim_16x16.json"
            },
            useShadow: true
        })
        this.hero.preload();
    }

    draw() {
        image(this.background, 0, 0);
        this.hero.sprite.draw();
    }
}