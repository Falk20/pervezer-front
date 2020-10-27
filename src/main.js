import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzFwWDuLmHjieZ3M5kyGtMPCQ6zepBLMQ",
  authDomain: "pervezer-front.firebaseapp.com",
  databaseURL: "https://pervezer-front.firebaseio.com",
  projectId: "pervezer-front",
  storageBucket: "pervezer-front.appspot.com",
  messagingSenderId: "987643677881",
  appId: "1:987643677881:web:c377f4265b55cb8efcdf68",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
