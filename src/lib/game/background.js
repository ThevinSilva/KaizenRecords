export default class Background {
  // Dummy Data

  // - Add slower pace for swirly
  static MaxSpeed = -8;

  constructor(game) {
    this.game = game;
    this._speed = -4;
    // Define layers for the parallax effect
    this.layers = [
      {
        src: "./sky_sun.png",
        speed: 0,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./clouds.png",
        speed: -0.25,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./mountain.png",
        speed: 0,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./bamboo_3.png",
        speed: -1,
        floor: true,

        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./bamboo_2.png",
        speed: -2,
        floor: true,

        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./bamboo_1.png",
        floor: true,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./bamboo_fog.png",
        speed: -0.5,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },

      {
        src: "./trees_floor.png",
        floor: true,
        x: 0,
        img: new Image(),
        width: 0,
        height: 0,
      },
      {
        src: "./swirly.png",
        lowSpeed: -0.5,
        x: 0,
        img: new Image(),
        floor: true,

        width: 0,
        height: 0,
      },
    ];
    this.paused = false;

    this.layers.forEach((layer) => {
      layer.img.src = layer.src;
      layer.img.onload = () => {
        layer.width = layer.img.naturalWidth;
        layer.height = layer.img.naturalHeight;
      };
    });
  }

  set speed(val) {
    if (val >= Background.MaxSpeed) this._speed = val;
  }

  get speed() {
    return this._speed;
  }

  update() {
    if (this.paused) return;
    this.layers.forEach((layer) => {
      if (layer.speed !== 0) {
        // Only update layers that move
        const lowSpeed = layer.lowSpeed || 0;
        layer.x +=
          layer.floor && !this.game.running
            ? lowSpeed || 0
            : layer.speed || this.speed - lowSpeed;
        if (layer.width > 0) {
          layer.x %= layer.width; // Seamless looping
        }
      }
    });
  }

  draw() {
    this.layers.forEach((layer) => {
      if (layer.width > 0) {
        // Ensure the image is loaded
        this._drawLayer(layer);
      }
    });
  }

  // Utility to find ground layer
  floor() {
    return this.layers.find((layer) =>
      layer.src.toLowerCase().includes("floor")
    );
  }

  _drawLayer(layer) {
    const pattern = this.game.context.createPattern(layer.img, "repeat-x"); // Create a pattern to repeat the image
    this.game.context.fillStyle = pattern;
    this.game.context.translate(layer.x, this.game.height - layer.height); // Adjust the starting position
    this.game.context.fillRect(-layer.x, 0, this.game.width, layer.height); // Draw the pattern
    this.game.context.translate(-layer.x, -(this.game.height - layer.height)); // Reset the translation
  }
}
