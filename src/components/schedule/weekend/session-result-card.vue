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
      const j = this.result.position % 10;
      const k = this.result.position % 100;
      if (j === 1 && k !== 11) {
        return "st";
      }
      if (j === 2 && k !== 12) {
        return "nd";
      }
      if (j === 3 && k !== 13) {
        return "rd";
      }
      return "th";
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
.result-card {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  min-height: 150px;
  box-shadow: $base-shadow;
  transition: all 0.3s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);

    .corner-image-container {
      left: -30px;
    }

    .driver-image-container {
      height: 250px;
      top: -100px;
    }
  }

  .corner-image-container {
    position: absolute;
    top: -20px;
    left: -20px;
    transition: all 0.3s ease-out;
    transition-delay: 0.1s;

    .position-text {
      color: white;
      font-weight: bold;
      font-size: 40px;
      position: absolute;
      top: 12px;
      left: 15px;
    }
  }

  .text-container {
    height: 100%;
    padding: 0 20% 0 10%;
    min-height: 150px;
    color: $dark-blue;

    @media #{map-get($display-breakpoints, 'md-and-down')} {
      padding: 0 15% 0 115px;
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      padding: 0 20px 0 115px;
    }

    .driver-name {
      font-weight: bold;
      font-size: 38px;

      @media #{map-get($display-breakpoints, 'md-only')} {
        font-size: 32px;
      }

      @media #{map-get($display-breakpoints, 'xs-only')} {
        direction: rtl;
        font-size: 25px;
      }
    }

    .delta-difference,
    .constructor-name {
      font-size: 25px;

      @media #{map-get($display-breakpoints, 'xs-only')} {
        direction: rtl;
        font-size: 20px;
      }

      @media #{map-get($display-breakpoints, 'md-only')} {
        font-size: 22px;
      }
    }

    .time {
      font-size: 40px;
      font-weight: bold;

      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        margin-left: -115px;
      }
    }

    .delta-difference {
      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        margin-left: -115px;
      }
    }
  }

  .driver-image-container {
    height: 200px;
    width: 100%;
    position: absolute;
    top: -50px;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: end;
    overflow-x: hidden;
    border-radius: 10px 0 0 10px;
    pointer-events: none;
    transition: all 0.3s ease-out;
    transition-delay: 0.1s;
    transform-origin: top center;

    .driver-image {
      height: 100%;
      margin-right: -50px;
    }
  }

  .card-body-open {
    height: 355px !important;
  }

  .card-body {
    border-top: 2px solid $dark-blue;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;

    .details-item {
      color: $dark-blue;

      .details-item-title {
        font-weight: bold;
        font-size: 22px;
        border-bottom: 1px solid $dark-blue;
        margin-bottom: 5px;
      }

      .details-item-value {
        font-size: 18px;

        .kmh {
          font-size: 15px;
        }
      }

      .tire-used-image {
        width: 75px;
      }
    }
  }
}

.result-podium {
  background-color: $f1-red !important;

  .text-container {
    color: white !important;
  }

  .card-body {
    border-top-color: white !important;

    .details-item {
      color: white;

      .details-item-title {
        border-bottom-color: white !important;
      }
    }
  }
}
</style>
