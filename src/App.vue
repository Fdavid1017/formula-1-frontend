<template>
  <v-app>
    <navbar />

    <v-main>
      <router-view />
    </v-main>

    <my-footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/navbar";
import MyFooter from "@/components/my-footer";

export default {
  name: "App",
  components: { MyFooter, Navbar },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Poppins;
}
</style>
