const utils = {
    withGrid(n) {
        return n * 16;
    },
    pixelsToCoord(n) {
        return n / 16;
    },
    asGridCoord(x, y) {
        return `${x}, ${y}`;
    },
    relativePosition(x, y, gameObject) {
        const relativeX = gameObject.x + x;
        const relativeY = gameObject.y + y;
        return {relativeX, relativeY};
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const gridSize = 16;

        switch (direction) {
            case "up":
                y -= gridSize;
                break;
            case "down":
                y += gridSize;
                break;
            case "left":
                x -= gridSize;
                break;
            case "right":
                x += gridSize;
                break;
        }
        x /= gridSize;
        y /= gridSize;
        return {x, y};
    }
}