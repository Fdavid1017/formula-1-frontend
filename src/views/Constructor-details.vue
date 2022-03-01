<template>
  <loading-indicator v-if="isLoading" />

  <v-container v-else class="constructor-details pa-0 overflow-hidden" fluid>
    <v-row
      :class="{ 'flex-nowrap': showCarDetails }"
      class="my-0 mx-3 content-row"
    >
      <v-col
        :class="{
          'constructor-name-col-hidden': showCarDetails,
          'inner-div-overflow-hide': showCarDetails,
        }"
        :cols="showCarDetails ? 2 : 12"
        class="d-flex align-end transition"
        md="2"
        order="first"
      >
        <div class="constructor-name">
          <h2 :style="{ color: team.color.primary }">
            {{ this.team.nameExtended.shortName }}
          </h2>
          <div :style="{ color: team.color.tertiary }" class="name-second-part">
            {{ getConstructorNameSecondPart(team.nameExtended.fullName) }}
          </div>
        </div>
      </v-col>
      <v-col
        :class="{
          'background-container-full': showCarDetails,
          'justify-space-between': showCarDetails,
          'justify-end': !showCarDetails,
        }"
        :cols="showCarDetails ? 8 : 12"
        :order="showCarDetails ? 'first' : 'last'"
        class="d-flex flex-column align-center justify-md-end pb-0 background-container col-transition mt-0"
        md="8"
        order-md="first"
      >
        <v-expansion-panels
          :class="{ 'd-none': !showCarDetails }"
          class="d-md-none"
        >
          <v-expansion-panel v-for="(item, index) in hotspotItems" :key="index">
            <v-expansion-panel-header>
              <b>{{ item.title }}</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="py-2 px-6 text-justify"
              v-html="item.text"
            />
          </v-expansion-panel>
        </v-expansion-panels>

        <constructor-details-background
          :primary="team.color.primary"
          :secondary="team.color.secondary"
          :tertiary="team.color.tertiary"
          class="constructor-details-background"
        />
      </v-col>
      <v-col
        :class="{ 'inner-div-overflow-hide': showCarDetails }"
        :cols="showCarDetails ? 2 : 12"
        class="d-flex align-end justify-end col-transition"
        md="2"
      >
        <div class="stats">
          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              wins
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.wins }}
            </div>
          </div>

          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              points
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.points }}
            </div>
          </div>

          <div class="stat-item">
            <div :style="{ color: team.color.tertiary }" class="stat-title">
              standing
            </div>
            <div :style="{ color: team.color.primary }" class="stat-value">
              {{ team.position }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="bottom relative">
      <v-row justify="center">
        <v-col
          :class="{ 'bottom-container-full': showCarDetails }"
          :cols="showCarDetails ? 7 : 10"
          class="pa-0 relative col-transition"
          md="7"
        >
          <div v-if="showCarDetails">
            <hotspot-group
              :allow-multiple-open="false"
              :items="hotspotItems"
              class="d-none d-md-block"
            />
          </div>
          <img
            :alt="`${team.Constructor.name} Car`"
            :src="
              require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
            "
            class="car-image"
            @click="showCarDetails = true"
          />
          <div class="car-reflection-wrapper">
            <img
              :alt="`${team.Constructor.name} Car reflection`"
              :src="
                require(`@/assets/images/cars/${team.Constructor.constructorId}.png`)
              "
              class="car-image-reflection"
            />
          </div>
          <div v-if="!showCarDetails" class="click-text">
            Click the car to see more indept informations
          </div>

          <div
            v-if="!showCarDetails"
            class="drivers d-flex align-end justify-space-between"
          >
            <router-link :to="`/drivers/${team.drivers[0].id}`">
              <img
                :alt="team.drivers[0]"
                :src="
                  require(`@/assets/images/drivers/${team.drivers[0].id}.png`)
                "
                class="driver-image"
              />
            </router-link>
            <router-link :to="`/drivers/${team.drivers[1].id}`">
              <img
                :alt="team.drivers[1]"
                :src="
                  require(`@/assets/images/drivers/${team.drivers[1].id}.png`)
                "
                class="driver-image"
              />
            </router-link>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { getConstructorDetails } from "@/services/constructors-service";
import LoadingIndicator from "@/components/loading-indicator";
import getConstructorNameSecondPart from "@/helpers/getConstructorNameSecondPart";
import ConstructorDetailsBackground from "@/components/constructors/constructor-details-background";
import HotspotGroup from "@/components/constructors/hotspot-group";

export default {
  name: "Constructor-details",
  components: {
    HotspotGroup,
    LoadingIndicator,
    ConstructorDetailsBackground,
  },
  data: () => ({
    isLoading: false,
    constructorId: null,
    team: {
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
      drivers: [
        { code: "", id: "" },
        { code: "", id: "" },
      ],
      nameExtended: {
        fullName: "",
        shortName: "",
      },
      points: "",
      position: "",
      positionText: "",
      wins: "",
    },
    showCarDetails: false,
  }),
  mounted: function () {
    this.isLoading = true;

    this.$store.commit("addBackButtonAction", this.backClick);
    this.$store.commit("setBackButtonState", true);

    this.constructorId = this.$route.params.id;
    getConstructorDetails(this.constructorId)
      .then((response) => {
        this.team = response;
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
  methods: {
    getConstructorNameSecondPart,
    backClick() {
      if (this.showCarDetails) {
        this.showCarDetails = false;
        return;
      }
      this.$router.push("/constructors");
    },
  },
  computed: {
    hotspotItems() {
      return [
        {
          color: this.team.color.secondary,
          secondaryColor: this.team.color.primary,
          left: 18.8,
          top: -23.8,
          title: "Wheels",
          text: "F1 introduced the new 18-inch tires in 2022.<br>The new Pirelli compounds and constructions for these 18-inch tyres have been designed with the goal of reducing the amount the tyres overheat when they slide – a primary aspect that should help with closer racing.",
        },
        {
          color: this.team.color.secondary,
          secondaryColor: this.team.color.primary,
          left: 41.8,
          top: -68.8,
          title: "Halo",
          text: "The halo is a driver crash-protection system used in open-wheel racing series, which consists of a curved bar placed to protect the driver's head with the help of the HANS device. A HANS device (head and neck support device) are used to reduce the likelihood of head or neck injuries, including the often fatal basilar skull fracture, in the event of a crash.",
        },
        {
          color: this.team.color.secondary,
          secondaryColor: this.team.color.primary,
          left: 68.8,
          top: -54.8,
          title: "Engine",
          text: "The formula-1 cars use an 1.6-litre turbo-hybrid units. The power units uses fuel that contains 5.75% bio-components in order to make more sustainable fuel.<br>The cars ar equipped with an 8-speed seami-automatic paddle-shift sequential gearbox.",
        },
        {
          color: this.team.color.secondary,
          secondaryColor: this.team.color.primary,
          left: 3.8,
          top: -13.8,
          position: "right-align",
          title: "Front wing",
          text: "The front wing’s job is to both generate consistent downforce when running closely behind another car, and ensure that the front wheel wake is well controlled and directed down the car in the least disruptive way.",
        },
        {
          color: this.team.color.secondary,
          secondaryColor: this.team.color.primary,
          left: 90,
          top: -63.8,
          position: "left-align",
          title: "Rear wing + DRS",
          text: "The rear wings direct airflow upwards, but they are also designed to send flow outwards, leaving the ‘dirty air’ sitting there for the following car to drive through. The shape and position of the 2022 car’s rear wing creates a rotational airflow that collects the rear wheel wake and rolls it into the flow exiting the diffuser.<br><b style='display: contents'>Drs (Drag Reduction System):</b> the DRS opens an adjustable flap on the rear wing of the car, in order to reduce drag, thus giving a pursuing car an overtaking advantage.The device can only be used during a race after two racing laps have been completed, and when the pursuing car enters a designated activation zone defined by the FIA.",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

.constructor-details {
  $floor-height: 115px;
  min-height: 93vh;

  .content-row {
    min-height: calc(93vh - #{$floor-height});
  }

  .constructor-name {
    transform: scale(-1);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    max-height: 70vh;
    position: relative;
    z-index: 10;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      transform: unset;
      writing-mode: unset;
      text-orientation: unset;
    }

    h2,
    .name-second-part {
      font-weight: 900;
      text-transform: uppercase;
      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
    }

    h2 {
      font-size: 100px;
      line-height: 80px;
    }

    .name-second-part {
      font-size: 40px;
      line-height: 60px;
    }
  }

  .driver-codes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 25px;
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    font-size: 60px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .stats {
    text-align: right;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      display: flex;
      width: 100%;
      text-align: left;
      align-items: start;
      justify-content: space-between;
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      display: block;
      width: 100%;
      text-align: left;
    }

    .stat-item {
      text-transform: uppercase;
      margin-top: 50px;
      filter: drop-shadow(2px 0px 11px rgba(0, 0, 0, 0.2));

      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        margin-top: 0;
      }

      .stat-title {
        font-size: 30px;
      }

      .stat-value {
        margin-top: -30px;
        font-weight: 900;
        font-size: 70px;
      }
    }
  }

  .background-container {
    transition: all 0.3s;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      margin-top: -10%;
    }
  }

  .bottom {
    min-height: $floor-height;
    box-shadow: 0px -3px 41px rgba(0, 0, 0, 0.19);
    background-color: white;

    .car-image {
      position: relative;
      z-index: 15;
      width: 100%;
      margin-top: -100%;
      filter: drop-shadow(2px 1px 11px rgba(0, 0, 0, 0.47));
      cursor: pointer;
      transform-origin: bottom center;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);

        & + .car-reflection-wrapper {
          transform: scale(1.1);
        }
      }
    }

    .car-reflection-wrapper {
      transform-origin: top center;
      transition: all 0.3s ease;

      .car-image-reflection {
        position: relative;
        z-index: 1;
        width: 100%;
        transform: scaleY(-1);
        margin-top: -7px;
        transition: all 0.3s ease;
        mask-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        );
        pointer-events: none;
      }
    }

    .click-text {
      font-weight: 300;
      font-size: 14px;
      opacity: 0.5;
      position: absolute;
      top: 20px;
    }

    .drivers {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 100%;

      .driver-image {
        width: 100%;
        cursor: pointer;
        transform-origin: bottom center;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .constructor-details-background {
    width: 100%;
  }

  .background-container-full {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;

    .constructor-details-background {
      margin-top: -250px;
    }
  }

  .bottom-container-full {
    width: 90% !important;
    max-width: 90% !important;
    flex: 0 0 90% !important;

    .car-image {
      &:hover {
        cursor: default;
        transform: unset;

        & + .car-reflection-wrapper {
          transform: unset;
        }
      }
    }
  }

  .col-transition {
    transition: all 0.3s;
  }

  .constructor-name-col-hidden {
    margin-left: -16.6666666667%;
  }

  .inner-div-overflow-hide {
    div {
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
