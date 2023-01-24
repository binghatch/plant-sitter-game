class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office);
    }

    preload() {
        this.map.preload();
        Object.values(this.map.gameObjects).forEach(object => {
            object.preload();
        })
    }

    setup() {
    }

    draw() {
        clear();
        this.map.drawLowerImage();
        Object.values(this.map.gameObjects).forEach(object => {
            object.update();
            object.sprite.draw();
        })
        this.map.drawUpperImage();
    }
}