<template>
  <loading-indicator v-if="isLoading" />

  <v-container
    v-else-if="sessionResults !== undefined && sessionResults.length > 0"
    class="session-results"
  >
    <v-row class="justify-center">
      <v-col cols="12" sm="5" md="3" class="mt-0 mt-md-16">
        <left-side-panel
          session-name="Race"
          :active-item="tabs"
          :options="[
            'Result',
            'Chart',
            'Telemetry Chats',
            'Gearshifts',
            'Speed',
          ]"
          @itemSelect="tabs = arguments[0]"
        />
      </v-col>

      <v-col cols="12" md="9">
        <v-tabs-items v-model="tabs" class="py-5">
          <v-tab-item>
            <v-row
              v-for="result in sessionResults"
              :key="result.Driver"
              class="mt-16"
              justify="center"
            >
              <v-col cols="10" lg="8">
                <race-result-card :result="result" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <race-results-chart :results="sessionResults" />
          </v-tab-item>
          <v-tab-item>
            <session-telemetry session="R" :round="round.toString()" />
          </v-tab-item>
          <v-tab-item>
            <gear-shifts session="R" :round="round" />
          </v-tab-item>
          <v-tab-item>
            <speed-visualization session="R" :round="round" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <h2 class="text-center">No data found for this session</h2>
  </v-container>
</template>

<script>
import { getRaceResult } from "@/services/session-results-service";
import LoadingIndicator from "@/components/loading-indicator";
import RaceResult from "@/classes/RaceResult";
import RaceResultCard from "@/components/schedule/weekend/race-result-card";
import RaceResultsChart from "@/components/schedule/weekend/race-results-chart";
import SessionTelemetry from "@/components/schedule/weekend/session-telemetry";
import GearShifts from "@/components/schedule/weekend/telemetry/gear-shifts";
import SpeedVisualization from "@/components/schedule/weekend/telemetry/speed-visualization";
import LeftSidePanel from "@/components/schedule/weekend/left-side-panel";

export default {
  name: "race-results",
  components: {
    LeftSidePanel,
    SpeedVisualization,
    GearShifts,
    SessionTelemetry,
    RaceResultsChart,
    RaceResultCard,
    LoadingIndicator,
  },
  props: {
    round: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    isLoading: false,
    sessionResults: Array[RaceResult],
    tabs: 0,
  }),
  async mounted() {
    this.isLoading = true;
    await getRaceResult(this.round)
      .then((result) => {
        this.sessionResults = result;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    telemetryPath() {
      return `/schedule/${this.round}/R/telemetry`;
    },
  },
};
</script>

<style scoped></style>
