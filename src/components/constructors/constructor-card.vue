<template>
  <router-link
    :to="`constructors/${team.team.constructorId}`"
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
              :style="{ color: team.color.tertiary }"
              class="card-info-title"
            >
              Wins
            </div>
            <div
              :style="{ color: team.color.secondary }"
              class="card-info-data"
            >
              {{ team.wins }}
            </div>
          </div>

          <div class="ml-5">
            <div
              :style="{ color: team.color.tertiary }"
              class="card-info-title"
            >
              Points
            </div>
            <div
              :style="{ color: team.color.secondary }"
              class="card-info-data"
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
      :src="require(`@/assets/images/cars/${team.team.constructorId}.png`)"
      alt="Car"
      class="car-image"
    />
  </router-link>
</template>

<script>
import CardBackground from "@/components/card-background";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";
import Constructor from "@/classes/Constructor";

export default {
  name: "constructor-card",
  components: { CardBackground },
  props: {
    team: {
      type: Constructor,
      default() {
        return new Constructor();
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
      text-transform: uppercase;
      color: #4b4b4b;
      letter-spacing: 1.2px;
      text-shadow: $base-shadow;

      @media #{map-get($display-breakpoints, 'md-and-down')} {
        font-size: 25px;
      }
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

    @media #{map-get($display-breakpoints, 'md-and-down')} {
      width: 100%;
    }
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
