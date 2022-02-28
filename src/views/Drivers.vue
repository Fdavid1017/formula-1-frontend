<template>
  <v-container class="my-15">
    <v-row
      v-for="(driverGroups, index) in groupedDrivers"
      :key="index"
      justify="center"
    >
      <v-col
        v-for="driver in driverGroups"
        :key="driver['Driver']['driverId']"
        class="pa-5"
        cols="10"
        lg="4"
        md="6"
      >
        <driver-card :driver="driver" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDrivers } from "@/services/drivers-service";
import DriverCard from "@/components/drivers/driver-card";

export default {
  name: "Drivers",
  components: { DriverCard },
  data: () => ({
    drivers: [],
  }),
  mounted() {
    getDrivers().then((response) => {
      this.drivers = response;
    });
  },
  computed: {
    groupedDrivers() {
      return this.drivers.reduce(function (r, a) {
        r[a.Constructors.Constructor.constructorId] =
          r[a.Constructors.Constructor.constructorId] || [];
        r[a.Constructors.Constructor.constructorId].push(a);
        return r;
      }, Object.create(null));
    },
  },
};
</script>

<style scoped></style>
