<template>
  <div class="pb-16">
    <v-row
      v-for="item in standings"
      :key="item.team.constructorId"
      class="mt-16"
      justify="center"
    >
      <v-col cols="10" md="8">
        <constructor-standing-card :team="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Constructor from "@/classes/Constructor";
import { getConstructors } from "@/services/constructors-service";
import ConstructorStandingCard from "@/components/standings/constructor-standing-card";

export default {
  name: "constructors-standings",
  components: { ConstructorStandingCard },
  data: () => ({
    isLOading: false,
    standings: Array[Constructor],
  }),
  mounted() {
    this.isLoading = true;
    getConstructors()
      .then((response) => {
        this.standings = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
