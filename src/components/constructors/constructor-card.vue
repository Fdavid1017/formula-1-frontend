<template>
  <router-link
    :to="`constructors/${team.Constructor.constructorId}`"
    class="constructor-card d-block relative"
  >
    <div class="inner px-4">
      <div class="card-content">
        <h2 :style="{ color: team.color.primary }">
          {{ this.team.nameExtended.shortName }}
        </h2>
        <div class="name-second-part">
          {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
        </div>

        <div class="d-flex mt-3 constructor-infos">
          <div class="">
            <div
              class="card-info-title"
              :style="{ color: team.color.tertiary }"
            >
              Wins
            </div>
            <div
              class="card-info-data"
              :style="{ color: team.color.secondary }"
            >
              {{ team.wins }}
            </div>
          </div>

          <div class="ml-5">
            <div
              class="card-info-title"
              :style="{ color: team.color.tertiary }"
            >
              Points
            </div>
            <div
              class="card-info-data"
              :style="{ color: team.color.secondary }"
            >
              {{ team.points }}
            </div>
          </div>
        </div>
      </div>

      <card-background
        :primary="team.color.primary"
        :secondary="team.color.secondary"
        :tertiary="team.color.tertiary"
        class="card-background"
      />
    </div>

    <img
      class="car-image"
      :src="
        require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
      "
      alt="Car"
    />
  </router-link>
</template>

<script>
import CardBackground from "@/components/card-background";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";

export default {
  name: "constructor-card",
  components: { CardBackground },
  props: {
    team: {
      type: Object,
      default() {
        return {
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
          points: "",
          position: "",
          positionText: "",
          wins: "",
          nameExtended: {
            shortName: "",
            fullName: "",
          },
        };
      },
    },
  },
  methods: {
    getConstructorNameSecondPart,
  },
};
</script>

<style lang="scss" scoped>
.constructor-card {
  @include card;

  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }

  .card-content {
    .name-second-part {
      font-weight: 900;
      font-size: 30px;
      line-height: 45px;
      text-transform: uppercase;
      color: #4b4b4b;
      letter-spacing: 1.2px;
      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
    }

    .constructor-infos {
      width: 0;
      overflow: hidden;
      transition: 0.3s all ease-out;

      .card-info-title {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: bold;
      }

      .card-info-data {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }

  .car-image {
    width: 85%;
    position: absolute;
    z-index: 2;
    right: -4%;
    bottom: -3px;
    filter: drop-shadow(2px 1px 11px rgba(0, 0, 0, 0.47));
    transition: 0.3s all ease-out;
  }

  .card-background {
    position: absolute;
    left: -20%;
    top: -43%;
    width: 130%;
    transform: rotate(-35deg);
  }

  &:hover {
    .car-image {
      right: 0;
    }

    .constructor-infos {
      width: 100%;
    }
  }
}
</style>
