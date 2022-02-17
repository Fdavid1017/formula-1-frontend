<template>
  <v-container class="">
    <v-row>
      <v-col
        v-for="team in constructors"
        :key="team['Constructor']['constructorId']"
        class="pa-5"
        cols="6"
      >
        <constructor-card :team="team" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getConstructors } from "@/services/constructors-service";
import ConstructorCard from "@/components/constructors/constructor-card";

export default {
  name: "Constructors",
  components: { ConstructorCard },
  data: () => ({
    constructors: [],
  }),
  mounted() {
    getConstructors().then((response) => {
      this.constructors = response;
    });
  },
};
</script>

<style scoped></style>
