<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="session-results">
    <v-btn color="primary">See telemetry</v-btn>
    <v-btn class="ml-5" color="primary">Live replay</v-btn>

    <div class="mt-16">
      <v-row justify="center">
        <v-col cols="8">
          <session-result-card />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import SessionResultCard from "@/components/schedule/weekend/session-result-card";
import SessionResult from "@/classes/SessionResult";
import { getSessionResults } from "@/services/session-results-service";
import LoadingIndicator from "@/components/loading-indicator";

export default {
  name: "session-results",
  components: { LoadingIndicator, SessionResultCard },
  data: () => ({
    isLoading: false,
    sessionResults: Array[SessionResult],
  }),
  async mounted() {
    this.isLoading = true;
    await getSessionResults("Bahrain", "FP1")
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
