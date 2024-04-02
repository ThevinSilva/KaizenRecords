import Player from "./player";
import Background from "./background";
import Obstacle from "./obstacles";

export default class GameManager {
  constructor(canvas, setScore, setState, height = 500, width = 1000) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.canvas.height = height;
    this.canvas.width = width;
    this.context = this.canvas.getContext("2d");
    this._lastRenderTime = 0;
    this.targetFPS = 60; // Target frame rate
    this.running = false;
    this.obstacles = [];
    this.floor = 56;
    this.hitboxWidth = 25;
    this.hitboxHeight = 50;

    // Game Entities
    this.background = new Background(this);
    this.player = new Player(this); // Assume this passes the necessary game context or settings
    this._interval = 0;
    // set react states
    this.setScore = setScore;
    this.setState = setState;
    this._input();
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  start() {
    this.running = true;
  }

  reset() {
    this.setScore(0);
    this.running = false;
    this.player.reset();
    this.obstacles.forEach((obstacle) => this.removeObstacle(obstacle));
  }

  pause() {
    this.player.paused = !this.player.paused;
    this.background.paused = !this.background.paused;
  }

  update(deltaTime) {
    this.obstacles.forEach((obstacle) => {
      obstacle.update(deltaTime);
      if (this.player.checkCollision(obstacle, 85, 50)) this.death();
    });
    this.player.update();
    this.background.update();

    if (this._interval >= 0.5 && !this.player.paused && this.running) {
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
    this.obstacles.forEach((obstacle) => obstacle.draw());
    // this.context.fillStyle = "green";
    // this.context.fillRect(600, 380, 60, 70);

    // const image = new Image();
    // image.src = "./opacity.png";

    // this.context.drawImage(image, 0, 0, 60, 70, 600, 380, 60, 70);

    // Draw the player on the canvas
    // Here you would also draw other game entities
  }

  spawnObstacle() {
    const spacingProbability = 0.01; // Base probability of spacing between obstacles
    const minSpacing = 100; // Minimum spacing between obstacles
    const maxSpacing = 300; // Maximum spacing between obstacles

    // Check if the last obstacle exists and its x position
    const lastObstacle = this.obstacles[this.obstacles.length - 1];
    const lastObstacleX = lastObstacle ? lastObstacle.x : this.width;

    // Calculate the probability of spacing between obstacles based on the difference in x positions
    const spacingChance = Math.max(
      0,
      Math.min(1, (lastObstacleX - minSpacing) / (maxSpacing - minSpacing))
    );
    const spawnSpacing = Math.random() < spacingChance * spacingProbability;

    // Check if spacing should occur or if a new obstacle should be spawned
    if (spawnSpacing || !lastObstacle) {
      const obstacle = new Obstacle(this);
      this.obstacles.push(obstacle);
    }

    // Increase frequency of obstacle spawning over time
    const elapsedTime = performance.now() / 1000; // Convert milliseconds to seconds
    const spawnProbability = Math.min(0.1, elapsedTime / 60); // Increase probability every 60 seconds
    if (Math.random() < spawnProbability) {
      const obstacle = new Obstacle(this);
      this.obstacles.push(obstacle);
    }
  }

  removeObstacle(obstacle) {
    const index = this.obstacles.indexOf(obstacle);
    if (index > -1) {
      this.obstacles.splice(index, 1);
    }
  }

  gameLoop(timestamp) {
    const secondsSinceLastRender = (timestamp - this._lastRenderTime) / 1000;
    const maxFPSInterval = 1 / this.targetFPS;

    if (secondsSinceLastRender < maxFPSInterval) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
      return;
    }

    if (Math.random() < 0.005 && this.running) {
      // Adjust the probability as needed
      console.log("I ran");
      this.spawnObstacle();
    }

    this.update(secondsSinceLastRender); // Update game state based on elapsed time

    this.render(); // Render the updated game state

    this._lastRenderTime = timestamp; // Remember the time of the last render
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Schedule the next frame
  }

  death() {
    this.setState("death");
    this.playing = false;
  }

  // Input handler
  _input() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const keycodes = { JUMP: { 38: 1, 32: 1 } }; // For jumping

    if (isMobile) {
      window.addEventListener("touchstart", () => this.jump());
    } else {
      window.addEventListener("keydown", ({ keyCode }) => {
        if (keycodes.JUMP[keyCode]) {
          if (this.running) this.player.jump();
          else {
            this.setState("running");
          }
        }
      });
    }
  }
}
