<template>
  <v-footer class="footer" padless color="#303C42">
    <div class="top-bar"></div>
    <v-container>
      <div class="d-flex">asaasasasas</div>

      <div class="bottom">
        <img src="@/assets/logo-white.svg" alt="Logo" />
        <v-spacer />
        <div class="">
          © 2003-{{ new Date().getFullYear() }} Formula One World Championship
          Limited
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "my-footer",
};
</script>

<style lang="scss" scoped>
.footer {
  box-shadow: inset 0 10px 5px -2px rgba(0, 0, 0, 0.3) !important;

  .top-bar {
    //width: 100%;
    //height: 1px;
    //background-color: $dark-blue;
    //box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  }

  .bottom {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 200;
    letter-spacing: 1px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
}
</style>
