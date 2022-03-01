<template>
  <v-footer class="footer" color="#303C42" padless>
    <div class="shadow"></div>
    <v-container>
      <!--Footer icons md-up-->
      <v-row class="d-none d-md-flex" justify="center">
        <v-col class="pt-0" cols="3" lg="2">
          <a
            class="footer-panel"
            href="https://www.facebook.com/Formula1"
            target="_blank"
          >
            <img
              alt="Alpha Tauri"
              src="@/assets/images/footer/alpha-tauri.png"
            />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  color="white"
                  icon="fa-brands fa-facebook-square"
                  size="4x"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col class="pt-0" cols="3" lg="2">
          <a class="footer-panel" href="https://twitter.com/f1" target="_blank">
            <img alt="Williams" src="@/assets/images/footer/williams.png" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  color="white"
                  icon="fa-brands fa-twitter-square"
                  size="4x"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col class="pt-0" cols="3" lg="2">
          <a
            class="footer-panel"
            href="https://www.instagram.com/f1/"
            target="_blank"
          >
            <img alt="Red bull" src="@/assets/images/footer/red-bull.png" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  color="white"
                  icon="fa-brands fa-instagram-square"
                  size="4x"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col class="pt-0" cols="3" lg="2">
          <a
            class="footer-panel"
            href="https://www.youtube.com/F1"
            target="_blank"
          >
            <img alt="Ferrari" src="@/assets/images/footer/ferrari.png" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  color="white"
                  icon="fa-brands fa-youtube-square"
                  size="4x"
                />
              </div>
            </div>
          </a>
        </v-col>
      </v-row>

      <!--Footer icons md-down-->
      <div
        class="d-flex align-center justify-space-between justify-sm-center d-md-none pt-4 pb-5"
      >
        <font-awesome-icon
          class="mx-1 mx-sm-4"
          color="white"
          icon="fa-brands fa-facebook-square"
          size="4x"
        />

        <font-awesome-icon
          class="mx-1 mx-sm-4"
          color="white"
          icon="fa-brands fa-twitter-square"
          size="4x"
        />

        <font-awesome-icon
          class="mx-1 mx-sm-4"
          color="white"
          icon="fa-brands fa-instagram-square"
          size="4x"
        />

        <font-awesome-icon
          class="mx-1 mx-sm-4"
          color="white"
          icon="fa-brands fa-youtube-square"
          size="4x"
        />
      </div>

      <div class="bottom">
        <img alt="Logo" src="@/assets/logo-white.svg" />
        <v-spacer />
        <div class="">
          © 2003-{{ new Date().getFullYear() }} Formula One World Championship
          Limited
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "my-footer",
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;

  .shadow {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: inset 0 10px 5px -2px rgba(0, 0, 0, 0.3) !important;
  }

  .footer-panel {
    height: 443px;
    width: 100%;
    transform: skew(-10deg);
    overflow: hidden;
    position: relative;
    display: block;
    cursor: pointer;

    img {
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%) skew(10deg);
      filter: grayscale(100%);
      transition: all 0.3s ease-out;
    }

    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.25);
      opacity: 0;
      transition: all 0.3s ease-out;

      div {
        transform: skew(10deg);
      }
    }

    &:hover {
      img {
        transform: translateX(-50%) skew(10deg) scale(1.1);
        filter: grayscale(0);
      }

      .overlay {
        opacity: 1;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 200;
    letter-spacing: 1px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
}
</style>
