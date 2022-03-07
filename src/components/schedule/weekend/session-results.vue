<template>
  <loading-indicator v-if="isLoading" />

  <v-container
    v-else-if="sessionResults !== undefined && sessionResults.length > 0"
    class="session-results"
  >
    <div class="flex flex-row flex-sm-column align-center justify-start">
      <v-btn class="ml-5" color="primary">Live replay</v-btn>
    </div>

    <v-tabs v-model="tabs" centered fixed-tabs>
      <v-tab>Result</v-tab>
      <v-tab>Chart</v-tab>
      <v-tab>Telemetry</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs" class="py-5">
      <v-tab-item>
        <v-row
          v-for="result in sessionResults"
          :key="result.Driver"
          class="mt-16"
          justify="center"
        >
          <v-col cols="10" lg="8">
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
    </v-tabs-items>
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

export default {
  name: "session-results",
  components: {
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
    tabs: 2,
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
  },
};
</script>

<style scoped></style>
