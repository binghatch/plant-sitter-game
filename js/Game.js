class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office),
        this.userInput,
        this.cameraPerson = this.map.gameObjects.hero,
        this.staticObjects
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

        // Store static Objects in variable
        this.staticObjects = Object.values(this.map.gameObjects).filter(object => !object.isPlayerControlled);
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
        this.staticObjects.forEach(object => {
            object.sprite.draw(this.cameraPerson, "lower");
        })

        // Draw player
        this.cameraPerson.sprite.draw(this.cameraPerson);

        // Draw upper map   
        this.map.drawUpperImage(this.cameraPerson);

        // Draw game objects' upper part
        this.staticObjects.forEach(object => {
            object.sprite.draw(this.cameraPerson, "upper");
        })

        // Activate Interaction, Draw UI and handle user interaction
        this.cameraPerson.checkInteraction({
            arrow: this.userInput.direction,
            map: this.map,
            cameraPerson: this.cameraPerson
        });
        this.cameraPerson.handleInteraction({
            interaction: this.userInput.interaction,
        });
        this.userInput.interactionTyped = null;

        //Draw Static UI Elements
        Object.values(this.map.uiElements).forEach(element => {
            element.sprite.draw();
        })
}
}