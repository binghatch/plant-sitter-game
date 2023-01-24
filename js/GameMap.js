class GameMap {
    constructor(config) {
        this.gameObjects = config.gameObjects,

        this.lowerSrc = config.lowerSrc,
        this.lowerImage = null,

        this.upperSrc = config.upperSrc,
        this.upperImage = null
    }

    preload() {
        this.lowerImage = loadImage(this.lowerSrc);
        this.upperImage = loadImage(this.upperSrc);
    }

    drawLowerImage() {
        image(this.lowerImage, 0, 0);
    }

    drawUpperImage() {
        image(this.upperImage, 0, 0);
    }
}

window.GameMaps = {
    Office: {
        lowerSrc: "../assets/maps/office-lower.png",
        upperSrc: "../assets/maps/office-upper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
                sprite: {
                    spriteSheet: "../assets/characters/Bob_idle_anim_16x16.png",
                    spriteData: "../assets/characters/Bob_idle_anim_16x16.json"
                },
                useShadow: true
            })
        }
    }
}