<template>
  <loading-indicator v-if="isLoading" />
  <v-container
    v-else
    class="pa-0 overflow-hidden driver-details-container fill-height pb-0"
    fluid
  >
    <v-container class="inside fill-height pb-0">
      <v-row class="fill-height fill-width main-row">
        <v-col class="pb-0 pt-lg-16" cols="12" md="6">
          <v-row class="pt-lg-10" justify="end">
            <v-col
              :style="{ color: constructorInfos.color.tertiary }"
              class="driver-name text-center text-sm-right text-md-left"
              cols="12"
              md="6"
            >
              <div>{{ driverInfos.givenName }}</div>
              <div>{{ driverInfos.familyName }}</div>
            </v-col>
          </v-row>

          <v-row class="mt-10 mt-sm-0">
            <v-col class="driver-stats" cols="12" sm="6">
              <div class="mb-10 mb-sm-5 mb-lg-10">
                <div :style="{ color: constructorInfos.color.tertiary }">
                  wins
                </div>
                <div :style="{ color: constructorInfos.color.secondary }">
                  {{ driver.wins }}
                </div>
              </div>

              <div class="mb-10 mb-sm-5 mb-lg-10">
                <div :style="{ color: constructorInfos.color.tertiary }">
                  points
                </div>
                <div :style="{ color: constructorInfos.color.secondary }">
                  {{ driver.points }}
                </div>
              </div>

              <div class="mb-0 mb-sm-5 mb-lg-10">
                <div :style="{ color: constructorInfos.color.tertiary }">
                  standing
                </div>
                <div :style="{ color: constructorInfos.color.secondary }">
                  {{ driver.position }}
                </div>
              </div>
            </v-col>

            <v-col
              class="d-flex align-end justify-center d-md-none pb-0"
              cols="12"
              sm="6"
            >
              <img
                :alt="driverInfos.code"
                :src="driverImage"
                class="driver-image mb-n3"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pb-0 align-end justify-center d-none d-md-flex" cols="6">
          <img
            :alt="driverInfos.code"
            :src="driverImage"
            class="driver-image ml-n16"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="driver-background-container">
      <driver-background
        :number="driverInfos.permanentNumber"
        :primary="constructorInfos.color.primary"
        :secondary="constructorInfos.color.secondary"
        :tertiary="constructorInfos.color.tertiary"
        class="driver-background"
      />
    </div>
  </v-container>
</template>

<script>
import { getDriverDetails } from "@/services/drivers-service";
import DriverBackground from "@/components/driver-background";
import LoadingIndicator from "@/components/loading-indicator";

export default {
  name: "Driver-details",
  components: { LoadingIndicator, DriverBackground },
  data: () => ({
    isLoading: false,
    driverId: null,
    driver: {
      Constructors: {
        Constructor: {
          constructorId: "",
          name: "",
          nationality: "",
          url: "",
        },
        color: {
          primary: "",
          secondary: "",
          tertiary: "",
        },
        drivers: [],
        nameExtended: {
          fullName: "",
          shortName: "",
        },
        points: "",
        position: "",
        positionText: "",
        wins: "",
      },
      Driver: {
        code: "",
        dateOfBirth: "",
        driverId: "",
        familyName: "",
        givenName: "",
        nationality: "",
        permanentNumber: "",
        url: "",
      },
      points: "",
      position: "",
      positionText: "",
      wins: "",
    },
  }),
  mounted() {
    this.isLoading = true;

    this.$store.commit("addBackButtonAction", () =>
      this.$router.push("/drivers")
    );
    this.$store.commit("setBackButtonState", true);

    this.driverId = this.$route.params.id;
    getDriverDetails(this.driverId)
      .then((response) => {
        this.driver = response;
      })
      .catch((e) => {
        if (e.response.status === 404) {
          this.$router.push("/404");
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    driverInfos() {
      return this.driver.Driver;
    },
    constructorInfos() {
      return this.driver.Constructors;
    },
    driverImage() {
      try {
        return require(`@/assets/images/drivers/${this.driverInfos.driverId}.png`);
      } catch (e) {
        return require(`@/assets/images/drivers/no-driver-image.png`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.driver-details-container {
  .inside {
    position: relative;
    z-index: 1;

    .main-row {
      @media #{map-get($display-breakpoints, 'lg-and-up')} {
        min-height: 110vh;
      }

      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;

      .driver-name {
        font-weight: bold;
        line-height: 80px;
        font-size: 76px;
        font-family: Formula1;

        @media #{map-get($display-breakpoints, 'sm-only')} {
          font-size: 65px;
        }

        @media #{map-get($display-breakpoints, 'xs-only')} {
          font-size: 55px;
          line-height: 60px;
        }
      }

      .driver-stats {
        font-weight: bold;
        font-size: 65px;
        line-height: 67px;
        text-align: right;
        direction: rtl;

        @media #{map-get($display-breakpoints, 'sm-and-down')} {
          font-size: 50px;
          line-height: 60px;
        }

        @media #{map-get($display-breakpoints, 'xs-only')} {
          text-align: center;
          direction: unset;
        }
      }

      .driver-image {
        width: 100%;
      }
    }
  }

  .driver-background-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    min-height: 90vh;
    overflow-x: hidden;

    .driver-background {
      margin-left: -49px;
      width: 109.5vw;
      position: absolute;
      bottom: 0;

      @media #{map-get($display-breakpoints, 'sm-only')} {
        width: 112vw;
      }

      @media #{map-get($display-breakpoints, 'xs-only')} {
        width: 120vw;
      }
    }
  }
}
</style>
