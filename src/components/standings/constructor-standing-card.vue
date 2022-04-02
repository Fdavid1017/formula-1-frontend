<template>
  <router-link :to="`constructors/${team.team.constructorId}`">
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
        <div class="text-right text-md-left">
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

      <div class="team-logo-container d-none d-md-flex">
        <img :alt="team.team.name" :src="constructorImage" class="team-logo" />
      </div>
    </div>
  </router-link>
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
  .team-logo-container {
    height: 100%;
    top: 0;

    .team-logo {
      margin-right: 0;
      max-width: 15%;
      filter: invert(100%);
    }
  }
}

.result-podium {
  .team-logo-container {
    .team-logo {
      filter: none;
      transition: all 0.3s;
      transition-delay: 0.1s;
    }
  }

  &:hover {
    .team-logo-container {
      .team-logo {
        filter: invert(100%);
      }
    }
  }
}
</style>
