<template>
  <div class="fill-height fill-width d-flex justify-center align-center">
    <v-progress-circular v-if="!image" indeterminate color="primary" />
    <img class="loading-indicator" v-else :src="image" alt="Loading..." />
  </div>
</template>

<script>
export default {
  name: "loading-indicator",
  data: () => ({
    image: null,
  }),
  mounted() {
    const tires = ["hard", "inter", "medium", "rain", "soft"];
    const tire = tires[Math.floor(Math.random() * tires.length)];

    this.image = require(`@/assets/images/tires/${tire}.svg`);
  },
};
</script>

<style lang="scss" scoped>
.loading-indicator {
  width: 75px;
  aspect-ratio: 1/1;
  animation: rotate infinite 2s linear;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
