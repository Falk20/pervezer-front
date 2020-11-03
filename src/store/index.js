import Vue from "vue";
import Vuex from "vuex";
import Router from "@/router";

import { SET_IS_AUTHENTICATED } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    [SET_IS_AUTHENTICATED](state, payload) {
      state.isAuthenticated = payload;

      if (payload) {
        Router.push({ name: "Home" });
      }
    },
  },
  actions: {},
  modules: {},
});
