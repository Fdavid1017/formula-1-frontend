<template>
  <svg
    id="e3d61888-7913-4ace-a41b-81e699b58e17"
    data-name="Réteg 1"
    viewBox="0 0 582.2201 364.6877"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      class="move-reverse-4-s"
      :style="{ fill: primary }"
      height="3"
      width="180"
      x="405.9784"
      y="201.6369"
    />
    <rect
      class="move-5-s"
      :style="{ fill: secondary }"
      height="3"
      width="180"
      x="420.9784"
      y="175.6369"
    />
    <rect
      class="move-reverse-5-s"
      :style="{ fill: primary }"
      height="4.6216"
      width="107.1345"
      x="486.497"
      y="251.4465"
    />
    <rect
      class="move-reverse-6-s"
      :style="{ fill: secondary }"
      height="4.4103"
      width="180"
      x="146.5185"
      y="282.3974"
    />
    <rect
      class="move-3-s"
      :style="{ fill: tertiary }"
      height="5.8205"
      width="261.7855"
      x="226.1706"
      y="141.8321"
    />
    <rect
      class="move-4-s"
      :style="{ fill: primary }"
      height="3"
      width="180"
      x="41.9784"
      y="263.6369"
    />
    <rect
      class="move-reverse-2-s"
      :style="{ fill: primary }"
      height="3"
      width="48.3628"
      x="214.685"
      y="95.7035"
    />
    <rect
      class="move-7-s"
      :style="{ fill: secondary }"
      height="5.8205"
      width="118.7606"
      x="-12.5206"
      y="126.4796"
    />
    <rect
      class="move-5-s"
      :style="{ fill: secondary }"
      height="3"
      width="180"
      x="146.9784"
      y="38.6369"
    />
  </svg>
</template>

<script>
export default {
  name: "card-background",
  props: {
    primary: {
      type: String,
      default: "#ffc100",
    },
    secondary: {
      type: String,
      default: "#23b7b7",
    },
    tertiary: {
      type: String,
      default: "#39b54a",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/svg-lines-animations";
</style>
