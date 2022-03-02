export default class News {
  constructor(item) {
    if (!item) {
      this.entites = {
        mentions: [],
        hashtags: [],
      };
      this.created_at = new Date();
      this.id = "";
      this.public_metrics = {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      };
      return;
    }

    this.entites = {
      mentions: [],
      hashtags: [],
    };

    if (item.entites) {
      if (item.entites.mentions) {
        this.entites.mentions = item.entites.mentions;
      }

      if (item.entites.hashtags) {
        this.entites.hashtags = item.entites.hashtags;
      }
    }

    this.created_at = new Date(item.created_at);
    this.id = item.id;
    this.public_metrics = {
      retweet_count: item.public_metrics.retweet_count,
      reply_count: item.public_metrics.reply_count,
      like_count: item.public_metrics.like_count,
      quote_count: item.public_metrics.quote_count,
    };
  }
}
