<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="weekend pb-16">
    <weekend-banner :schedule="schedule" />

    <v-card :elevation="5" class="mt-n2 rounded-t-0">
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
        <circuit-infos :schedule="schedule" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getScheduledRoundInformation } from "@/services/schedule-service";
import CircuitInfos from "@/components/schedule/weekend/circuit-infos";
import LoadingIndicator from "@/components/loading-indicator";
import ScheduleItem from "@/classes/ScheduleItem";
import WeekendBanner from "@/components/schedule/weekend/weekend-banner";

export default {
  name: "Weekend",
  components: { WeekendBanner, LoadingIndicator, CircuitInfos },
  data: () => ({
    isLoading: false,
    round: null,
    schedule: new ScheduleItem(),
    tabs: 5
  }),
  mounted() {
    this.isLoading = true;

    this.$store.commit("addBackButtonAction", () =>
      this.$router.push("/schedule")
    );
    this.$store.commit("setBackButtonState", true);

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
  }
};
</script>

<style lang="scss" scoped>
.weekend {
}
</style>
