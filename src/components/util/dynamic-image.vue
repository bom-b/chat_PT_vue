<template>
  <img ref="imageElement" :src="imageSource" style="max-height: 80%; object-fit: contain;">
</template>

<script>
export default {
  data() {
    return {
      imageSources: [
        "/assets/img/graphic/taco.png",
        "/assets/img/graphic/donut.png",
        "/assets/img/graphic/burger.png",
        "/assets/img/graphic/carrot.png",
        "/assets/img/graphic/coffe.png",
        "/assets/img/graphic/cookies.png",
        "/assets/img/graphic/croisant.png",
        "/assets/img/graphic/egg_bacon.png",
        "/assets/img/graphic/eggplant.png",
        "/assets/img/graphic/float.png",
        "/assets/img/graphic/fries.png",
        "/assets/img/graphic/hot_dog.png",
        "/assets/img/graphic/macaroon.png",
        "/assets/img/graphic/pizza.png",
        "/assets/img/graphic/pretzel.png",
        "/assets/img/graphic/steak.png",
        "/assets/img/graphic/sushi_caviar.png",
      ],
      imageSource: "",
    };
  },
  mounted() {
    this.changeImage();

    // Set up Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver(this.handleIntersection, options);

    // Observe the image element
    observer.observe(this.$refs.imageElement);
  },
  methods: {
    getRandomImageSource() {
      const randomIndex = Math.floor(Math.random() * this.imageSources.length);
      return this.imageSources[randomIndex];
    },
    changeImage() {
      this.imageSource = this.getRandomImageSource();
    },
    handleIntersection(entries) {
      // Check if the image is intersecting with the viewport
      if (entries[0].isIntersecting) {
        // Change image source if intersecting
        this.changeImage();
      }
    },
  },
};
</script>
