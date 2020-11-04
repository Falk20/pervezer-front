import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Client from "../views/Client.vue";
import Clients from "../views/Client/Clients.vue";
import Profiles from "../views/Client/Profiles.vue";
import store from "../store";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/client",
    name: "Client",
    component: Client,
    beforeEnter: ifAuthenticated,
<<<<<<< Updated upstream
=======
    children: [
      {
        path: "",
        component: () => import("@/components/ClientsTable"),
      },
      {
        path: "profiles",
        component: () => import("@/components/ProfilesTable"),
      },
      {
        path: "guest",
      },
      {
        path: "discounts",
        component: () => import("@/components/DiscountsTable"),
      },
      {
        path: "status",
      },
      {
        path: "franchisee",
      },
      {
        path: "sms",
      },
    ],
>>>>>>> Stashed changes
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/client/profiles",
    name: "Profiles",
    component: Profiles,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/client/clients",
    name: "Clients",
    component: Clients,
    beforeEnter: ifAuthenticated,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
