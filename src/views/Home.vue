<template>
  <div>
    <hero />
    <next-race />
    <standings />
    <telemetry />
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
};
</script>

<style lang="scss" scoped></style>
