<template>
  <v-footer class="footer" padless color="#303C42">
    <div class="shadow"></div>
    <v-container>
      <!--Footer icons md-up-->
      <v-row justify="center" class="d-none d-md-flex">
        <v-col cols="3" lg="2" class="pt-0">
          <a
            href="https://www.facebook.com/Formula1"
            target="_blank"
            class="footer-panel"
          >
            <img
              src="@/assets/images/footer/alpha-tauri.png"
              alt="Alpha Tauri"
            />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  icon="fa-brands fa-facebook-square"
                  size="4x"
                  color="white"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col cols="3" lg="2" class="pt-0">
          <a href="https://twitter.com/f1" target="_blank" class="footer-panel">
            <img src="@/assets/images/footer/williams.png" alt="Williams" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  icon="fa-brands fa-twitter-square"
                  size="4x"
                  color="white"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col cols="3" lg="2" class="pt-0">
          <a
            href="https://www.instagram.com/f1/"
            target="_blank"
            class="footer-panel"
          >
            <img src="@/assets/images/footer/red-bull.png" alt="Red bull" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  icon="fa-brands fa-instagram-square"
                  size="4x"
                  color="white"
                />
              </div>
            </div>
          </a>
        </v-col>

        <v-col cols="3" lg="2" class="pt-0">
          <a
            href="https://www.youtube.com/F1"
            target="_blank"
            class="footer-panel"
          >
            <img src="@/assets/images/footer/ferrari.png" alt="Ferrari" />
            <div class="overlay d-flex justify-center align-center">
              <div>
                <font-awesome-icon
                  icon="fa-brands fa-youtube-square"
                  size="4x"
                  color="white"
                />
              </div>
            </div>
          </a>
        </v-col>
      </v-row>

      <!--Footer icons md-down-->
      <div class="d-flex align-center justify-center d-md-none">
        <font-awesome-icon
          icon="fa-brands fa-facebook-square"
          size="4x"
          color="white"
          class="mx-1 mx-sm-4"
        />

        <font-awesome-icon
          icon="fa-brands fa-twitter-square"
          size="4x"
          color="white"
          class="mx-1 mx-sm-4"
        />

        <font-awesome-icon
          icon="fa-brands fa-instagram-square"
          size="4x"
          color="white"
          class="mx-1 mx-sm-4"
        />

        <font-awesome-icon
          icon="fa-brands fa-youtube-square"
          size="4x"
          color="white"
          class="mx-1 mx-sm-4"
        />
      </div>

      <div class="bottom">
        <img src="@/assets/logo-white.svg" alt="Logo" />
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
      transition: all 0.3s ease;
    }

    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.25);
      opacity: 0;
      transition: all 0.3s ease;

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
