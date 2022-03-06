<template>
  <div class="mobile-menu pa-5" :class="{ 'mobile-menu-open': open }">
    <router-link
      v-for="link in links"
      :key="link.url"
      class="my-3"
      :to="link.url"
    >
      <div @click="open = false">{{ link.text }}</div>
    </router-link>

    <card-background
      class="background-animation"
      primary="#e10600"
      secondary="#003049"
      tertiary="#2e2e2e"
    />
  </div>
</template>

<script>
import CardBackground from "@/components/card-background";

export default {
  name: "mobile-menu",
  components: { CardBackground },
  props: {
    links: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    open: {
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
.mobile-menu {
  @include navbar-text;

  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f5f5f5;
  width: 100%;
  height: calc(100vh - 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: all 0.4s ease-in;
  clip-path: ellipse(0 0 at 88% -10%);

  .background-animation {
    pointer-events: none;
    position: absolute;
    bottom: -10%;
    right: -60%;
    z-index: -1;
    transform: rotate(-45deg);
  }
}

.mobile-menu-open {
  clip-path: ellipse(140% 140% at 88% -10%) !important;
}
</style>
