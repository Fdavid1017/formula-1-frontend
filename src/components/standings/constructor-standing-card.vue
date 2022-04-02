<template>
  <div :class="{ 'result-podium': team.position <= 3 }" class="result-card">
    <div class="corner-image-container">
      <img
        class="corner-image"
        src="@/assets/images/session-result-card-corner.svg"
      />

      <div class="position-text">
        {{ team.position }}{{ positionTextSuffix }}
      </div>
    </div>

    <div
      class="text-container d-flex flex-column flex-md-row align-center justify-space-between"
    >
      <div class="text-right text-md-left fill-width">
        <div class="driver-name">
          {{ team.nameExtended.shortName }}
        </div>
        <div class="constructor-name mt-md-n4">
          {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
        </div>
      </div>

      <div class="text-center text-md-right mt-3 mt-sm-0">
        <div class="time">{{ team.points }} pt</div>
        <div class="delta-difference mt-n1 text-center text-md-right">
          {{ team.wins }} win
        </div>
      </div>
    </div>

    <div class="driver-image-container d-none d-md-flex">
      <img :alt="team.team.name" :src="constructorImage" class="driver-image" />
    </div>
  </div>
</template>

<script>
import getNumberTextSuffux from "@/helpers/getNumberTextSuffux";
import Constructor from "@/classes/Constructor";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";

export default {
  name: "constructor-standing-card",
  props: {
    team: {
      type: Constructor,
      default() {
        return new Constructor();
      },
    },
  },
  computed: {
    positionTextSuffix() {
      return getNumberTextSuffux(this.team.position);
    },
    constructorImage() {
      return require(`@/assets/images/logos/${this.team.team.constructorId}.svg`);
    },
  },
  methods: {
    getConstructorNameSecondPart,
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/result-card";

.result-card {
  cursor: default;

  .driver-image-container {
    height: 100%;
    top: 0;

    .driver-image {
      margin-right: 0;
      max-width: 15%;
      filter: invert(100%);
    }
  }
}

.result-podium {
  .driver-image-container {
    .driver-image {
      filter: none;
      transition: all 0.3s;
      transition-delay: 0.1s;
    }
  }

  &:hover {
    .driver-image-container {
      .driver-image {
        filter: invert(100%);
      }
    }
  }
}
</style>
