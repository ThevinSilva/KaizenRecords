import Player from "./player";
import Background from "./background";

export default class GameManager {
  constructor(canvas, setScore, height = 500, width = 1000) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.canvas.height = height;
    this.canvas.width = width;
    this.context = this.canvas.getContext("2d");
    this._lastRenderTime = 0;
    this.targetFPS = 120; // Target frame rate

    // Game Entities
    this.player = new Player(this); // Assume this passes the necessary game context or settings
    this.background = new Background(this);
    this._interval = 0;
    // set react states
    this.setScore = setScore;
    this.start();
  }

  start() {
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    this.player.update();
    this.background.update();

    if (this._interval >= 0.5) {
      this.setScore((prevScore) => prevScore + 1);
      this._interval = 0;
    }
    this._interval += deltaTime;

    // Add here any other game entities' update logic
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height); // Clear the canvas for fresh drawing
    this.background.draw();
    this.player.draw();

    // Draw the player on the canvas
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
