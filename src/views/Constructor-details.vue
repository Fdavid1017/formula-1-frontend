<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="constructor-details pa-0" fluid>
    <v-row class="my-0 mx-3 content-row">
      <v-col class="d-flex align-end" cols="2">
        <div class="constructor-name">
          <div :style="{ color: team.color.tertiary }" class="name-second-part">
            {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
          </div>
          <h2 :style="{ color: team.color.primary }">
            {{ this.team.nameExtended.shortName }}
          </h2>
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
        <v-col cols="7" class="pa-0">
          <img
            class="car-image"
            src="@/assets/images/cars/mercedes.png"
            alt="Car"
          />
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
    writing-mode: vertical-lr;
    text-orientation: mixed;

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
      width: 100%;
      margin-top: -100%;
      filter: drop-shadow(2px 1px 11px rgba(0, 0, 0, 0.47));
    }
  }
}
</style>
