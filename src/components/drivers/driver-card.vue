<template>
  <router-link
    :to="`/drivers/${driverInfos.driverId}`"
    class="driver-card d-block relative"
  >
    <div class="card-content fill-height px-4">
      <div class="first-name">
        {{ driverInfos.givenName }}
      </div>
      <h2 :style="{ color: constructorInfos.color.primary }" class="mt-n2">
        {{ driverInfos.familyName }}
      </h2>

      <img :alt="'driverInfos.code'" :src="driverImage" class="driver-image" />

      <div class="d-flex mt-3 driver-infos">
        <div class="">
          <div
            :style="{ color: constructorInfos.color.tertiary }"
            class="card-info-title"
          >
            Wins
          </div>
          <div
            :style="{ color: constructorInfos.color.secondary }"
            class="card-info-data"
          >
            {{ driver.wins }}
          </div>
        </div>

        <div class="ml-5">
          <div
            :style="{ color: constructorInfos.color.tertiary }"
            class="card-info-title"
          >
            Points
          </div>
          <div
            :style="{ color: constructorInfos.color.secondary }"
            class="card-info-data"
          >
            {{ driver.points }}
          </div>
        </div>
      </div>
    </div>

    <img
      :src="
        require(`@/assets/images/logos/${this.constructorInfos.team.constructorId}.svg`)
      "
      alt="Logo"
      class="constructor-logo"
    />

    <card-background
      :primary="constructorInfos.color.primary"
      :secondary="constructorInfos.color.secondary"
      :tertiary="constructorInfos.color.tertiary"
      class="card-background"
    />
  </router-link>
</template>

<script>
import CardBackground from "@/components/card-background";
import Driver from "@/classes/Driver";
import getDriverImage from "@/helpers/getDriverImage";

export default {
  name: "driver-card",
  components: { CardBackground },
  props: {
    driver: {
      type: Driver,
      default() {
        return new Driver();
      },
    },
  },
  computed: {
    constructorInfos() {
      return this.driver.team;
    },
    driverInfos() {
      return this.driver.driver;
    },
    driverImage() {
      return getDriverImage(this.driverInfos.driverId);
    },
  },
};
</script>

<style lang="scss" scoped>
.driver-card {
  @include card;
  overflow: hidden;

  @media #{map-get($display-breakpoints, 'xs-only')} {
    min-height: 365px;
  }

  .card-background {
    position: absolute;
    left: -18%;
    top: -13%;
    width: 138%;
    transform: rotate(-35deg);
    z-index: 0;
  }

  .card-content {
    z-index: 2;

    h2 {
      font-size: 40px;
    }

    .first-name {
      font-weight: 700;
      font-size: 25px;
      text-transform: uppercase;
      color: #4b4b4b;
      letter-spacing: 1.2px;
      text-shadow: $base-shadow;
    }

    .driver-image {
      position: absolute;
      height: 225px;
      bottom: 0;
      right: -14%;
      transition: 0.2s all ease-out;
      z-index: 10;

      @media #{map-get($display-breakpoints, 'md-and-down')} {
        height: 215px;
      }

      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        right: -7%;
      }

      @media #{map-get($display-breakpoints, 'xs-only')} {
        right: 50%;
        transform: translateX(50%);
      }
    }

    .driver-infos {
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

  .constructor-logo {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    filter: invert(100%);
    opacity: 0.15;
    z-index: 1;
    max-height: 90%;
    aspect-ratio: 1/1;

    @media #{map-get($display-breakpoints, 'xs-only')} {
      width: 100%;
    }
  }

  &:hover {
    .driver-image {
      height: 250px;

      @media #{map-get($display-breakpoints, 'md-and-down')} {
        height: 240px;
      }

      @media #{map-get($display-breakpoints, 'xs-only')} {
        height: 215px;
      }
    }

    .driver-infos {
      width: 100%;
    }
  }
}
</style>
