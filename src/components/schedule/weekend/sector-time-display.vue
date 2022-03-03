<template>
  <div :style="{ 'border-color': sectorColor }" class="sector-time fill-width">
    <div
      class="d-flex flex-row flex-sm-column flex-md-row align-center align-sm-start align-md-center justify-space-between"
    >
      <div class="d-flex align-center">
        <div class="sector-number d-flex justify-center align-center">
          {{ sectorNumber }}
        </div>

        <div class="driver-code ml-3">
          {{ isLoading ? `Sector ${sectorNumber}` : sectorTime.driverCode }}
        </div>
      </div>

      <div v-if="!isLoading" class="session-name mr-3 mr-sm-0 mr-md-3">
        {{ sessionName }}
      </div>
    </div>

    <div class="text-center time">
      {{ isLoading ? "Loading" : sectorTime.time }}
    </div>

    <v-progress-linear v-if="isLoading" :color="sectorColor" indeterminate />
  </div>
</template>

<script>
import SectorTime from "@/classes/SectorTime";

export default {
  name: "sector-time-display",
  props: {
    sectorNumber: {
      type: Number,
      default: 0,
    },
    sectorTime: {
      type: SectorTime,
      default() {
        return new SectorTime();
      },
    },
    isLoading: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    sectorColor() {
      switch (this.sectorNumber) {
        case 1:
          return "#b41619";
        case 2:
          return "#1884a5";
        default:
          return "#ffd200";
      }
    },
    sessionName() {
      switch (this.sectorTime.sessionName) {
        case "Q":
          return "Qualifying";
        case "R":
          return "Race";
        default:
          return this.sectorTime.sessionName;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sector-time {
  background-color: $dark-blue;
  box-shadow: $base-shadow;
  color: white;
  border-left: 5px solid;
  border-radius: 8px;
  transition: all 0.3s ease-out;

  .sector-number {
    color: $dark-blue;
    font-weight: bold;
    font-family: Formula1;
    background-color: white;
    font-size: 25px;
    width: 40px;
    aspect-ratio: 1/1;
  }

  .driver-code {
    font-weight: bold;
    font-family: Formula1;
    font-size: 25px;
  }

  .time {
    font-weight: bold;
    font-size: 35px;
  }

  .session-name {
    font-size: 17px;
    text-align: right;

    @media #{map-get($display-breakpoints, 'sm-only')} {
      width: 100%;
      text-align: center;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
}
</style>
