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

    <v-row class="mt-10">
      <v-col cols="12" md="8">
        <img
          :alt="schedule.circuit.circuitName"
          :src="circuitDetailedImage"
          class="circuit-detailed-image"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="6">
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

        <div class="d-none d-lg-block">
          <sector-time-display
            :sector-number="1"
            :sector-time="sectorTimes.sector1"
            class="my-5"
          />
          <sector-time-display
            :sector-number="2"
            :sector-time="sectorTimes.sector2"
            class="my-5"
          />
          <sector-time-display
            :sector-number="3"
            :sector-time="sectorTimes.sector3"
            class="my-5"
          />
        </div>
      </v-col>
    </v-row>

    <v-row justify="space-between" class="d-flex d-lg-none">
      <v-col cols="12" sm="4">
        <sector-time-display
          :sector-number="1"
          :sector-time="sectorTimes.sector1"
          class="my-5"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <sector-time-display
          :sector-number="2"
          :sector-time="sectorTimes.sector2"
          class="my-5"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <sector-time-display
          :sector-number="3"
          :sector-time="sectorTimes.sector3"
          class="my-5"
        />
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
import GeoMap from "@/components/schedule/weekend/geo-map";
import { getFastestSessionsInWeekend } from "@/services/session-times-services";
import SectorTime from "@/classes/SectorTime";
import SectorTimeDisplay from "@/components/schedule/weekend/sector-time-display";

export default {
  name: "circuit-infos",
  components: { SectorTimeDisplay, GeoMap },
  props: {
    schedule: {
      type: ScheduleItem,
      default() {
        return new ScheduleItem();
      },
    },
  },
  data: () => ({
    sectorTimes: {
      sector1: new SectorTime(),
      sector2: new SectorTime(),
      sector3: new SectorTime(),
    },
  }),
  mounted() {
    getFastestSessionsInWeekend(this.schedule.round).then((result) => {
      this.sectorTimes = result;
      // {
      //   "sector1": {
      //   "driver": "GIO",
      //     "time": 33.827
      // },
      //   "sector2": {
      //   "driver": "RAI",
      //     "time": 59.206
      // },
      //   "sector3": {
      //   "driver": "RIC",
      //     "time": 29.274
      // }
      // }
    });
  },
  computed: {
    circuit() {
      return this.schedule.circuit;
    },
    countryCode() {
      return getCountryCode(this.circuit.location.country);
    },
    circuitDetailedImage() {
      try {
        return require(`@/assets/images/circuit-layout-detailed/${this.schedule.circuit.circuitId}.png`);
      } catch (e) {
        return null;
      }
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

  .circuit-detailed-image {
    width: 100%;
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
