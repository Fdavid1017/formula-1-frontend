<template>
  <div class="session-telemetry">
    <div class="note mb-5 ml-1">Note: some data may be inaccurate / incorrect.</div>
    <v-row class="mb-5">
      <v-col class="d-flex justify-center align-center" cols="12" md="4">
        <v-select
          v-model="displayMode"
          :items="displayModeSelectItems"
          dense
          hide-details
          item-text="text"
          item-value="value"
          label="Display mode"
          outlined
        />
      </v-col>
      <v-col
        v-if="displayMode === 'charts'"
        class="d-flex justify-center align-center"
        cols="12"
        md="4"
      >
        <switch-button
          v-model="lapByLapData"
          class="mt-1"
          left-value="Full session"
          right-value="Lap by lap"
        />
      </v-col>
      <v-col
        v-if="displayMode === 'charts' && !lapByLapData"
        class="d-flex justify-center align-center"
        cols="12"
        md="4"
      >
        <v-select
          v-model="chartMode"
          :items="chartModeSelectItems"
          dense
          hide-details
          item-text="text"
          item-value="value"
          label="Chart display"
          outlined
        />
      </v-col>
    </v-row>

    <full-session-chart
      v-if="displayMode === 'charts' && !lapByLapData"
      :chart-mode="chartMode"
      :round="round"
      :session="session"
    />

    <lap-telemetry-chart
      v-if="displayMode === 'charts' && lapByLapData"
      :chart-mode="chartMode"
      :round="round"
      :session="session"
    />
  </div>
</template>

<script>
import SwitchButton from "@/components/switch-button";
import FullSessionChart from "@/components/schedule/weekend/telemetry/full-session-chart";
import LapTelemetryChart from "@/components/schedule/weekend/telemetry/lap-telemetry-chart";

export default {
  name: "session-telemetry",
  components: { LapTelemetryChart, FullSessionChart, SwitchButton },
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
    displayMode: "charts",
    displayModeSelectItems: [
      { text: "Charts", value: "charts" },
      { text: "Gear Shifts Visualization", value: "gearShifts" },
      { text: "Speed Visualization", value: "speed" },
    ],
    lapByLapData: true,
    chartModeSelectItems: [
      { text: "Lap time", value: "lapTime" },
      { text: "Sector 1 time", value: "sector1" },
      { text: "Sector 2 time", value: "sector2" },
      { text: "Sector 3 time", value: "sector3" },
      { text: "Sector 1 speed trap", value: "s1SpeedTrap" },
      { text: "Sector 2 speed trap", value: "s2SpeedTrap" },
    ],
    chartMode: "lapTime",
  }),
};
</script>

<style lang="scss" scoped>
.note {
  color: gray;
  font-size: 13px;
}
</style>
