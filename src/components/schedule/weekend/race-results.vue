<template>
  <loading-indicator v-if="isLoading" />

  <v-container
    v-else-if="sessionResults !== undefined && sessionResults.length > 0"
    class="session-results"
  >
    <div class="flex flex-row flex-sm-column align-center justify-start">
      <v-btn color="primary">Telemetry</v-btn>
      <v-btn class="ml-5" color="primary">Live replay</v-btn>
    </div>

    <v-tabs v-model="tabs" centered>
      <v-tab>Cards</v-tab>
      <v-tab>Chart</v-tab>
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
            <race-result-card :result="result" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item> result chart</v-tab-item>
    </v-tabs-items>
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

export default {
  name: "race-results",
  components: { RaceResultCard, LoadingIndicator },
  props: {
    round: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isLoading: false,
    sessionResults: Array[RaceResult],
    tabs: null
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
  }
};
</script>

<style scoped></style>
