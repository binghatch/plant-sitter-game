class Game {
    constructor(config) {
        this.map = new GameMap(window.GameMaps.Office),
        this.userInput,
        this.cameraPerson = this.map.gameObjects.hero,
        this.staticObjects,
        this.gameLost = false,
        this.gameWon = false,
        this.music = {
            inGame: null,
            gameLost: null,
            gameWon: null
        }
        this.plantsAlive,
        this.dayDuration = 600,
        this.day = 0
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

        // Load Font
        this.font = loadFont("./assets/ui/font/mago2.ttf")

        // Load Game Music
        this.music.inGame = loadSound("./assets/music/in_game.wav")
        this.music.inGame.setVolume(0.4);
        this.music.gameLost = loadSound("./assets/music/game_over.wav");
        this.music.gameLost.setVolume(0.4);
        this.music.gameWon = loadSound("./assets/music/game_won.wav");
        this.music.gameWon.setVolume(0.4);
    }

    setup() {
        this.userInput = new UserInput()
        this.map.mountObjects();

        // Start Music
        this.music.inGame.loop();

        // Store static Objects in variable
        this.staticObjects = Object.values(this.map.gameObjects).filter(object => !object.isPlayerControlled);

        // Set number of plants alive
        this.plantsAlive = this.staticObjects.filter(plant => plant instanceof Plant).length
    }

    draw() {
        clear();

        this.update();

        // Update game object position and ui elements
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.userInput.direction,
                map: this.map,
                game: this
            });
        })



        this.map.uiElements["waterBar"].update({
            player: this.cameraPerson
        });

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

        if (this.gameLost) {
            this.music.inGame.stop();
            this.music.gameLost.loop();
            background(214, 47, 15);
            textAlign(CENTER);
            textFont(this.font);
            textSize(60);
            fill(255);
            text("GAME OVER", 176, 99);
            textSize(15);
            text(`YOU KILLED ${5 - this.plantsAlive} PLANTS.`, 176, 120);
            text("YOU MONSTER!", 176, 128);
            noLoop();
            return;
        } else if (this.gameWon) {
            this.music.inGame.stop();
            this.music.gameWon.loop();
            background(24, 143, 88);
            filter(BLUR, 1)
            textAlign(CENTER);
            textFont(this.font);
            textSize(60);
            fill(255);
            text("YOU WON", 176, 99);
            textSize(15);
            text(`YOU SAVED ${this.plantsAlive} PLANTS.`, 176, 120);
            text("GOOD WORK!", 176, 128);
            noLoop();
            return;
        }
    }

    update() {
        // Elapse day
        if (frameCount % this.dayDuration === 0 && this.day < 6) {
            this.map.uiElements["dayDisplay"].update();
            this.day++;
        }

        if (this.day === 6) {
            // End game if number of dead plants is more then half of the plants
            if (this.plantsAlive < 4) {
                this.endGame("lost");
            } else {
                this.endGame("won");
            }
        }
    }

    endGame(status) {
        if (status === "lost") {
            this.gameLost = true;
        } else if (status === "won") {
            this.gameWon = true;
        }
    }
}