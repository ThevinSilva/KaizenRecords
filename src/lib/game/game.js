import Player from "./player";

export default class GameManager {
  constructor(canvas, height = 500, width = 500) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.canvas.height = height;
    this.canvas.width = width;
    this.context = this.canvas.getContext("2d");
    this._lastRenderTime = 0;
    this.targetFPS = 60; // Target frame rate
    this.player = new Player(this); // Assume this passes the necessary game context or settings
    this._start();
  }

  // Starts the game loop
  _start() {
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    // Update the player's state based on deltaTime
    this.player.update();
    // Add here any other game entities' update logic
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height); // Clear the canvas for fresh drawing
    this.player.draw(this.context); // Draw the player on the canvas
    // Here you would also draw other game entities
  }

  gameLoop(timestamp) {
    const secondsSinceLastRender = (timestamp - this._lastRenderTime) / 1000;
    const maxFPSInterval = 1 / this.targetFPS;

    if (secondsSinceLastRender < maxFPSInterval) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
      return;
    }

    this.update(secondsSinceLastRender); // Update game state based on elapsed time
    this.render(); // Render the updated game state

    this._lastRenderTime = timestamp; // Remember the time of the last render
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Schedule the next frame
  }
}
