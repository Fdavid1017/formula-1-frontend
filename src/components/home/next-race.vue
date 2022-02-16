<template>
  <v-container class="next-race">
    <v-row>
      <v-col class="d-flex align-center justify-center" cols="12" lg="6">
        <div class="next-race-countdown">
          <h2 class="">{{ nextRace === null ? "" : nextRace["raceName"] }}</h2>
          <v-row justify="center">
            <v-col cols="6" md="3">
              <div class="time">{{ timeRemaining.days }}</div>
              <div class="time-label">
                day{{ timeRemaining.days > 1 ? "s" : "" }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ timeRemaining.hours }}</div>
              <div class="time-label">
                hour{{ timeRemaining.hours > 1 ? "s" : "" }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ timeRemaining.minutes }}</div>
              <div class="time-label">
                minute{{ timeRemaining.minutes > 1 ? "s" : "" }}
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="time">{{ timeRemaining.seconds }}</div>
              <div class="time-label">
                second{{ timeRemaining.seconds > 1 ? "s" : "" }}
              </div>
            </v-col>
          </v-row>
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

        <div class="d-flex align-center justify-center justify-lg-end fill-width">
          <router-link class="show-more-btn" to="/">Show more</router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCurrentSchedule } from "@/services/schedule-service";

export default {
  name: "next-race",
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
    getCurrentSchedule().then((result) => {
      const today = new Date();
      let next = null;

      result.forEach((item) => {
        const date = new Date(`${item["date"]} ${item["time"]}`);
        if (date > today) {
          next = item;
          return;
        }
      });

      if (next === null) {
        next = result.pop();
      }

      this.nextRace = next;
      this.setTimeRemaining();
      this.countDownTimeOut();
    });
  },
  computed: {
    nextRaceDate() {
      if (this.nextRace === null) {
        return new Date();
      }

      return new Date(`${this.nextRace["date"]} ${this.nextRace["time"]}`);
    },
  },
  methods: {
    setTimeRemaining() {
      const total = this.nextRaceDate - new Date();
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
  margin-top: 450px;
  margin-bottom: 75px;

  @include media-breakpoint-up(md) {
    margin-top: 100px;
  }

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
      line-height: 49px;
    }
  }
}
</style>
