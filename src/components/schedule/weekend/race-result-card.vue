<template>
  <div
    :class="{
      'result-podium': result.position <= 3,
      'result-dnf': isDnf(result.status),
      'fastest-lap': result.fastestLap.rank === 1,
    }"
    class="result-card"
    @click="openTab"
  >
    <div class="corner-image-container">
      <img
        class="corner-image"
        src="@/assets/images/session-result-card-corner.svg"
      />

      <div class="position-text">
        {{ result.position }}{{ positionTextSuffix }}
      </div>
    </div>

    <div
      class="text-container d-flex flex-column flex-md-row align-center justify-space-between"
    >
      <div class="text-right text-md-left">
        <div class="driver-name">
          {{ result.driver.fullName() }}
        </div>
        <div class="constructor-name mt-md-n4">
          {{ result.driver.team.team.name }}
        </div>
      </div>

      <div class="d-flex align-center text-center text-md-right mt-3 mt-sm-0">
        <font-awesome-icon
          v-if="positionFromStart > 0"
          icon="fa-solid fa-sort-up"
          size="2xl"
        />
        <font-awesome-icon
          v-else-if="positionFromStart < 0"
          icon="fa-solid fa-sort-down"
          size="2xl"
        />
        <font-awesome-icon v-else icon="fa-solid fa-minus" size="2xl" />
        <div class="time ml-2">{{ Math.abs(positionFromStart) }}</div>
      </div>
    </div>

    <div class="driver-image-container d-none d-md-flex">
      <img
        :alt="result.driver.driver.code"
        :src="driverImage"
        class="driver-image"
      />
    </div>

    <v-expansion-panels
      v-model="open"
      accordion
      class="elevation-0 rounded-0 card-body"
      color="transparent"
    >
      <v-expansion-panel style="background-color: transparent">
        <v-expansion-panel-content class="pt-4" color="transparent">
          <div v-if="result.fastestLap">
            <div class="font-weight-bold text-center" style="font-size: 28px">
              Fastest lap
            </div>

            <v-row>
              <v-col cols="12" md="4">
                <div class="details-item">
                  <div class="details-item-title">Average speed</div>
                  <div class="details-item-value">
                    {{ result.fastestLap.averageSpeed }}
                    <span class="kmh">km/h</span>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="details-item">
                  <div class="details-item-title">Time</div>
                  <div class="details-item-value">
                    {{ result.fastestLap.time.toStringFormatted(true) }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="details-item">
                  <div class="details-item-title">Rank</div>
                  <div class="details-item-value">
                    {{ result.fastestLap.rank }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <v-row class="mt-5">
            <v-col cols="12" md="3" sm="6">
              <div class="details-item">
                <div class="details-item-title">Grid position</div>
                <div class="details-item-value">
                  {{ result.grid }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <div class="details-item">
                <div class="details-item-title">Laps</div>
                <div class="details-item-value">
                  {{ result.laps }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <div class="details-item">
                <div class="details-item-title">Points</div>
                <div class="details-item-value">+ {{ result.points }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <div class="details-item">
                <div class="details-item-title">Status</div>
                <div class="details-item-value">{{ result.status }}</div>
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import RaceResult from "@/classes/RaceResult";
import getDriverImage from "@/helpers/getDriverImage";
import getNumberTextSuffux from "@/helpers/getNumberTextSuffux";
import isDnf from "@/helpers/isDnf";

export default {
  name: "race-result-card",
  props: {
    result: {
      type: RaceResult,
      default() {
        return new RaceResult();
      }
    }
  },
  data: () => ({
    open: null
  }),
  methods: {
    isDnf,
    openTab() {
      this.open = this.open === null ? 0 : null;
    }
  },
  computed: {
    positionTextSuffix() {
      return getNumberTextSuffux(this.result.position);
    },
    driverImage() {
      return getDriverImage(this.result.driver.driver.driverId);
    },
    positionFromStart() {
      const gain = this.result.grid - this.result.position;
      return gain;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/result-card";
</style>
