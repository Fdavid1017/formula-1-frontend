<template>
  <div class="session-telemetry">
    <v-tabs v-model="tabs" centered color="secondary" fixed-tabs>
      <v-tab>Charts</v-tab>
      <v-tab>Gear shifts visualization</v-tab>
      <v-tab>Speed visualization</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs" class="">
      <v-tab-item>
        <v-tabs v-model="chartTabs" centered color="secondary" fixed-tabs>
          <v-tab>Full race</v-tab>
          <v-tab>Single lap</v-tab>
        </v-tabs>

        <v-tabs-items v-model="chartTabs" class="">
          <v-tab-item>
            <full-race-chart :round="round" :session="session" />
          </v-tab-item>
          <v-tab-item>lap</v-tab-item>
        </v-tabs-items>
      </v-tab-item>
      <v-tab-item> gear</v-tab-item>
      <v-tab-item> speed</v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import FullRaceChart from "@/components/schedule/weekend/telemetry/full-race-chart";

export default {
  name: "session-telemetry",
  components: { FullRaceChart },
  props: {
    round: {
      type: String,
      default: "",
    },
    session: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    tabs: null,
    chartTabs: null,
  }),
};
</script>

<style lang="scss" scoped></style>
