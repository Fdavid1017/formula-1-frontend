<template>
  <v-container class="circuit-infos">
    <div class="d-flex align-center">
      <div class="flag">
        <flag :iso="countryCode" />
      </div>
      <div class="ml-3">
        <div class="gp-name">{{ schedule.raceName }}</div>
        <div class="circuit-name mt-n2">{{ schedule.circuit.circuitName }}</div>
      </div>
    </div>

    <v-row class="mt-5">
      <v-col cols="8"> circuit kép</v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="6">
            <div class="gp-info-item">
              <div class="gp-info-item-title">First<br />Grand Prix</div>
              <div class="gp-info-item-value">
                {{ schedule.circuit.details.firstGp }}
              </div>
            </div>

            <div class="gp-info-item">
              <div class="gp-info-item-title">Circuit<br />Length</div>
              <div class="gp-info-item-value">
                {{ schedule.circuit.details.circuitLength }} km
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="gp-info-item">
              <div class="gp-info-item-title">Number Of<br />Laps</div>
              <div class="gp-info-item-value">
                {{ schedule.circuit.details.numberOfLaps.toFixed(1) }}
              </div>
            </div>

            <div class="gp-info-item">
              <div class="gp-info-item-title">Race<br />Distance</div>
              <div class="gp-info-item-value">
                {{ schedule.circuit.details.raceDistance.toFixed(1) }} km
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="mt-10">
      <geo-map :geojson-file-name="schedule.circuit.details.gjsonMap" />
    </div>
  </v-container>
</template>

<script>
import getCountryCode from "@/helpers/countryCodes";
import ScheduleItem from "@/classes/ScheduleItem";
import GeoMap from "@/components/schedule/geo-map";

export default {
  name: "circuit-infos",
  components: { GeoMap },
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
    box-shadow: $base-shadow;
  }

  .gp-name {
    font-weight: bold;
    font-size: 30px;
  }

  .circuit-name {
    font-size: 20px;
  }

  .gp-info-item {
    margin-bottom: 25px;

    .gp-info-item-title {
      font-size: 25px;
      border-left: 1px solid black;
      padding-left: 10px;
    }

    .gp-info-item-value {
      font-weight: bold;
      font-size: 30px;
      padding-left: 10px;
    }
  }
}
</style>
