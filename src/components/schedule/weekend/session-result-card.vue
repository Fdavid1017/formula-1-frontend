<template>
  <div
    :class="{
      'result-podium': result.position <= 3,
      'result-dnf': result.lapTimeBase === null,
    }"
    class="result-card"
    @click="open = !open"
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
      <div class="text-right text-md-left fill-width">
        <div class="driver-name">
          {{ result.fullName }}
        </div>
        <div class="constructor-name mt-md-n4">
          {{ result.team }}
        </div>
      </div>

      <div class="text-center text-md-right mt-3 mt-sm-0">
        <div v-if="result.lapTimeBase !== null" class="time">
          {{ result.lapTime.toStringFormatted(true) }}
        </div>
        <div
          v-if="result.lapTimeBase !== null"
          class="delta-difference mt-n4 text-center text-md-right"
        >
          <br v-if="result.position === 1" />
          <span v-else>
            +{{ result.lapTimeDelta.toStringFormatted(true) }}
          </span>
        </div>

        <div v-else class="time">DNF</div>
      </div>
    </div>

    <div class="driver-image-container d-none d-md-flex">
      <img :alt="result.driverCode" :src="driverImage" class="driver-image" />
    </div>

    <div
      v-if="result.lapTimeBase !== null"
      :class="{ 'card-body-open': open }"
      class="card-body"
    >
      <div class="pa-4 fill-width fill-height">
        <v-row>
          <v-col cols="12" sm="4">
            <div class="details-item">
              <div class="details-item-title">Sector 1</div>
              <div class="details-item-value">
                {{ result.sector1Time.toStringFormatted(true) }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="details-item">
              <div class="details-item-title">Sector 2</div>
              <div class="details-item-value">
                {{ result.sector3Time.toStringFormatted(true) }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="details-item">
              <div class="details-item-title">Sector 3</div>
              <div class="details-item-value">
                {{ result.sector2Time.toStringFormatted(true) }}
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="12" md="3" sm="6">
            <div class="details-item">
              <div class="details-item-title">Sector 1<br />speed trap</div>
              <div v-if="!result.speedI1" class="details-item-value">
                No data
              </div>
              <div v-else class="details-item-value">
                {{ result.speedI1 }}<span class="kmh">km/h</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <div class="details-item">
              <div class="details-item-title">Sector 2<br />speed trap</div>
              <div v-if="!result.speedI2" class="details-item-value">
                No data
              </div>
              <div v-else class="details-item-value">
                {{ result.speedI2 }}<span class="kmh">km/h</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <div class="details-item">
              <div class="details-item-title">Speed at finish line</div>
              <div v-if="!result.speedFl" class="details-item-value">
                No data
              </div>
              <div v-else class="details-item-value">
                {{ result.speedFl }}<span class="kmh">km/h</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <div class="details-item">
              <div class="details-item-title">Speed at longest straight</div>
              <div v-if="!result.speedSt" class="details-item-value">
                No data
              </div>
              <div v-else class="details-item-value">
                {{ result.speedSt }}<span class="kmh">km/h</span>
              </div>
            </div>
          </v-col>
        </v-row>

        <div class="mt-5">
          <div class="details-item d-flex justify-center align-center">
            <div class="details-item-title">Tire used:</div>
            <img
              v-if="compoundImage"
              :alt="result.compound.toLowerCase()"
              :src="compoundImage"
              class="tire-used-image ml-5"
            />
            <div v-else class="ml-5 details-item-value">No data</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SessionResult from "@/classes/SessionResult";
import getDriverImage from "@/helpers/getDriverImage";
import getTireCompoundImage from "@/helpers/getTireCompoundImage";
import getNumberTextSuffux from "@/helpers/getNumberTextSuffux";

export default {
  name: "session-result-card",
  props: {
    result: {
      type: SessionResult,
      default() {
        return new SessionResult();
      },
    },
  },
  data: () => ({
    open: false,
  }),
  computed: {
    positionTextSuffix() {
      return getNumberTextSuffux(this.result.position);
    },
    driverImage() {
      return getDriverImage(this.result.driverId);
    },
    compoundImage() {
      return getTireCompoundImage(this.result.compound);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/result-card";
</style>
