export default class Player {
  static JUMPPOWER = -10;
  static GRAVITY = 0.5;

  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = Math.floor(this.game.width / 2) - Math.floor(this.width / 2);
    this.y = 100;
    this.vy = 0; // vertical velocity
    this.onGround = false;

    this._input();
  }

  update() {
    // Apply gravity
    this.vy += Player.GRAVITY;
    // Apply vertical velocity to Y position
    this.y += this.vy;
    // Check ground collision
    if (this.y >= this.game.height - this.height) {
      this.y = this.game.height - this.height; // Adjust player position to ground level
      this.vy = 0; // Stop moving vertically
      this.onGround = true; // Player is on the ground
    }
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.onGround) {
      this.vy = Player.JUMPPOWER;
      this.isOnGround = false;
    }
  }

  // Input handler
  _input() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const keycodes = {
      // up and space bar
      JUMP: { 38: 1, 32: 1 },
      //for future added functionality
    };

    if (isMobile) {
      window.addEventListener("touchstart", () => {
        this.jump();
      });
    } else {
      window.addEventListener("keydown", ({ keyCode }) => {
        if (keycodes.JUMP[keyCode]) this.jump();
      });
    }
  }
}
