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
        <v-tab> Circuit</v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items v-model="tabs" class="mt-5">
      <v-tab-item>
        <div class="text-center" v-if="sessionsInTheFuture.includes('FP1')">
          <p class="text-h5 font-weight-bold">We can't see the future :(</p>
          <p class="text-h4">
            Come back after
            <b>
              {{
                schedule.getFirstPracticeDate().toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </b>
            to see the results.
          </p>
        </div>

        <session-results
          v-else
          :round="schedule.circuit.location.country"
          :session-date="schedule.getFirstPracticeDate()"
          session="FP1"
        />
      </v-tab-item>
      <v-tab-item>
        <div class="text-center" v-if="sessionsInTheFuture.includes('FP2')">
          <p class="text-h5 font-weight-bold">We can't see the future :(</p>
          <p class="text-h4">
            Come back after
            <b>
              {{
                schedule.getSecondPracticeDate().toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </b>
            to see the results.
          </p>
        </div>

        <session-results
          v-else
          :round="schedule.circuit.location.country"
          :session-date="schedule.getSecondPracticeDate()"
          session="FP2"
        />
      </v-tab-item>
      <v-tab-item>
        <div class="text-center" v-if="sessionsInTheFuture.includes('FP3')">
          <p class="text-h5 font-weight-bold">We can't see the future :(</p>
          <p class="text-h4">
            Come back after
            <b>
              {{
                schedule.getThirdPracticeDate().toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </b>
            to see the results.
          </p>
        </div>

        <session-results
          v-else
          :round="schedule.circuit.location.country"
          :session-date="schedule.getThirdPracticeDate()"
          session="FP3"
        />
      </v-tab-item>
      <v-tab-item>
        <div class="text-center" v-if="sessionsInTheFuture.includes('Q')">
          <p class="text-h5 font-weight-bold">We can't see the future :(</p>
          <p class="text-h4">
            Come back after
            <b>
              {{
                schedule.getQualifyingDate().toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </b>
            to see the results.
          </p>
        </div>

        <session-results
          v-else
          :round="schedule.circuit.location.country"
          :session-date="schedule.getQualifyingDate()"
          session="Q"
        />
      </v-tab-item>
      <v-tab-item>
        <div class="text-center" v-if="sessionsInTheFuture.includes('R')">
          <p class="text-h5 font-weight-bold">We can't see the future :(</p>
          <p class="text-h4">
            Come back after
            <b>
              {{
                schedule.getRaceDate().toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </b>
            to see the results.
          </p>
        </div>

        <race-results
          v-else
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
    sessionsInTheFuture: [],
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
        const today = new Date();

        let hasSessionInPast = false;

        if (this.schedule.getFirstPracticeDate() > today) {
          this.sessionsInTheFuture.push("FP1");

          if (!hasSessionInPast) {
            this.tabs = 1;
          }
        } else {
          hasSessionInPast = true;
        }

        if (this.schedule.getSecondPracticeDate() > today) {
          this.sessionsInTheFuture.push("FP2");

          if (!hasSessionInPast) {
            this.tabs = 2;
          }
        } else {
          hasSessionInPast = true;
        }

        const fp3 = this.schedule.getThirdPracticeDate();
        if (fp3) {
          if (fp3 > today) {
            this.sessionsInTheFuture.push("FP3");
            if (!hasSessionInPast) {
              this.tabs = 3;
            }
          } else {
            hasSessionInPast = true;
          }
        }

        const sprint = this.schedule.getSprintDate();
        if (sprint) {
          if (sprint > today) {
            this.sessionsInTheFuture.push("Sprint");
            if (!hasSessionInPast) {
              this.tabs = 3;
            }
          } else {
            hasSessionInPast = true;
          }
        }

        if (this.schedule.getQualifyingDate() > today) {
          this.sessionsInTheFuture.push("Q");

          if (!hasSessionInPast) {
            this.tabs = 4;
          }
        } else {
          hasSessionInPast = true;
        }

        if (this.schedule.getRaceDate() > today) {
          this.sessionsInTheFuture.push("R");

          if (!hasSessionInPast) {
            this.tabs = 5;
          }
        }
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
