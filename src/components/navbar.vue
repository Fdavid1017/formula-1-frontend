<template>
  <v-app-bar app class="z-top navbar" elevate-on-scroll>
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          class="mx-2"
          contain
          max-height="65"
          max-width="65"
          src="@/assets/logo.svg"
        ></v-img>
      </router-link>
    </v-toolbar-title>

    <v-tooltip v-if="backButtonState" bottom>
      <template v-slot:activator="{ on, attrs }">
        <font-awesome-icon
          class="back-btn ml-4"
          icon="fa-solid fa-chevron-left"
          size="xl"
          v-bind="attrs"
          @click="backClick"
          v-on="on"
        />
      </template>
      <span>Back</span>
    </v-tooltip>

    <v-spacer></v-spacer>

    <div class="d-none d-md-flex align-center">
      <router-link
        v-for="link in routerLinks"
        :key="link.url"
        class="mx-3"
        :to="link.url"
      >
        {{ link.text }}
      </router-link>
    </div>

    <open-close-button
      class="d-md-none mr-n6"
      :opened="drawer"
      @click="drawer = !drawer"
    />

    <mobile-menu
      class="d-md-none"
      :links="routerLinks"
      v-model="drawer"
      @item-click="itemClick"
    />
  </v-app-bar>
</template>

<script>
import OpenCloseButton from "@/components/open-close-button";
import MobileMenu from "@/components/mobile-menu";

export default {
  name: "navbar",
  components: { MobileMenu, OpenCloseButton },
  data: () => ({
    drawer: false,
    routerLinks: [
      { text: "Schedule", url: "/schedule" },
      { text: "News", url: "/news" },
      { text: "Drivers", url: "/drivers" },
      { text: "Constructors", url: "/constructors" },
      { text: "Standings", url: "/standings" },
    ],
  }),
  methods: {
    backClick() {
      this.$store.commit("backButtonClick");
    },
    itemClick() {
      console.log("drawer");
      this.drawer = false;
    },
  },
  computed: {
    backButtonState() {
      return this.$store.getters.backButtonState;
    },
  },
  watch: {
    drawer(val) {
      const body = document.getElementsByTagName("body")[0];

      if (val) {
        body.classList.add("overflow-hidden");
      } else {
        body.classList.remove("overflow-hidden");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  @include navbar-text;

  z-index: 999 !important;
  font-family: Formula1;

  .back-btn {
    cursor: pointer;
    opacity: 0.75;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
