<template>
  <v-container class="my-16">
    <v-tabs v-model="tabs" centered class="" color="primary" fixed-tabs>
      <v-tab>Drivers</v-tab>
      <v-tab>Constructors</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <driver-standings />
      </v-tab-item>
      <v-tab-item> constructors</v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DriverStandings from "@/components/standings/driver-standings";

export default {
  name: "Standings",
  components: { DriverStandings },
  data: () => ({
    tabs: null
  })
};
</script>

<style scoped></style>
