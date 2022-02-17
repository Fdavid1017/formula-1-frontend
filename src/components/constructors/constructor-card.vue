<template>
  <div class="constructor-card relative">
    <div class="card-content">
      <h2 :style="{ color: team.color.primary }">
        {{ this.team.nameExtended.shortName }}
      </h2>
      <div class="name-second-part">
        {{ nameSecondPart }}
      </div>
    </div>

    <constructors-card-background class="card-background" :primary="team.color.primary" :secondary="team.color.secondary" :tertiary="team.color.tertiary"/>
  </div>
</template>

<script>
import ConstructorsCardBackground from "@/components/constructors/constructors-card-background";
export default {
  name: "constructor-card",
  components: { ConstructorsCardBackground },
  props: {
    team: {
      type: Object,
      default() {
        return {
          Constructor: {
            constructorId: "",
            name: "",
            nationality: "",
            url: "",
          },
          color: {
            primary: "",
            secondary: "",
            tertiary: "",
          },
          points: "",
          position: "",
          positionText: "",
          wins: "",
          nameExtended: {
            shortName: "",
            fullName: "",
          },
        };
      },
    },
  },
  computed: {
    nameSecondPart() {
      const splited = this.team.nameExtended.fullName.split("$team");
      const firstPart = splited[0];
      const secondPart = splited[1];

      if (secondPart) {
        return secondPart;
      }

      return firstPart;
    },
  },
};
</script>

<style lang="scss" scoped>
.constructor-card {
  background-color: white;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;

  .card-content {
    position: relative;
    z-index: 1;

    h2 {
      text-transform: uppercase;
      font-weight: 900;
      font-size: 50px;
      line-height: 75px;
      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
    }

    .name-second-part {
      font-weight: 900;
      font-size: 30px;
      line-height: 45px;
      text-transform: uppercase;
      color: #4b4b4b;
      letter-spacing: 1.2px;
      text-shadow: 0 2px 11px rgba(0, 0, 0, 0.2);
    }
  }

  .card-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transform: rotate(-35deg);
  }
}
</style>
