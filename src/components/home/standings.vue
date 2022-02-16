<template>
  <div class="standings">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6">
          <p class="text-center text-md-start">
            Be up to date about the current drivers and constructors
            championship standings.
          </p>

          <div class="d-flex align-start justify-center justify-md-start">
            <router-link to="/" class="standings-button">
              Current standings
            </router-link>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div id="container">
            <div id="car-img-wrapper" class="layer" data-speed="1">
              <img
                id="car-img"
                class=""
                src="@/assets/images/cars/ferrari.png"
                alt="Car"
              />
              <div id="car-shadow" class=""></div>
            </div>
            <div id="circle-wrapper-inner">
              <div id="circle-inner" class="layer" data-speed="1.75"></div>
            </div>
            <div id="circle-wrapper-outer">
              <div id="circle-outer" class="layer" data-speed="2"></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "standings",
  mounted() {
    document.addEventListener("mousemove", parallax);

    function parallax(e) {
      this.querySelectorAll(".layer").forEach((layer) => {
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.standings {
  background-color: $dark-blue;
  padding-top: 175px;
  padding-bottom: 275px;
  position: relative;
  z-index: 1;

  @include media-breakpoint-up(md) {
    padding-bottom: 50px;
    padding-top: 50px;
  }

  @include media-breakpoint-up(lg) {
    padding-bottom: 175px;
    padding-top: 175px;
  }

  p {
    font-weight: 600;
    font-size: 35px;
    line-height: 49px;
    color: white;
  }

  .standings-button {
    @include button;
  }
}

#container {
  width: 85%;
  position: relative;
  margin-top: 35%;
  margin-left: auto;
  margin-right: auto;

  @include media-breakpoint-up(md) {
    width: 100%;
    margin-top: unset;
    margin-left: unset;
    margin-right: unset;
  }
}

#circle-wrapper-inner,
#circle-wrapper-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#car-img-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 3;
}

#car-shadow {
  position: absolute;
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0.35);
  filter: blur(15px);
  bottom: 0;
  left: 0;
}

#car-img-wrapper img {
  width: 100%;
}

#circle-inner,
#circle-outer {
  border-radius: 50%;
}

#circle-outer {
  background-color: darken($f1-red, 10%);
}

#circle-inner {
  background-color: $f1-red;
}

#circle-inner::after,
#circle-outer::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

#circle-wrapper-inner {
  width: 55%;
  height: auto;
  z-index: 2;
}

#circle-inner {
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
}

#circle-wrapper-outer {
  width: 75%;
  height: auto;
  z-index: 1;
}

#circle-outer {
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
}

#title {
  margin: -0.85em 0 0;
  padding: 0 0 0 25%;
  width: 100%;
  font-size: 12em;
  color: #d5d5d5;
  white-space: nowrap;
}

#title::selection {
  background: var(--selection);
}
</style>
