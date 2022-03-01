<template>
  <div class="news-panel d-flex align-center">
    <v-container>
      <v-row align="center">
        <v-col class="text" cols="12" md="6">
          <p class="text-center text-md-start">
            See whats happening in the world of Formula&nbsp;1.
          </p>

          <div class="d-flex align-start justify-center justify-md-start">
            <router-link class="show-more-button" to="/news">
              Show more
            </router-link>
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="4" offset-md="1" offset-lg="2">
          <Tweet
            v-if="tweetId"
            :id="tweetId"
            :options="{
              align: 'center',
              cards: 'hidden',
              conversation: 'none',
            }"
            error-message="This tweet could not be loaded"
            error-message-class="tweet--not-found"
          >
            <div class="fill-width d-flex justify-center align-center">
              <v-progress-circular color="primary" indeterminate />
            </div>
          </Tweet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getNews } from "@/services/news-service";
import { Tweet } from "vue-tweet-embed";

export default {
  name: "news-panel",
  components: { Tweet },
  data: () => ({
    tweetId: null,
  }),
  mounted() {
    getNews(1).then((response) => {
      const latestNews = response["data"][0];
      this.tweetId = latestNews["id"];
    });
  },
};
</script>

<style lang="scss" scoped>
.news-panel {
  background-color: $dark-blue;
  padding: 40px 0;
  min-height: 540px;

  .text {
    p {
      font-weight: 600;
      font-size: 35px;
      line-height: 49px;
      color: white;
    }

    .show-more-button {
      @include button;
    }
  }
}
</style>
