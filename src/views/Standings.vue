<template>
  <v-container class="my-16">
    <v-tabs v-model="tabs" centered class="" color="primary" fixed-tabs>
      <v-tab>Drivers</v-tab>
      <v-tab>Constructors</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs" class="overflow-visible">
      <v-tab-item>
        <driver-standings />
      </v-tab-item>
      <v-tab-item>
        <constructors-standings />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DriverStandings from "@/components/standings/driver-standings";
import ConstructorsStandings from "@/components/standings/constructors-standings";

export default {
  name: "Standings",
  components: { ConstructorsStandings, DriverStandings },
  data: () => ({
    tabs: null,
  }),
};
</script>

<style scoped></style>
