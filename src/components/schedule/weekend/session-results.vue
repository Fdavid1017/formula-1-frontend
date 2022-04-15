<template>
  <loading-indicator v-if="isLoading" />

  <v-container
    v-else-if="sessionResults !== undefined && sessionResults.length > 0"
    class="session-results"
  >
    <v-row class="justify-center">
      <v-col cols="12" sm="5" md="3" class="mt-0 mt-md-16">
        <left-side-panel
          :session-name="sessionName"
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
              <v-col cols="10" lg="10">
                <session-result-card :result="result" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <session-result-chart :results="sessionResults" class="mt-10" />
          </v-tab-item>
          <v-tab-item>
            <session-telemetry :round="round" :session="session" />
          </v-tab-item>
          <v-tab-item>
            <gear-shifts :round="round" :session="session" />
          </v-tab-item>
          <v-tab-item>
            <speed-visualization :round="round" :session="session" />
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
import SessionResultCard from "@/components/schedule/weekend/session-result-card";
import SessionResult from "@/classes/SessionResult";
import LoadingIndicator from "@/components/loading-indicator";
import { getSessionResults } from "@/services/session-results-service";
import SessionResultChart from "@/components/schedule/weekend/session-result-chart";
import SessionTelemetry from "@/components/schedule/weekend/session-telemetry";
import LeftSidePanel from "@/components/schedule/weekend/left-side-panel";
import GearShifts from "@/components/schedule/weekend/telemetry/gear-shifts";
import SpeedVisualization from "@/components/schedule/weekend/telemetry/speed-visualization";

export default {
  name: "session-results",
  components: {
    SpeedVisualization,
    GearShifts,
    LeftSidePanel,
    SessionTelemetry,
    SessionResultChart,
    LoadingIndicator,
    SessionResultCard,
  },
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
    isLoading: false,
    sessionResults: Array[SessionResult],
    tabs: 0,
  }),
  async mounted() {
    this.isLoading = true;
    await getSessionResults(this.round, this.session)
      .then((result) => {
        this.sessionResults = result;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    telemetryPath() {
      return `/schedule/${this.round}/${this.session}/telemetry`;
    },
    sessionName() {
      if (this.session === "Q") {
        return "Quali";
      }

      return this.session;
    },
  },
};
</script>

<style scoped></style>
