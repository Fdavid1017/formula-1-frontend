<template>
  <v-container class="py-16">
    <loading-indicator v-if="isLoading" />
    <v-row v-else justify="center">
      <v-col
        v-for="item in schedule"
        :key="item.raceName"
        cols="12"
        lg="4"
        sm="6"
      >
        <schedule-card :weekend="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoadingIndicator from "@/components/loading-indicator";
import { getCurrentSchedule } from "@/services/schedule-service";
import ScheduleCard from "@/components/schedule/schedule-card";
import ScheduleItem from "@/classes/ScheduleItem";

export default {
  name: "Schedule",
  components: { ScheduleCard, LoadingIndicator },
  data: () => ({
    isLoading: false,
    schedule: Array[ScheduleItem],
  }),
  mounted() {
    this.isLoading = true;
    getCurrentSchedule()
      .then((response) => {
        this.schedule = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
