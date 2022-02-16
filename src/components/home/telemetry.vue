<template>
  <v-container class="telemetry">
    <div class="inner relative">
      <v-row>
        <v-col cols="12" sm="8">
          <p class="text-center text-sm-start">
            <b>Check out the telemetry data from the cars.</b>
            <br />
            See there speed, how much throtle they have applied and many more
            information about the cars.
          </p>
        </v-col>
      </v-row>

      <div class="car-parallax d-none d-sm-block">
        <img
          class="parallax-car"
          src="@/assets/images/alphine-top.png"
          alt="Alphine"
        />
      </div>

      <img
        src="@/assets/images/cars/alpine.png"
        class="d-block d-sm-none mobile-image mx-auto mt-10"
        alt="Alphine"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "telemetry",
};
</script>

<style lang="scss" scoped>
.telemetry {
  .inner {
    padding-bottom: 75px;
    padding-top: 75px;

    @include media-breakpoint-up(sm) {
      padding-bottom: 140px;
      padding-top: 140px;
    }

    p {
      font-size: 35px;
      line-height: 49px;
    }

    .car-parallax {
      position: absolute;
      right: 0;
      top: -100%;
      height: 200%;

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
  }
}
</style>
