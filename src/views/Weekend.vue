<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="weekend">
    <div class="text-center text-h4">Banner position</div>
    <v-card :elevation="5">
      <v-tabs v-model="tabs" centered>
        <v-tab>Free practice 1</v-tab>
        <v-tab>Free practice 2</v-tab>
        <v-tab>Free practice 3</v-tab>
        <v-tab>Qualifying</v-tab>
        <v-tab>Race</v-tab>
        <v-tab>Circuit</v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items v-model="tabs" class="mt-5">
      <v-tab-item>fp1</v-tab-item>
      <v-tab-item>fp2</v-tab-item>
      <v-tab-item>fp3</v-tab-item>
      <v-tab-item>Qualifying</v-tab-item>
      <v-tab-item>Race</v-tab-item>
      <v-tab-item>
        <circuit-infos :circuit="schedule.circuit" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getScheduledRoundInformation } from "@/services/schedule-service";
import CircuitInfos from "@/components/schedule/circuit-infos";
import LoadingIndicator from "@/components/loading-indicator";

export default {
  name: "Weekend",
  components: { LoadingIndicator, CircuitInfos },
  data: () => ({
    isLoading: false,
    round: null,
    schedule: {
      Circuit: {},
      date: "",
      raceName: "",
      round: "",
      season: "",
      time: "",
      url: "",
    },
    tabs: null,
  }),
  mounted() {
    this.isLoading = true;
    this.round = this.$route.params.round;
    getScheduledRoundInformation(this.round)
      .then((response) => {
        this.schedule = response;
      })
      .catch((e) => {
        if (e.response.status === 404) {
          this.$router.push("/404");
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.weekend {
}
</style>
