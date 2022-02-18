<template>
  <loading-indicator v-if="isLoading" />
  <v-container v-else class="constructor-details relative">
    <div class="constructor-name">
      <h2 :style="{ color: team.color.primary }">
        {{ this.team.nameExtended.shortName }}
      </h2>
      <div :style="{ color: team.color.tertiary }" class="name-second-part">
        {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
      </div>
    </div>

    <div class="content fill-width">
      <div class="fill-width d-flex justify-center">
        <constructor-details-background
          style="width: 80%; margin-left: -220px"
          :primary="team.color.primary"
          :secondary="team.color.secondary"
          :tertiary="team.color.tertiary"
        />
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-title" :style="{ color: team.color.tertiary }">
          wins
        </div>
        <div class="stat-value" :style="{ color: team.color.primary }">
          {{ team.wins }}
        </div>
      </div>

      <div class="stat-item">
        <div class="stat-title" :style="{ color: team.color.tertiary }">
          points
        </div>
        <div class="stat-value" :style="{ color: team.color.primary }">
          {{ team.points }}
        </div>
      </div>

      <div class="stat-item">
        <div class="stat-title" :style="{ color: team.color.tertiary }">
          standing
        </div>
        <div class="stat-value" :style="{ color: team.color.primary }">
          {{ team.position }}
        </div>
      </div>
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
  min-height: 93vh;

  .constructor-name {
    transform: rotate(-90deg);
    position: absolute;
    bottom: 340px;
    left: -411px;
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
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .stat-item {
      text-transform: uppercase;

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
}
</style>
