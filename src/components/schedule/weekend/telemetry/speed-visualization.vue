<template>
  <div class="">
    <v-row class="mb-10" justify="center">
      <v-col class="d-flex align-center" cols="12" md="8">
        <v-slider
          v-model="lap"
          :disabled="isLoading"
          :label="`Lap ${lap}`"
          :loading="isLoading"
          :max="maxLap"
          color="primary"
          hide-details
          min="1"
          thumb-label
          track-color="gray"
        />
      </v-col>
      <v-col class="d-flex align-center" cols="12" md="4">
        <v-autocomplete
          v-model="selectedDriver"
          :disabled="isLoading"
          :items="drivers"
          :loading="isLoading"
          chips
          dense
          hide-details
          hide-selected
          item-text="code"
          label="Driver"
          outlined
          return-object
        >
          <template slot="item" slot-scope="{ item }">
            <div
              :style="{ color: mapTeamColor(item.color) }"
              class="text-center font-weight-bold"
            >
              {{ item.code }}
            </div>
          </template>
          <template slot="selection" slot-scope="{ item }">
            <v-chip
              :color="mapTeamColor(item.color)"
              class="font-weight-bold"
              small
              text-color="white"
            >
              {{ item.code }}
            </v-chip>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row v-if="!isLoading" justify="center">
      <v-col cols="12" md="10">
        <v-img
          v-if="imageData"
          :lazy-src="
            require('@/assets/images/speed-visualization-placeholder.png')
          "
          :src="imageData"
          max-width="100%"
        >
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div v-else class="text-center font-weight-bold">
          {{ message }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { largestLapNumberService } from "@/services/largest-lap-number-service";
import { sessionDriversService } from "@/services/session-drivers-service";
import mapTeamColor from "@/helpers/mapTeamColor";
import { getSpeedOnLap } from "@/services/speed-service";

export default {
  name: "speed-visualization",
  props: {
    round: {
      type: String,
      default: "",
    },
    session: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    isLoading: false,
    lap: 1,
    maxLap: 1,
    lapLoadingDebounce: null,
    drivers: [],
    selectedDriver: null,
    imageData: null,
    message: "Select a driver",
  }),
  async mounted() {
    this.isLoading = true;

    await largestLapNumberService(this.round, this.session).then((response) => {
      this.maxLap = response.largestLapNumber;
    });

    await sessionDriversService(this.round, this.session).then((response) => {
      response.sort((a, b) => {
        const aTeam = a.team;
        const bTeam = b.team;

        if (aTeam === bTeam) {
          const aName = a.fullName;
          const bName = b.fullName;

          return aName > bName ? 1 : -1;
        }

        return aTeam > bTeam ? 1 : -1;
      });

      this.drivers = response;
    });

    this.isLoading = false;
  },
  methods: {
    mapTeamColor,
    loadSpeedImage() {
      if (!this.selectedDriver) {
        return;
      }

      this.isLoading = true;
      getSpeedOnLap(
        this.round,
        this.session,
        this.lap,
        this.selectedDriver.code
      )
        .then((response) => {
          if (response) {
            this.imageData = response.url;
          }
        })
        .catch(() => {
          this.message = "No data found for this driver and lap combination";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    lap() {
      clearTimeout(this.lapLoadingDebounce);
      this.lapLoadingDebounce = setTimeout(() => {
        this.loadSpeedImage();
      }, 1000);
    },
    selectedDriver(val) {
      if (!val) {
        this.message = "No data found for this driver and lap combination";
        return;
      }

      this.loadSpeedImage();
    },
  },
};
</script>

<style scoped></style>
