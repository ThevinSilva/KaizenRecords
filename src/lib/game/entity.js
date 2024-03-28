export default class Entity {
  constructor(src) {
    this.states = src;
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
  }

  // Here you can add methods for animation, collision detection, etc.
}
