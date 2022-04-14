<template>
  <router-link :to="`/schedule/${weekend.round}`" class="text-decoration-none">
    <div class="schedule-card relative py-5">
      <div class="flag">
        <component :is="flagComponent" />
      </div>

      <div class="base d-flex flex-column align-center">
        <div class="circuit-layout-container">
          <img
            :alt="weekend.circuit.circuitName"
            :src="layoutImage"
            class="circuit-layout-image"
          />
        </div>

        <h2>
          {{ weekend.circuit.location.country }}
        </h2>

        <div class="date mt-5">
          {{ weekendDates }}
        </div>
      </div>

      <div class="overlay">
        <img
          :alt="weekend.circuit.circuitName"
          :src="coverImage"
          class="circuit-photo"
        />

        <div
          class="details-container d-flex flex-column justify-space-between align-center py-5 px-4 text-center"
        >
          <div class="weekend-name">{{ weekend.raceName }}</div>

          <v-btn color="primary" to="/"> See details</v-btn>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import AustriaFlag from "../flags/austria-flag";
import AzerbaijanFlag from "../flags/azerbaijan-flag";
import BahrainFlag from "../flags/bahrain-flag.vue";
import BelgiumFlag from "../flags/belgium-flag.vue";
import BrazilFlag from "../flags/brazil-flag.vue";
import FranceFlag from "../flags/france-flag.vue";
import HungaryFlag from "../flags/hungary-flag";
import ItalyFlag from "../flags/italy-flag";
import MexicoFlag from "../flags/mexico-flag";
import MonacoFlag from "../flags/monaco-flag";
import NetherlandsFlag from "../flags/netherlands-flag";
import PortugalFlag from "../flags/portugal-flag";
import RussiaFlag from "../flags/russia-flag";
import SaudiArabiaFlag from "../flags/saudi-arabia-flag";
import SpainFlag from "../flags/spain-flag";
import UaeFlag from "../flags/uae-flag";
import UkFlag from "../flags/uk-flag";
import UsaFlag from "../flags/usa-flag";
import ScheduleItem from "@/classes/ScheduleItem";

export default {
  name: "schedule-card",
  props: {
    weekend: {
      type: ScheduleItem,
      default() {
        return new ScheduleItem();
      },
    },
  },
  computed: {
    layoutImage() {
      try {
        return require(`@/assets/images/circuit-layout-minimal/${this.weekend.circuit.circuitId}.png`);
      } catch (e) {
        console.log(`Error getting ${this.weekend.circuit.circuitId}.png`);
        return null;
      }
    },
    coverImage() {
      try {
        return require(`@/assets/images/circuit-photos/${this.weekend.circuit.circuitId}.jpg`);
      } catch (e) {
        console.log(`Error getting ${this.weekend.circuit.circuitId}.png`);
        return null;
      }
    },
    weekendDates() {
      const race = new Date(this.weekend.date);
      const start = new Date(race);
      start.setDate(start.getDate() - 2);

      return `${start.toLocaleString("en-US", {
        month: "short",
      })} ${start.getDate()} - ${race.getDate()}`;
    },
    flagComponent() {
      switch (this.weekend.circuit.location.country.toLowerCase()) {
        case "bahrain":
          return BahrainFlag;
        case "italy":
          return ItalyFlag;
        case "portugal":
          return PortugalFlag;
        case "spain":
          return SpainFlag;
        case "monaco":
          return MonacoFlag;
        case "azerbaijan":
          return AzerbaijanFlag;
        case "france":
          return FranceFlag;
        case "austria":
          return AustriaFlag;
        case "uk":
          return UkFlag;
        case "hungary":
          return HungaryFlag;
        case "belgium":
          return BelgiumFlag;
        case "netherlands":
          return NetherlandsFlag;
        case "russia":
          return RussiaFlag;
        // case "turkey":
        // return TurkeyFlag
        case "usa":
          return UsaFlag;
        case "mexico":
          return MexicoFlag;
        case "brazil":
          return BrazilFlag;
        // case "qatar":
        //   return QatarFlag
        case "saudi arabia":
          return SaudiArabiaFlag;
        case "uae":
          return UaeFlag;
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule-card {
  background-color: $dark-blue;
  color: white;
  cursor: pointer;
  overflow: hidden;
  height: 100%;

  &:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    background: $dark-blue;
    background: linear-gradient(
      0deg,
      rgba(0, 48, 73, 0.75) 0%,
      rgba(0, 48, 73, 0) 100%
    );
  }

  .flag {
    position: absolute;
    bottom: -34%;
    right: -31%;
    width: 100%;
    transform: rotate(-39deg);
  }

  .base {
    position: relative;
    z-index: 1;

    .circuit-layout-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 215px;

      .circuit-layout-image {
        width: 50%;

        @media #{map-get($display-breakpoints, 'sm-and-down')} {
          width: 75%;
        }
      }
    }

    h2 {
      font-weight: bold;
      font-size: 45px;
    }

    .date {
      font-size: 25px;
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 100%;
    z-index: 3;
    background-color: $dark-blue;
    transition: all 0.3s ease-out;

    .circuit-photo {
      width: 100%;
      height: 50%;
      object-fit: cover;
      -webkit-box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.7);
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.7);
    }

    .details-container {
      height: 48%;

      .weekend-name {
        font-weight: bold;
        font-size: 25px;
      }
    }
  }

  &:hover {
    .overlay {
      top: 0;
    }
  }
}
</style>
