<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="weekend pb-16">
    <weekend-banner :schedule="schedule" />

    <v-card :elevation="5" class="mt-n2 rounded-t-0">
      <v-tabs v-model="tabs" centered>
        <v-tab>Free practice 1</v-tab>
        <v-tab>Free practice 2</v-tab>
        <v-tab>Free practice 3</v-tab>
        <v-tab>Qualifying</v-tab>
        <v-tab>Race</v-tab>
        <v-tab>Circuit</v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items v-model="tabs" class="mt-5">
      <v-tab-item>
        <session-results
          :round="schedule.circuit.location.country"
          :session-date="schedule.getFirstPracticeDate()"
          session="FP1"
        />
      </v-tab-item>
      <v-tab-item>
        <session-results
          :round="schedule.circuit.location.country"
          :session-date="schedule.getSecondPracticeDate()"
          session="FP2"
        />
      </v-tab-item>
      <v-tab-item>
        <session-results
          :round="schedule.circuit.location.country"
          :session-date="schedule.getThirdPracticeDate()"
          session="FP3"
        />
      </v-tab-item>
      <v-tab-item>
        <session-results
          :round="schedule.circuit.location.country"
          :session-date="schedule.getQualifyingDate()"
          session="Q"
        />
      </v-tab-item>
      <v-tab-item>
        <race-results
          :round="schedule.round"
          :session-date="schedule.getRaceDate()"
        />
      </v-tab-item>
      <v-tab-item>
        <circuit-infos :schedule="schedule" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getScheduledRoundInformation } from "@/services/schedule-service";
import CircuitInfos from "@/components/schedule/weekend/circuit-infos";
import LoadingIndicator from "@/components/loading-indicator";
import ScheduleItem from "@/classes/ScheduleItem";
import WeekendBanner from "@/components/schedule/weekend/weekend-banner";
import SessionResults from "@/components/schedule/weekend/session-results";
import RaceResults from "@/components/schedule/weekend/race-results";

export default {
  name: "Weekend",
  components: {
    RaceResults,
    SessionResults,
    WeekendBanner,
    LoadingIndicator,
    CircuitInfos,
  },
  data: () => ({
    isLoading: false,
    round: null,
    schedule: new ScheduleItem(),
    tabs: null,
  }),
  mounted() {
    this.isLoading = true;

    this.$store.commit("addBackButtonAction", () =>
      this.$router.push("/schedule")
    );
    this.$store.commit("setBackButtonState", true);

    this.round = this.$route.params.round;

    const tabParam = this.$route.query.tab?.toLowerCase();

    if (tabParam) {
      switch (tabParam) {
        case "fp1":
          this.tabs = 0;
          break;
        case "fp2":
          this.tabs = 1;
          break;
        case "fp3":
          this.tabs = 2;
          break;
        case "qualifying":
          this.tabs = 3;
          break;
        case "race":
          this.tabs = 4;
          break;
        case "circuit":
          this.tabs = 5;
          break;
      }
    }

    getScheduledRoundInformation(this.round)
      .then((response) => {
        this.schedule = response;
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
    tabIndexToName(index) {
      switch (index) {
        case 0:
          return "fp1";
        case 1:
          return "fp2";
        case 2:
          return "fp3";
        case 3:
          return "qualifying";
        case 4:
          return "race";
        case 5:
          return "circuit";
      }
    },
  },
  watch: {
    tabs() {
      let tabName = this.tabIndexToName(this.tabs);
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.tab = tabName;
      this.$router.replace({ query: queries });
    },
  },
};
</script>

<style lang="scss" scoped>
.weekend {
}
</style>
