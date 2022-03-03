<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="session-results">
    <div class="flex flex-row flex-sm-column align-center justify-start">
      <v-btn color="primary">See telemetry</v-btn>
      <v-btn class="ml-5" color="primary">Live replay</v-btn>
    </div>

    <v-tabs v-model="tabs" centered>
      <v-tab>Cards</v-tab>
      <v-tab>Chart</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs" class="">
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
    </v-tabs-items>
  </v-container>
</template>

<script>
import SessionResultCard from "@/components/schedule/weekend/session-result-card";
import SessionResult from "@/classes/SessionResult";
import LoadingIndicator from "@/components/loading-indicator";
import { getSessionResults } from "@/services/session-results-service";
import SessionResultChart from "@/components/schedule/weekend/session-result-chart";

export default {
  name: "session-results",
  components: { SessionResultChart, LoadingIndicator, SessionResultCard },
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
    tabs: null,
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
};
</script>

<style scoped></style>
