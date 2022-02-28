<template>
  <v-container class="my-16">
    <v-row>
      <v-col
        v-for="tweet in news"
        :key="tweet.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
        style="min-height: 500px"
      >
        <Tweet
          v-if="tweet.id"
          :id="tweet.id"
          :options="{
            align: 'center',
          }"
          error-message="This tweet could not be loaded"
          error-message-class="tweet--not-found"
        >
          <div
            class="fill-width fill-height d-flex justify-center align-center"
          >
            <v-progress-circular color="primary" indeterminate />
          </div>
        </Tweet>
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-center mt-10">
      <v-btn
        :loading="requestOptions.isLoading"
        color="primary"
        @click="loadMoreNews"
        >Load more
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { getNews } from "@/services/news-service";
import { Tweet } from "vue-tweet-embed";

export default {
  name: "News",
  components: { Tweet },
  data: () => ({
    news: [],
    requestOptions: {
      isLoading: false,
      token: null,
      limit: 3,
    },
  }),
  async mounted() {
    this.requestOptions.isLoading = true;

    await getNews(6)
      .then((response) => {
        this.news = response.data;
        this.requestOptions.token = response.meta.next_token;
      })
      .finally(() => {
        this.requestOptions.isLoading = false;
      });
  },
  methods: {
    async loadMoreNews() {
      this.requestOptions.isLoading = true;

      await getNews(this.requestOptions.limit, this.requestOptions.token)
        .then((response) => {
          this.news = this.news.concat(response.data);
          this.requestOptions.token = response.meta.next_token;
        })
        .finally(() => {
          this.requestOptions.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
