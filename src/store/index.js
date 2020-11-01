import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    isAuthenticated() {
      return false;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
