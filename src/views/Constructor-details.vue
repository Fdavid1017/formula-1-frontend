<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="constructor-details pa-0" fluid>
    <v-row class="my-0 mx-3 content-row">
      <v-col class="d-flex align-end" cols="2">
        <div class="constructor-name">
          <h2 :style="{ color: team.color.primary }">
            {{ this.team.nameExtended.shortName }}
          </h2>
          <div :style="{ color: team.color.tertiary }" class="name-second-part">
            {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
          </div>
        </div>
      </v-col>
      <v-col class="d-flex align-end justify-center pb-0" cols="8">
        <constructor-details-background
          :primary="team.color.primary"
          :secondary="team.color.secondary"
          :tertiary="team.color.tertiary"
        />
      </v-col>
      <v-col class="d-flex align-end" cols="2">
        <div class="stats">
          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              wins
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.wins }}
            </div>
          </div>

          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              points
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.points }}
            </div>
          </div>

          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              standing
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.position }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="bottom relative">
      <v-row justify="center">
        <v-col cols="7" class="pa-0 relative">
          <img
            class="car-image"
            :src="
              require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
            "
            :alt="`${team.Constructor.name} Car`"
          />
          <div class="car-reflection-wrapper">
            <img
              class="car-image-reflection"
              :src="
                require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
              "
              :alt="`${team.Constructor.name} Car reflection`"
            />
          </div>
          <div class="click-text">
            Click the car to see more indept informations
          </div>

          <div class="drivers d-flex align-end justify-space-between">
            <img
              class="driver-image"
              :src="require(`@/assets/images/drivers/${team.drivers[0]}.png`)"
              :alt="team.drivers[0]"
            />
            <img
              class="driver-image"
              :src="require(`@/assets/images/drivers/${team.drivers[1]}.png`)"
              :alt="team.drivers[1]"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { getConstructorDetails } from "@/services/constructors-service";
import LoadingIndicator from "@/components/loading-indicator";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";
import ConstructorDetailsBackground from "@/components/constructors/constructor-details-background";

export default {
  name: "Constructor-details",
  components: { LoadingIndicator, ConstructorDetailsBackground },
  data: () => ({
    isLoading: false,
    constructorId: null,
    team: {
      Constructor: {
        constructorId: "",
        name: "",
        nationality: "",
        url: "",
      },
      color: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      drivers: [],
      nameExtended: {
        fullName: "",
        shortName: "",
      },
      points: "",
      position: "",
      positionText: "",
      wins: "",
    },
  }),
  mounted: function () {
    this.isLoading = true;
    this.constructorId = this.$route.params.id;
    getConstructorDetails(this.constructorId)
      .then((response) => {
        this.team = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    getConstructorNameSecondPart,
  },
};
</script>

<style lang="scss" scoped>
.constructor-details {
  $floor-height: 115px;
  min-height: 93vh;

  .content-row {
    min-height: calc(93vh - #{$floor-height});
  }

  .constructor-name {
    transform: scale(-1);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    max-height: 70vh;

    h2,
    .name-second-part {
      font-weight: 900;
      text-transform: uppercase;
      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
    }

    h2 {
      font-size: 100px;
      line-height: 80px;
    }

    .name-second-part {
      font-size: 40px;
      line-height: 60px;
    }
  }

  .stats {
    text-align: right;

    .stat-item {
      text-transform: uppercase;
      margin-top: 50px;
      filter: drop-shadow(2px 0px 11px rgba(0, 0, 0, 0.2));

      .stat-title {
        font-size: 30px;
      }

      .stat-value {
        margin-top: -30px;
        font-weight: 900;
        font-size: 70px;
      }
    }
  }

  .bottom {
    min-height: $floor-height;
    box-shadow: 0px -3px 41px rgba(0, 0, 0, 0.19);
    background-color: white;

    .car-image {
      position: relative;
      z-index: 1;
      width: 100%;
      margin-top: -100%;
      filter: drop-shadow(2px 1px 11px rgba(0, 0, 0, 0.47));
      cursor: pointer;
      transform-origin: bottom center;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);

        & + .car-reflection-wrapper {
          transform: scale(1.1);
        }
      }
    }

    .car-reflection-wrapper {
      transform-origin: top center;
      transition: all 0.3s ease;

      .car-image-reflection {
        position: relative;
        z-index: 1;
        width: 100%;
        transform: scaleY(-1);
        margin-top: -7px;
        transition: all 0.3s ease;
        mask-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        );
      }
    }

    .click-text {
      font-weight: 300;
      font-size: 14px;
      opacity: 0.5;
      position: absolute;
      top: 20px;
    }

    .drivers {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 100%;

      .driver-image {
        width: 45%;
        cursor: pointer;
        transform-origin: bottom center;
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
