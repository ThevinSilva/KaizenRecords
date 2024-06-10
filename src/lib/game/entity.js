export default class Entity {
  constructor(src) {
    this.states = src;
    this.frameCounter = 0;
    this.currentFrame = 0;
    this._currentState = "idle"; // Default state
    this.ready = false;
  }

  set currentState(state) {
    if (this._currentState !== state) {
      this.currentFrame = 0;
      this._currentState = state;
    }
  }

  get currentState() {
    return this._currentState;
  }

  async preloadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load image at ${url}`));
      image.src = url;
    });
  }

  async preload() {
    const promises = Object.entries(this.states).map(async ([key, state]) => {
      // Correctly await the image loading and then assign it
      const loadedImage = await this.preloadImage(state.src);
      this.states[key].image = loadedImage; // Assign the loaded image back to the correct state
    });

    await Promise.all(promises); // Wait for all images to be loaded
    this.ready = true;
  }

  updateAnimation(speed = 5) {
    if (!this.ready || this.paused) return;
    const state = this.states[this.currentState];
    if (!state || !state.image) return;

    this.frameCounter = (this.frameCounter + 1) % speed; // Change 5 to adjust animation speed
    if (this.frameCounter === 0) {
      if (!(state.noRepeat && this.currentFrame >= state.frames - 1)) {
        // Loop animation or proceed to the next frame as usual
        this.currentFrame = (this.currentFrame + 1) % state.frames;
      }
    }
  }

  checkCollision(otherEntity) {
    // Bounding box of the current entity using hitbox dimensions
    const thisLeft = this.x + this.xOffset;
    const thisRight = this.x + this.hitboxWidth + this.xOffset;
    const thisTop = this.y + this.yOffset;
    const thisBottom = this.y + this.hitboxHeight + this.yOffset;

    // Bounding box of the other entity using hitbox dimensions
    const otherLeft = otherEntity.x + otherEntity.xOffset;
    const otherRight =
      otherEntity.x + otherEntity.hitboxWidth + otherEntity.xOffset;
    const otherTop = otherEntity.y + otherEntity.yOffset;
    const otherBottom =
      otherEntity.y + otherEntity.hitboxHeight + otherEntity.yOffset;

    // Check for collision
    if (
      thisRight > otherLeft &&
      thisLeft < otherRight &&
      thisBottom > otherTop &&
      thisTop < otherBottom
    ) {
      // Collision detected
      return true;
    }
    return false;
  }

  draw(context, x, y, width, height) {
    if (!this.ready) return;

    const state = this.states[this.currentState];
    if (!state || !state.image) return;

    const frameWidth = state.image.width / state.frames;
    const frameX = this.currentFrame * frameWidth;

    context.drawImage(
      state.image,
      frameX,
      0, // Assuming all frames have the same height
      frameWidth,
      height,
      x,
      y,
      frameWidth,
      height
    );
  }
}
