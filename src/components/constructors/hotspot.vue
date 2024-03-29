<template>
  <div
    :class="position"
    :style="`--hotspot-color: ${color}; --secondary-color: ${secondaryColor}; top: ${top}%; left: ${left}%`"
    class="hotspot-container"
    @click="showDetails = !showDetails"
  >
    <div :class="{ 'hide-title': showDetails }" class="hotspot-title">
      {{ title }}
    </div>
    <div class="hotspot" />
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
    position: {
      type: String,
      default: "top-align",
    },
  },
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
$hotspot-size: 17px;
$width: 350px;

.hotspot-container {
  position: absolute;
  z-index: 20;

  .hotspot-title {
    color: white;
    position: absolute;
    left: calc(#{$hotspot-size} + 5px);
    top: 0;
    font-size: 25px;
    line-height: 24px;
    font-weight: bolder;
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .hide-title {
    opacity: 0;
    pointer-events: none;
  }

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
    z-index: 0;

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
    position: absolute;
    width: $width;
    max-width: 95vw;
    background-color: white;
    outline: var(--secondary-color) 4px solid;
    outline-offset: -1px;
    border-radius: 8px;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
    z-index: 25;

    &:before {
      content: "";
      position: absolute;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
    }

    .details-title {
      background-color: var(--secondary-color);
      font-weight: bold;
      font-size: 20px;
      color: white;
    }

    .details-description {
      text-align: justify;
      font-size: 14px;
    }
  }
}

.top-align {
  .details {
    bottom: $hotspot-size;
    left: calc((#{$width} / 2 - #{$hotspot-size / 2}) * -1);

    &:before {
      bottom: -17px;
      left: 50%;
      border-width: 17.3px 10px 0 10px;
      border-color: var(--secondary-color) transparent transparent transparent;
    }
  }
}

.bottom-align {
  .details {
    top: 100%;
    left: 0;
    transform: translate(-48%, 30px);

    &:before {
      top: -17px;
      left: 50%;
      border-width: 0 10px 17.3px 10px;
      border-color: transparent transparent var(--secondary-color) transparent;
    }
  }
}

.right-align {
  .details {
    bottom: 0;
    left: 40px;
    transform: translateY(48%);

    &:before {
      top: 50%;
      left: -9px;
      border-width: 10px 17.3px 10px 0;
      border-color: transparent var(--secondary-color) transparent transparent;
    }
  }
}

.left-align {
  .details {
    left: -17px;
    top: -1px;
    transform: translate(-100%, -50%);

    &:before {
      top: 50%;
      right: -26px;
      border-width: 10px 0 10px 17.3px;
      border-color: transparent transparent transparent var(--secondary-color);
    }
  }
}
</style>
