<template>
  <div>
    <hero />
    <next-race />
  </div>
</template>

<script>
import Hero from "@/components/home/hero";
import NextRace from "@/components/home/next-race";
export default {
  name: "Home",
  components: { NextRace, Hero },
};
</script>

<style lang="scss" scoped></style>
