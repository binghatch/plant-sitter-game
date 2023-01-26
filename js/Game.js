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
        Object.values(this.map.uiElements).forEach(element => {
            element.preload();
        })
    }

    setup() {
        this.userInput = new UserInput()
        this.map.mountObjects();
    }

    draw() {
        clear();

        // Update game object position and ui elements
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.userInput.direction,
                map: this.map
            });
        })
        Object.values(this.map.uiElements).forEach(element => {
            element.update({
                player: this.cameraPerson
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

        // Activate Interaction, Draw UI and handle user interaction
        Object.values(this.map.gameObjects).forEach(object => {
            if (object.isPlayerControlled === true) {
                object.checkInteraction({
                    arrow: this.userInput.direction,
                    map: this.map,
                    cameraPerson: this.cameraPerson
                });
                object.handleInteraction({
                    interaction: this.userInput.interaction,
                });
                this.userInput.interactionTyped = null;
            }
        })

        //Draw Static UI Elements
        Object.values(this.map.uiElements).forEach(element => {
            element.sprite.draw();
        })
}
}