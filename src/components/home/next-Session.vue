<template>
  <v-container class="next-race">
    <v-row>
      <v-col class="d-flex align-center justify-center" cols="12" lg="6">
        <div class="next-race-countdown">
          <h2 class="mb-2">
            {{ nextRace === null ? "" : nextRace["raceName"] }}
          </h2>
          <div class="text-center time-label mb-4">
            {{ nextSession.session }}
          </div>
          <v-row justify="center">
            <v-col cols="6" md="3">
              <div class="time">{{ Math.abs(timeRemaining.days) }}</div>
              <div class="time-label">days</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ Math.abs(timeRemaining.hours) }}</div>
              <div class="time-label">hours</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ Math.abs(timeRemaining.minutes) }}</div>
              <div class="time-label">minutes</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ Math.abs(timeRemaining.seconds) }}</div>
              <div class="time-label">seconds</div>
            </v-col>
          </v-row>

          <div
            v-if="new Date() > nextSession.dateTime"
            class="text-center time-label"
          >
            AGO
          </div>
        </div>
      </v-col>
      <v-col
        class="d-flex align-end flex-column justify-center"
        cols="12"
        lg="6"
      >
        <p class="text-center text-lg-end">
          Get informations about the upcoming and past races.
        </p>

        <div
          class="d-flex align-center justify-center justify-lg-end fill-width"
        >
          <router-link class="show-more-btn" to="/schedule"
            >Show more
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getUpcomingRace } from "@/services/schedule-service";

export default {
  name: "nextSession",
  data: () => ({
    nextRace: null,
    timeRemaining: {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  }),
  async mounted() {
    getUpcomingRace().then((response) => {
      this.nextRace = response;
      this.setTimeRemaining();
      this.countDownTimeOut();
    });
  },
  computed: {
    nextSession() {
      if (this.nextRace === null) {
        return new Date();
      }

      const sessionTimes = [];

      if (this.nextRace.firstPractice) {
        sessionTimes.push({
          session: "FP1",
          dateTime: new Date(
            `${this.nextRace.firstPractice.date}T${this.nextRace.firstPractice.time}`
          ),
        });
      }

      if (this.nextRace.secondPractice) {
        sessionTimes.push({
          session: "FP2",
          dateTime: new Date(
            `${this.nextRace.secondPractice.date}T${this.nextRace.secondPractice.time}`
          ),
        });
      }

      if (this.nextRace.thirdPractice) {
        sessionTimes.push({
          session: "FP3",
          dateTime: new Date(
            `${this.nextRace.thirdPractice.date}T${this.nextRace.thirdPractice.time}`
          ),
        });
      }

      if (this.nextRace.qualifying) {
        sessionTimes.push({
          session: "Qualifying",
          dateTime: new Date(
            `${this.nextRace.qualifying.date}T${this.nextRace.qualifying.time}`
          ),
        });
      }

      if (this.nextRace.sprint) {
        sessionTimes.push({
          session: "Sprint",
          dateTime: new Date(
            `${this.nextRace.sprint.date}T${this.nextRace.sprint.time}`
          ),
        });
      }

      sessionTimes.push({
        session: "Race",
        dateTime: new Date(`${this.nextRace.date}T${this.nextRace.time}`),
      });

      let closest = null;

      const today = new Date();

      for (let i = 0; i < sessionTimes.length; i++) {
        if (
          today.getTime() < sessionTimes[i].dateTime.getTime() &&
          (!closest ||
            sessionTimes[i].dateTime.getTime() < closest.dateTime.getTime())
        ) {
          closest = sessionTimes[i];
        }
      }

      return closest;
    },
  },
  methods: {
    setTimeRemaining() {
      const total = this.nextSession.dateTime - new Date();
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      this.timeRemaining = {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    },
    countDownTimeOut() {
      setTimeout(() => {
        this.setTimeRemaining();
        this.countDownTimeOut();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.next-race {
  margin-top: 100px;
  margin-bottom: 75px;

  p {
    @include home-panel-text(black);
  }

  .show-more-btn {
    @include button;
  }

  .next-race-countdown {
    background: $f1-red;
    color: white;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    width: 100%;
    max-width: 569px;

    h2 {
      font-weight: 600;
      font-size: 35px;
      line-height: 49px;
      margin-bottom: 25px;
    }

    .time {
      font-weight: 600;
      font-size: 30px;
      line-height: 49px;
    }

    .time-label {
      font-size: 25px;
    }
  }
}
</style>
