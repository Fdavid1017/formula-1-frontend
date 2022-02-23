<template>
  <div
    :style="`--hotspot-color: ${color}; --secondary-color: ${secondaryColor}; top: ${top}%; left: ${left}%`"
    class="hotspot-container"
  >
    <div class="hotspot" @click="showDetails = !showDetails" />
    <div v-if="showDetails" class="details">
      <div class="details-title px-2 px-1">
        {{ title }}
      </div>
      <div class="details-description px-2 px-1" v-html="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "hotspot",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    color: {
      type: String,
      default: "",
    },
    secondaryColor: {
      type: String,
      default: "",
    },
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    // showDetails: false,
  }),
  computed: {
    showDetails: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.hotspot-container {
  $hotspot-size: 17px;

  position: absolute;
  z-index: 20;

  .hotspot {
    position: absolute;
    top: 0;
    left: 0;
    width: $hotspot-size;
    height: $hotspot-size;
    background-color: white;
    border-radius: 50%;
    border: 4px solid var(--hotspot-color);
    cursor: pointer;
    transition: all 0.3s;

    &:after {
      content: " ";
      position: absolute;
      width: $hotspot-size;
      height: $hotspot-size;
      top: 50%;
      left: 50%;
      transform: translate(-49%, -50%);
      border: 2px solid var(--hotspot-color);
      z-index: -1;
      border-radius: 50%;
      transition: all 0.3s;
    }

    &:hover {
      &:after {
        width: calc(#{$hotspot-size} * 1.75);
        height: calc(#{$hotspot-size} * 1.75);
      }
    }
  }

  .details {
    $width: 350px;

    position: absolute;
    width: $width;
    max-width: 95vw;
    bottom: $hotspot-size;
    left: calc((#{$width} / 2 - #{$hotspot-size / 2}) * -1);
    background-color: white;
    border: var(--secondary-color) 3px solid;
    border-radius: 8px;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);

    &:before {
      content: "";
      position: absolute;
      bottom: -16.3px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 17.3px 10px 0 10px;
      border-color: var(--secondary-color) transparent transparent transparent;
    }

    .details-title {
      background-color: var(--secondary-color);
      font-weight: bold;
      font-size: 20px;
    }

    .details-description {
      text-align: justify;
      font-size: 14px;
    }
  }
}
</style>
