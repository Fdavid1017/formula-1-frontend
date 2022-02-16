<template>
  <v-container class="next-race">
    <v-row>
      <v-col cols="6" class="d-flex align-center">
        <div class="next-race-countdown">
          <h2 class="">Hungary</h2>
          <v-row justify="center">
            <v-col cols="3">
              <div class="time">{{ days }}</div>
              <div class="time-label">day{{ days > 1 ? "s" : "" }}</div>
            </v-col>
            <v-col cols="3">
              <div class="time">{{ hours }}</div>
              <div class="time-label">hour{{ hours > 1 ? "s" : "" }}</div>
            </v-col>
            <v-col cols="3">
              <div class="time">{{ minutes }}</div>
              <div class="time-label">minute{{ minutes > 1 ? "s" : "" }}</div>
            </v-col>
            <v-col cols="3">
              <div class="time">{{ secs }}</div>
              <div class="time-label">second{{ secs > 1 ? "s" : "" }}</div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="d-flex align-end flex-column justify-center" cols="6">
        <p class="text-end">
          Get informations about the upcoming and past races.
        </p>
        <router-link class="show-more-btn" to="/">Show more</router-link>
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
  }),
  async mounted() {
    getCurrentSchedule().then((result) => {
     result.forEach((item)=>{

     })
    });
  },
  computed: {
    days() {
      return 2;
    },
    hours() {
      return 2;
    },
    minutes() {
      return 1;
    },
    secs() {
      return 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.next-race {
  margin-top: 150px;
  margin-bottom: 75px;

  p {
    @include home-panel-text(black);
  }

  .show-more-btn {
    @include button;

    margin-top: 25px;
    float: right;
  }

  .next-race-countdown {
    background: $f1-red;
    color: white;
    padding: 10px;
    width: 100%;
    text-align: center;
    border-radius: 5px;

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
