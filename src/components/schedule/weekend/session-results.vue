<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="session-results">
    <div class="flex flex-row flex-sm-column align-center justify-start">
      <v-btn color="primary">See telemetry</v-btn>
      <v-btn class="ml-5" color="primary">Live replay</v-btn>
    </div>

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
  </v-container>
</template>

<script>
import SessionResultCard from "@/components/schedule/weekend/session-result-card";
import SessionResult from "@/classes/SessionResult";
import LoadingIndicator from "@/components/loading-indicator";
import { getSessionResults } from "@/services/session-results-service";

export default {
  name: "session-results",
  components: { LoadingIndicator, SessionResultCard },
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
