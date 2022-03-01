<template>
  <v-container ref="telemetryPanel" class="telemetry">
    <div class="inner relative">
      <v-row>
        <v-col cols="12" md="8">
          <p class="text-center text-md-start">
            <b>Check out the telemetry data from the cars.</b>
            <br />
            See there speed, how much throtle they have applied and many more
            information about the cars.
          </p>
        </v-col>
      </v-row>

      <div
        class="car-parallax d-none d-md-block"
        :style="{ height: `${carContainerHeight}px` }"
      >
        <img
          class="parallax-car"
          src="@/assets/images/aston_martin_top.png"
          alt="Aston Martin"
          :style="{ maxHeight: `${standingsHeight * 0.75}px` }"
        />
      </div>

      <img
        src="@/assets/images/cars/aston_martin.png"
        class="d-block d-md-none mobile-image mx-auto mt-10"
        alt="Aston Martin"
      />
      <img class="telemetry-dots" src="@/assets/images/dots-pattern.svg" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "telemetry",
  props: {
    standingsHeight: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    telemetryHeight: 0,
  }),
  mounted() {
    this.setHeroTextHeight();
  },
  created() {
    window.addEventListener("resize", this.setHeroTextHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.setHeroTextHeight);
  },
  methods: {
    setHeroTextHeight() {
      this.telemetryHeight = this.$refs.telemetryPanel.clientHeight;
    },
  },
  computed: {
    carContainerHeight() {
      return this.telemetryHeight + this.standingsHeight - 20;
    },
  },
};
</script>

<style lang="scss" scoped>
.telemetry {
  .inner {
    padding-bottom: 75px;
    padding-top: 75px;

    @include media-breakpoint-up(md) {
      padding-bottom: 140px;
      padding-top: 140px;
    }

    p {
      font-size: 35px;
      line-height: 49px;
    }

    .car-parallax {
      position: absolute;
      right: 5%;
      bottom: 0;
      z-index: 1;

      .parallax-car {
        position: sticky;
        right: 0;
        top: 100px;
        height: 500px;
      }
    }

    .mobile-image {
      width: 85%;
    }

    .telemetry-dots {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
