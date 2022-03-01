<template>
  <div>
    <v-app-bar app class="z-top navbar" elevation="2">
      <v-row align="center" class="" justify="space-between">
        <v-col class="d-flex align-center" cols="2">
          <v-toolbar-title>
            <router-link to="/">
              <v-img
                class="mx-2"
                contain
                max-height="65"
                max-width="65"
                src="@/assets/logo.svg"
              />
            </router-link>
          </v-toolbar-title>
          <div class="back-button ml-5">
            <v-tooltip v-if="backButtonState" bottom>
              <template v-slot:activator="{ on, attrs }">
                <font-awesome-icon
                  class="back-btn"
                  icon="fa-solid fa-chevron-left"
                  size="xl"
                  v-bind="attrs"
                  @click="backClick"
                  v-on="on"
                />
              </template>
              <span>Back</span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/schedule"> Schedule</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/news"> News</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/drivers"> Drivers</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/constructors"> Constructors</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/"> Standings</router-link>
        </v-col>

        <v-col class="d-md-none" cols="2">
          <open-close-button :opened="drawer" @click="drawer = true" />
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense nav>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
              <router-link to="/schedule"> Schedule</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/news"> News</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/drivers"> Drivers</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/constructors"> Constructors</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/"> Standings</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import OpenCloseButton from "@/components/open-close-button";

export default {
  name: "navbar",
  components: { OpenCloseButton },
  data: () => ({
    drawer: false,
  }),
  methods: {
    backClick() {
      this.$store.commit("backButtonClick");
    },
  },
  computed: {
    backButtonState() {
      return this.$store.getters.backButtonState;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 999 !important;
  font-family: Formula1;

  .router-link-exact-active {
    &:after {
      width: 100% !important;
    }
  }

  a {
    color: black;
    font-weight: bold;
    text-decoration: none;
    position: relative;

    $line-height: 3px;

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -$line-height;
      width: 0;
      height: $line-height;
      background-color: $f1-red;
      transition: all 0.3s ease-in;
    }

    &:hover:after {
      width: 100%;
    }
  }

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
