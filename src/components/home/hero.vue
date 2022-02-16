<template>
  <div class="hero">
    <v-container class="fill-height d-flex align-center">
      <v-row>
        <v-col cols="12" md="9">
          <div class="text text-center text-md-start">
            get informations about the
            <span class="primary--text">fastest</span> sport on the world.
            <br />
            <br />
            ANYWHERE. ANYTIME.
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="background">
      <v-row class="fill-height pa-0 ma-0">
        <v-col class="pa-0 ma-0" cols="12" md="9">
          <div class="gradient">
            <div />
            <div />
          </div>
        </v-col>
      </v-row>
      <img src="@/assets/images/hero-mercedes.png" />
    </div>

    <img class="hero-dots" src="@/assets/images/dots-pattern.svg" />
  </div>
</template>

<script>
export default {
  name: "hero",
};
</script>

<style lang="scss" scoped>
.hero {
  height: 250px;
  position: relative;
  overflow-x: clip;

  @include media-breakpoint-up(sm) {
    height: 350px;
  }

  @include media-breakpoint-up(md) {
    height: 550px;
  }

  .text {
    text-transform: uppercase;
    color: black;
    font-weight: 900;
    position: relative;
    z-index: 1;
    font-size: 25px;
    line-height: 38px;

    @include media-breakpoint-up(sm) {
      font-size: 40px;
      line-height: 49px;
    }

    @include media-breakpoint-up(md) {
      font-size: 60px;
    }
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    .gradient {
      position: relative;
      height: 100%;
      width: 100%;
      z-index: 1;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: column;

      @include media-breakpoint-up(md) {
        flex-direction: row;
      }

      div:nth-child(1) {
        background: white;
        width: 100%;
        height: 150%;

        @include media-breakpoint-up(md) {
          width: 80%;
          height: 100%;
        }
      }

      div:nth-child(2) {
        background: white;
        height: 100%;

        width: 100%;
        background: linear-gradient(
          180deg,
          #ffffff 0%,
          rgba(255, 255, 255, 0) 100%,
          rgba(255, 255, 255, 0) 100%
        );
        margin-top: -1px;

        @include media-breakpoint-up(md) {
          margin-left: -1px;
          margin-top: unset;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0) 100%,
            rgba(255, 255, 255, 0) 100%
          );
          width: 20%;
        }
      }
    }

    img {
      position: absolute;
      width: 100%;
      right: 0;
      top: 55%;
      object-fit: cover;

      @include media-breakpoint-up(md) {
        height: calc(100% - 1px);
        right: -55px;
        top: 0;
      }
    }
  }

  .hero-dots {
    position: absolute;
    left: 0;
    bottom: -50%;
    max-width: 50%;
    pointer-events: none;
  }
}
</style>
