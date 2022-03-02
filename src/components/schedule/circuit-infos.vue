<template>
  <v-container class="circuit-infos">
    <div class="d-flex align-center">
      <div class="flag">
        <flag :iso="countryCode" />
      </div>
      <div class="ml-3">
        <div class="">{{ countryCode }}</div>
        <div class="">circuit name</div>
      </div>
    </div>

    <v-row>
      <v-col cols="8"> circuit kép</v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="6">infos 1</v-col>
          <v-col cols="6">infos 2</v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="">full map</div>
  </v-container>
</template>

<script>
import getCountryCode from "@/helpers/countryCodes";
import ScheduleItem from "@/classes/ScheduleItem";

export default {
  name: "circuit-infos",
  props: {
    schedule: {
      type: ScheduleItem,
      default() {
        return new ScheduleItem();
      },
    },
  },
  computed: {
    circuit() {
      return this.schedule.circuit;
    },
    countryCode() {
      return getCountryCode(this.circuit.location.country);
    },
  },
};
</script>

<style lang="scss" scoped>
.circuit-infos {
  .flag {
    font-size: 50px;
    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    box-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
  }
}
</style>
