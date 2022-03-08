<template>
  <div :class="{ 'result-podium': driver.position <= 3 }" class="result-card">
    <div class="corner-image-container">
      <img
        class="corner-image"
        src="@/assets/images/session-result-card-corner.svg"
      />

      <div class="position-text">
        {{ driver.position }}{{ positionTextSuffix }}
      </div>
    </div>

    <div
      class="text-container d-flex flex-column flex-md-row align-center justify-space-between"
    >
      <div class="text-right text-md-left fill-width">
        <div class="driver-name">
          {{ driver.fullName() }}
        </div>
        <div class="constructor-name mt-md-n4">
          {{ driver.team.team.name }}
        </div>
      </div>

      <div class="text-center text-md-right mt-3 mt-sm-0">
        <div class="time">{{ driver.points }} pt</div>
        <div class="delta-difference mt-n1 text-center text-md-right">
          {{ driver.wins }} win
        </div>
      </div>
    </div>

    <div class="driver-image-container d-none d-md-flex">
      <img :alt="driver.driver.code" :src="driverImage" class="driver-image" />
    </div>
  </div>
</template>

<script>
import Driver from "@/classes/Driver";
import getNumberTextSuffux from "@/helpers/getNumberTextSuffux";
import getDriverImage from "@/helpers/getDriverImage";

export default {
  name: "driver-standing-card",
  props: {
    driver: {
      type: Driver,
      default() {
        return new Driver();
      },
    },
  },
  computed: {
    positionTextSuffix() {
      return getNumberTextSuffux(this.driver.position);
    },
    driverImage() {
      return getDriverImage(this.driver.driver.driverId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/result-card";

.result-card {
  cursor: default;
}
</style>
