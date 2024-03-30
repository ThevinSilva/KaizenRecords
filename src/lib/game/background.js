export default class Background {

  // Dummy Data 
  
    constructor(game) {
      this.game = game;
      // Define layers for the parallax effect
      this.layers = [
        {
          src: "./back.png",
          speed: 0,
          x: 0,
          img: new Image(),
          width: 0,
          height: 0,
        },
        {
          src: "./sun_layer_2.png",
          speed: 0,
          x: 0,
          img: new Image(),
          width: 0,
          height: 0,
        },
        {
          src: "./slow_clouds_MOVING_layer_3.png",
          speed: -0.25,
          x: 0,
          img: new Image(),
          width: 0,
          height: 0,
        },
        {
          src: "./fuji_san_layer_4.png",
          speed: 0,
          x: 0,
          img: new Image(),
          width: 0,
          height: 0,
        },
        // {
        //   src: "./plx-1.png",
        //   speed: -2,
        //   x: 0,
        //   img: new Image(),
        //   width: 0,
        //   height: 0,
        // },
        // {
        //   src: "./plx-2.png",
        //   speed: -3,
        //   x: 0,
        //   img: new Image(),
        //   width: 0,
        //   height: 0,
        // },
        // {
        //   src: "./plx-3.png",
        //   speed: -4,
        //   x: 0,
        //   img: new Image(),
        //   width: 0,
        //   height: 0,
        // },
        // {
        //   src: "./plx-4.png",
        //   speed: -5,
        //   x: 0,
        //   img: new Image(),
        //   width: 0,
        //   height: 0,
        // }, // The ground layer
        // {
        //   src: "./plx-5.png",
        //   speed: -5,
        //   x: 0,
        //   img: new Image(),
        //   width: 0,
        //   height: 0,
        // },
        {
          src: "./ground.png",
          speed: -1,
          x: 0,
          img: new Image(),
          width: 0,
          height: 0,
        },
      ];
  
      this.layers.forEach((layer) => {
        layer.img.src = layer.src;
        layer.img.onload = () => {
          layer.width = layer.img.naturalWidth;
          layer.height = layer.img.naturalHeight;
        };
      });
    }
  
    update() {
      this.layers.forEach((layer) => {
        if (layer.speed !== 0) { // Only update layers that move
          layer.x += layer.speed;
          if (layer.width > 0) {
            layer.x %= layer.width; // Seamless looping
          }
        }
      });
    }
  
    draw() {
      this.layers.forEach((layer) => {
        if (layer.width > 0) { // Ensure the image is loaded
          this._drawLayer(layer);
        }
      });
    }
  
    _drawLayer(layer) {
      const pattern = this.game.context.createPattern(layer.img, 'repeat-x'); // Create a pattern to repeat the image
      this.game.context.fillStyle = pattern;
      this.game.context.translate(layer.x, this.game.height - layer.height); // Adjust the starting position
      this.game.context.fillRect(-layer.x, 0, this.game.width, layer.height); // Draw the pattern
      this.game.context.translate(-layer.x, -(this.game.height - layer.height)); // Reset the translation
    }
  
  }