<template>
  <v-container class="py-16">
    <loading-indicator v-if="isLoading" />

    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchText"
            class="mb-5"
            clearable
            color="primary"
            dense
            hide-details
            label="Search"
            outlined
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          v-for="item in filteredSchedule"
          :key="item.raceName"
          cols="12"
          lg="4"
          sm="6"
        >
          <schedule-card :weekend="item" />
        </v-col>
      </v-row>
    </div>
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
    searchText: "",
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
  computed: {
    filteredSchedule() {
      if (!this.searchText || this.searchText === "") {
        return this.schedule;
      }

      const queryText = this.searchText.toLowerCase();
      return this.schedule.filter((item) => {
        return (
          item.circuit.location.country.toLowerCase().indexOf(queryText) > -1 ||
          item.circuit.circuitName.toLowerCase().indexOf(queryText) > -1 ||
          item.raceName.toLowerCase().indexOf(queryText) > -1 ||
          item.round === parseInt(queryText)
        );
      });
    },
  },
};
</script>

<style scoped></style>
