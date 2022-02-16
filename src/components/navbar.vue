<template>
  <div>
    <v-app-bar app class="z-top navbar" elevation="2">
      <v-row align="center" class="" justify="space-between">
        <v-col cols="2">
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
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/"> Schedule</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/"> News</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/"> Drivers</router-link>
        </v-col>
        <v-col class="d-none d-md-block" cols="2">
          <router-link to="/"> Constructors</router-link>
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
            <v-list-item-title>Schedule</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>News</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Drivers</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Constructors</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Standings</v-list-item-title>
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
};
</script>

<style lang="scss" scoped>
.navbar {
  font-family: Formula1;

  .active {
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
}
</style>
