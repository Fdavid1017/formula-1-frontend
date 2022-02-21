<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="constructor-details pa-0 overflow-hidden" fluid>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <font-awesome-icon
          class="back-btn"
          icon="fa-solid fa-chevron-left"
          size="2x"
          v-bind="attrs"
          v-on="on"
          @click="backClick"
        />
      </template>
      <span>Back</span>
    </v-tooltip>

    <v-row
      class="my-0 mx-3 content-row"
      :class="{ 'flex-nowrap': carDetails.show }"
    >
      <v-col
        class="d-flex align-end constructor-name-col"
        cols="12"
        md="2"
        order="first"
        :class="{
          'constructor-name-col-hidden': carDetails.show,
          'inner-div-overflow-hide': carDetails.show,
        }"
      >
        <div class="constructor-name">
          <h2 :style="{ color: team.color.primary }">
            {{ this.team.nameExtended.shortName }}
          </h2>
          <div :style="{ color: team.color.tertiary }" class="name-second-part">
            {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
          </div>
        </div>
      </v-col>
      <v-col
        class="d-flex align-end justify-center pb-0 background-container col-transition"
        cols="12"
        md="8"
        order="last"
        order-md="first"
        :class="{ 'background-container-full': carDetails.show }"
      >
        <constructor-details-background
          :primary="team.color.primary"
          :secondary="team.color.secondary"
          :tertiary="team.color.tertiary"
          class="constructor-details-background"
        />
      </v-col>
      <v-col
        class="d-flex align-end justify-end col-transition"
        cols="12"
        md="2"
        :class="{ 'inner-div-overflow-hide': carDetails.show }"
      >
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
        <v-col
          class="pa-0 relative col-transition"
          cols="10"
          md="7"
          :class="{ 'bottom-container-full': carDetails.show }"
        >
          <div v-if="carDetails.show">
            <div
              style="top: -23.8%; left: 18.8%"
              class="hotspot"
              :style="`--hotspot-color: ${team.color.secondary}`"
            />
          </div>
          <img
            :alt="`${team.Constructor.name} Car`"
            :src="
              require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
            "
            class="car-image"
            @click="carDetails.show = true"
          />
          <div class="car-reflection-wrapper">
            <img
              :alt="`${team.Constructor.name} Car reflection`"
              :src="
                require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
              "
              class="car-image-reflection"
            />
          </div>
          <div class="click-text">
            Click the car to see more indept informations
          </div>

          <div
            class="drivers d-flex align-end justify-space-between"
            v-if="!carDetails.show"
          >
            <router-link :to="`/drivers/${team.drivers[0].id}`">
              <img
                :alt="team.drivers[0]"
                :src="
                  require(`@/assets/images/drivers/${team.drivers[0].id}.png`)
                "
                class="driver-image"
              />
            </router-link>
            <router-link :to="`/drivers/${team.drivers[1].id}`">
              <img
                :alt="team.drivers[1]"
                :src="
                  require(`@/assets/images/drivers/${team.drivers[1].id}.png`)
                "
                class="driver-image"
              />
            </router-link>
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
      drivers: [
        { code: "", id: "" },
        { code: "", id: "" },
      ],
      nameExtended: {
        fullName: "",
        shortName: "",
      },
      points: "",
      position: "",
      positionText: "",
      wins: "",
    },
    carDetails: {
      show: false,
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
    backClick() {
      if (this.carDetails.show) {
        this.carDetails.show = false;
        return;
      }
      this.$router.push("/constructors");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

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
    position: relative;
    z-index: 10;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      transform: unset;
      writing-mode: unset;
      text-orientation: unset;
    }

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

  .driver-codes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 25px;
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    font-size: 60px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .stats {
    text-align: right;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      display: flex;
      width: 100%;
      text-align: left;
      align-items: start;
      justify-content: space-between;
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      display: block;
      width: 100%;
      text-align: left;
    }

    .stat-item {
      text-transform: uppercase;
      margin-top: 50px;
      filter: drop-shadow(2px 0px 11px rgba(0, 0, 0, 0.2));

      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        margin-top: 0;
      }

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

  .background-container {
    transition: all 0.3s;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      margin-top: -10%;
    }
  }

  .bottom {
    min-height: $floor-height;
    box-shadow: 0px -3px 41px rgba(0, 0, 0, 0.19);
    background-color: white;

    .car-image {
      position: relative;
      z-index: 15;
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
        pointer-events: none;
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
        width: 100%;
        cursor: pointer;
        transform-origin: bottom center;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .constructor-details-background {
    width: 100%;
  }

  .background-container-full {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;

    .constructor-details-background {
      margin-top: -250px;
    }
  }

  .bottom-container-full {
    width: 90% !important;
    max-width: 90% !important;
    flex: 0 0 90% !important;

    .car-image {
      &:hover {
        cursor: default;
        transform: unset;

        & + .car-reflection-wrapper {
          transform: unset;
        }
      }
    }
  }

  .constructor-name-col {
    transition: all 0.3s;
  }

  .constructor-name-col-hidden {
    margin-left: -16.6666666667%;
  }

  .inner-div-overflow-hide {
    div {
      width: 100%;
      overflow: hidden;
    }
  }

  .back-btn {
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 15;
    cursor: pointer;
  }

  .hotspot {
    $hotspot-size: 17px;
    position: absolute;
    z-index: 20;
    width: $hotspot-size;
    height: $hotspot-size;
    background-color: white;
    border-radius: 50%;
    border: 4px solid var(--hotspot-color);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
