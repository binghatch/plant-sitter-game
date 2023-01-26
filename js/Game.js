class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office),
        this.userInput,
        this.cameraPerson = this.map.gameObjects.hero,
        this.staticObjects,
        this.gameOver = false,
        this.music = {
            inGame: null,
            gameOver: null,
        }
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

        this.music.inGame = loadSound("../assets/music/in_game.wav")
        this.music.inGame.setVolume(0.4);
        this.music.gameOver = loadSound("../assets/music/game_over.wav");
        this.music.gameOver.setVolume(0.4);
    }

    setup() {
        this.userInput = new UserInput()
        this.map.mountObjects();

        this.music.inGame.loop();

        // Store static Objects in variable
        this.staticObjects = Object.values(this.map.gameObjects).filter(object => !object.isPlayerControlled);
    }

    draw() {
        clear();

        if (this.gameOver) {
            this.music.inGame.stop();
            this.music.gameOver.loop();
            background(255, 0, 0);
            textAlign(CENTER);
            textSize(20);
            fill(255);
            text("GAME OVER", 176, 99);
            noLoop();
            return;
        }

        // Update game object position and ui elements
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.userInput.direction,
                map: this.map,
                game: this
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

    endGame() {
        this.gameOver = true;
    }
}