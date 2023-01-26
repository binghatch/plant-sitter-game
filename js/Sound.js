class Sound {
    constructor(config) {
        this.soundSrc = config.soundSrc || "../assets/sounds/Water_Splash.wav",
        this.sound = null
    }

    preload() {
        this.sound = loadSound(this.soundSrc);
    }

    trigger(type) {
        this.sound.play();
    }

    stop() {
        this.sound.stop();
    }
    
}