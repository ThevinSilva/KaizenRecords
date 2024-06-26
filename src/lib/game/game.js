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
    this.score = 0;
    this.context = this.canvas.getContext("2d");
    this._lastRenderTime = 0;
    this.targetFPS = 90; // Target frame rate
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
    this.score = 0;
    this.player.reset();
    this.obstacles.forEach((obstacle) => this.removeObstacle(obstacle));
  }

  pause() {
    this.player.paused = !this.player.paused;
    this.background.paused = !this.background.paused;
  }

  update(deltaTime) {
    this.obstacles.forEach((obstacle) => {
      if (!this.player.paused) obstacle.update(deltaTime);
      if (this.player.checkCollision(obstacle)) this.death();
    });
    this.player.update();
    this.background.update();

    if (this._interval >= 0.5 && !this.player.paused && this.running) {
      this.setScore((prevScore) => prevScore + 1);
      this.score += 1;
      if (this.score % 100 === 0 && this.score !== 0) {
        this.background.speed -= 1;
      }
      this._interval = 0;
    }
    this._interval += deltaTime;

    // Add here any other game entities' update logic
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height); // Clear the canvas for fresh drawing

    this.background.draw();

    // HITBOX MODE
    // this.player.drawHitBox();
    // this.obstacles.forEach((obstacle) => obstacle.drawHitBox());
    // NORMAL MODE
    this.player.draw();
    this.obstacles.forEach((obstacle) => obstacle.draw());
  }

  spawnObstacle() {
    const spacingProbability = 0.05; // Base probability of spacing between obstacles
    const minSpacing = 1400; // Minimum spacing between obstacles
    const maxSpacing = 2800; // Maximum spacing between obstacles
    const choices = Object.keys(Obstacle.src);
    const state = choices[Math.floor(Math.random() * choices.length)];
    // const state = "fireball";

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
      const obstacle = new Obstacle(this, state);
      this.obstacles.push(obstacle);
    }

    // Increase frequency of obstacle spawning over time
    const elapsedTime = performance.now() / 1000; // Convert milliseconds to seconds
    const spawnProbability = Math.min(0.1, elapsedTime / 60); // Increase probability every 60 seconds
    if (Math.random() < spawnProbability) {
      const obstacle = new Obstacle(this, state);
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
      this.spawnObstacle();
    }

    this.update(secondsSinceLastRender); // Update game state based on elapsed time

    this.render(); // Render the updated game state

    this._lastRenderTime = timestamp; // Remember the time of the last render
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Schedule the next frame
  }

  death() {
    this.setState("death");
    // if (!this.player.death) this.player.currentFrame = 0;
    this.player.death = true;
    this.running = false;
  }

  // Input handler
  _input() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const keycodes = { JUMP: { 38: 1, 32: 1 } }; // For jumping

    if (isMobile) {
      window.addEventListener("touchstart", () => {
        if (this.running) this.player.jump();
      });
    } else {
      window.addEventListener("keydown", ({ keyCode }) => {
        if (keycodes.JUMP[keyCode]) {
          if (!this.player.death) {
            if (this.running) this.player.jump();
            else {
              this.setState("running");
            }
          }
        }
      });
    }
  }
}
