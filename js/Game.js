class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office),
        this.userInput,
        this.cameraPerson = this.map.gameObjects.hero
    }

    preload() {
        this.map.preload();
        Object.values(this.map.gameObjects).forEach(object => {
            object.preload();
            if (object.interaction) {
                object.interaction.preload();
            }
        })
    }

    setup() {
        this.userInput = new UserInput()
        console.log(this.userInput);
        this.map.mountObjects();
    }

    draw() {
        clear();

        // Update game object position
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                interaction: this.userInput.interaction,
                arrow: this.userInput.direction,
                map: this.map
            });
        })

        // Draw lower map
        this.map.drawLowerImage(this.cameraPerson);

        // Draw game objects' lower part
        Object.values(this.map.gameObjects).forEach(object => {
            if (object.isPlayerControlled === false) {
                object.sprite.draw(this.cameraPerson, "lower");
            }
        })
        // Draw player
        Object.values(this.map.gameObjects).forEach(object => {
            if (object.isPlayerControlled === true) {
                object.sprite.draw(this.cameraPerson);
            }
        })


        // Draw upper map   
        this.map.drawUpperImage(this.cameraPerson);

        // Draw game objects' upper part
        Object.values(this.map.gameObjects).forEach(object => {
            if (object.isPlayerControlled === false) {
                object.sprite.draw(this.cameraPerson, "upper");
            }
        })

        // Draw UI
        Object.values(this.map.gameObjects).forEach(object => {
            if (object.isPlayerControlled === true) {
                object.trigger({
                    arrow: this.userInput.direction,
                    map: this.map,
                    cameraPerson: this.cameraPerson
                });
            }
        })
    }
}