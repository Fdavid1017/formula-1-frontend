<template>
  <router-link class="driver-card d-block relative" to="/">
    <card-background
      :primary="driver.Constructors.color.primary"
      :secondary="driver.Constructors.color.secondary"
      :tertiary="driver.Constructors.color.tertiary"
      class="card-background"
    />
  </router-link>
</template>

<script>
import CardBackground from "@/components/card-background";

export default {
  name: "driver-card",
  components: { CardBackground },
  props: {
    driver: {
      type: Object,
      default() {
        return {
          Constructors: {
            Constructor: {
              constructorId: "",
              name: "",
              nationality: "",
              url: "",
            },
            color: { primary: "", secondary: "", tertiary: "" },
            drivers: [],
            nameExtended: { fullName: "", shortName: "" },
            points: "",
            position: "",
            positionText: "",
            wins: "",
          },
          Driver: {
            code: "",
            dateOfBirth: "",
            driverId: "",
            familyName: "",
            givenName: "",
            nationality: "",
            permanentNumber: "",
            url: "",
          },
          points: "",
          position: "",
          positionText: "",
          wins: "",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.driver-card {
  background-color: white;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  min-height: 270px;
  cursor: pointer;
  overflow: hidden;

  .card-background {
    position: absolute;
    left: -20%;
    top: -43%;
    width: 130%;
    transform: rotate(-35deg);
  }
}
</style>
