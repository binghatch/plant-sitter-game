class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office);
        this.userInput;
        this.cameraPerson = this.map.gameObjects.hero;
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

        // Update game object position
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.userInput.direction,
                map: this.map
            });
        })

        // Draw lower map
        this.map.drawLowerImage(this.cameraPerson);

        // Draw game objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.sprite.draw(this.cameraPerson);
        })

        // Draw upper map   
        this.map.drawUpperImage(this.cameraPerson);
    }
}