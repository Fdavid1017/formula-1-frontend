<template>
  <loading-indicator v-if="isLoading" />
  <v-container
    v-else
    class="pa-0 overflow-hidden driver-details-container"
    fluid
  >
    <v-container class="inside">
      <v-row class="fill-height main-row">
        <v-col class="pb-0" cols="6"> stats</v-col>
        <v-col class="pb-0 d-flex align-end justify-center" cols="6">
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
  //min-height: 107vh;

  .inside {
    position: relative;
    z-index: 1;

    .main-row {
      min-height: 93vh;

      .driver-image {
        width: 100%;
      }
    }
  }

  .driver-background-container {
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    width: 100vw;
    min-height: 90vh;

    .driver-background {
      margin-left: -49px;
      width: 109.5vw;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
