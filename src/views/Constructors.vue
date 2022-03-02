<template>
  <loading-indicator v-if="isLoading" />
  <v-container v-else class="my-15">
    <v-row justify="center">
      <v-col
        v-for="team in constructors"
        :key="team.team.constructorId"
        class="pa-5"
        cols="10"
        md="6"
      >
        <constructor-card :team="team" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getConstructors } from "@/services/constructors-service";
import ConstructorCard from "@/components/constructors/constructor-card";
import LoadingIndicator from "@/components/loading-indicator";
import Constructor from "@/classes/Constructor";

export default {
  name: "Constructors",
  components: { LoadingIndicator, ConstructorCard },
  data: () => ({
    constructors: Array[Constructor],
    isLoading: false,
  }),
  mounted() {
    this.isLoading = true;
    getConstructors()
      .then((response) => {
        this.constructors = response;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
