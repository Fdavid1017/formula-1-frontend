<template>
  <div class="pb-16">
    <v-row
      justify="center"
      v-for="item in standings"
      :key="item.driver.driverId"
      class="mt-16"
    >
      <v-col cols="12" md="10">
        <driver-standing-card :driver="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getDrivers } from "@/services/drivers-service";
import Driver from "@/classes/Driver";
import DriverStandingCard from "@/components/standings/driver-standing-card";

export default {
  name: "driver-standings",
  components: { DriverStandingCard },
  data: () => ({
    isLOading: false,
    standings: Array[Driver],
  }),
  mounted() {
    this.isLoading = true;
    getDrivers()
      .then((response) => {
        this.standings = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
