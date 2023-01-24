class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office);
        this.userInput;
    }

    preload() {
        this.map.preload();
        Object.values(this.map.gameObjects).forEach(object => {
            object.preload();
        })
    }

    setup() {
        this.userInput = new UserInput()
        console.log(this.userInput);
    }

    draw() {
        clear();
        this.map.drawLowerImage();
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.userInput.direction
            });
            object.sprite.draw();
        })
        this.map.drawUpperImage();
    }
}