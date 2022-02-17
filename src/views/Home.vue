<template>
  <div>
    <hero />
    <next-race />
    <div ref="standingsPanel" class="standings-panel">
      <standings />
    </div>
    <telemetry :standings-height="standingsHeight" />
    <news-panel />
  </div>
</template>

<script>
import Hero from "@/components/home/hero";
import NextRace from "@/components/home/next-race";
import Standings from "@/components/home/standings";
import Telemetry from "@/components/home/telemetry";
import NewsPanel from "@/components/home/news-panel";

export default {
  name: "Home",
  components: { NewsPanel, Telemetry, Standings, NextRace, Hero },
  data: () => ({
    standingsHeight: 0,
  }),
  mounted() {
    this.setHeroTextHeight();
  },
  created() {
    window.addEventListener("resize", this.setHeroTextHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.setHeroTextHeight);
  },
  methods: {
    setHeroTextHeight() {
      this.standingsHeight = this.$refs.standingsPanel.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.standings-panel {
  position: relative;
  z-index: 2;
}
</style>
