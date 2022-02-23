<template>
  <v-container class="d-flex flex-column justify-center align-center my-10">
    <img alt="404" src="@/assets/images/404-image.png" />
    <h2>404</h2>
    <p>Page Not Found</p>
    <v-btn class="mt-5" color="primary" to="/">Go back to home page</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Page-not-found"
};
</script>

<style lang="scss" scoped>
img {
  max-width: 90%;
}

h2 {
  font-size: 100px;
}

p {
  font-size: 40px;
}
</style>
