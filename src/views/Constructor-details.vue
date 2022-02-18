<template>
  <loading-indicator v-if="isLoading" />

  <div v-else class="constructor-details">
    <div class="constructor-name">
      <h2 :style="{ color: team.color.primary }">
        {{ this.team.nameExtended.shortName }}
      </h2>
      <div :style="{ color: team.color.tertiary }" class="name-second-part">
        {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
      </div>
    </div>
    <v-container class="relative content">
      <div class="fill-width d-flex flex-column justify-center align-center">
        <constructor-details-background
          :primary="team.color.primary"
          :secondary="team.color.secondary"
          :tertiary="team.color.tertiary"
          style="width: 80%;"
        />

        <div class="car-container d-flex justify-center">
          <img
            alt="Car"
            class="car"
            src="@/assets/images/cars/mercedes.png"
          />
        </div>
      </div>
    </v-container>

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
  </div>
</template>

<script>
import { getConstructorDetails } from "@/services/constructors-service";
import LoadingIndicator from "@/components/loading-indicator";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";
import ConstructorDetailsBackground from "@/components/constructors/constructor-details-background";

export default {
  name: "Constructor-details",
  components: { ConstructorDetailsBackground, LoadingIndicator },
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
  $side-offset: 20px;

  min-height: 93vh;

  .constructor-name {
    transform: rotate(-90deg);
    position: absolute;
    bottom: 0;
    left: $side-offset;
    transform-origin: top left;
    z-index: 5;
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

  .stats {
    width: fit-content;
    position: absolute;
    z-index: 5;
    right: $side-offset;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .stat-item {
      text-transform: uppercase;
      filter: drop-shadow(2px 0px 11px rgba(0, 0, 0, 0.2));

      .stat-title {
        font-size: 30px;
        line-height: 45px;
      }

      .stat-value {
        margin-top: -30px;
        font-weight: 900;
        font-size: 90px;
        line-height: 150px;
      }
    }
  }

  .content{
    margin-left: -10%;
  }

  .car-container {
    width: 100vw;
    background: #ffffff;
    box-shadow: 0px -3px 41px rgb(0 0 0 / 19%);
    min-height: 115px;
  }
}
</style>
