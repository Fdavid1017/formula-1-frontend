import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backButton: {
      show: false,
      backButtonClick: null,
    },
    currentSeasonYear: 2021,
  },
  mutations: {
    addBackButtonAction(state, action) {
      state.backButton.backButtonClick = action;
    },
    backButtonClick(state) {
      if (state.backButton.backButtonClick) {
        state.backButton.backButtonClick();
      }
    },
    setBackButtonState(state, show) {
      state.backButton.show = show;
    },
  },
  actions: {
    addBackButtonAction(context, action) {
      context.commit("addBackButtonAction", action);
    },
    backButtonClick(context) {
      context.commit("backButtonClick");
    },
    setBackButtonState(context, show) {
      context.commit("setBackButtonState", show);
    },
  },
  getters: {
    backButtonState: (state) => state.backButton.show,
    currentSeasonYear: (state) => state.currentSeasonYear,
  },
});
