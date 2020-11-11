import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
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
    component: () => import("@/views/Client"),

    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: () => import("@/components/ClientsTable"),
      },
      {
        path: "profile",
      },
      {
        path: "guest",
      },
      {
        path: "sale",
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
  },
  {
    path: "/client-detail/:clientID",
    component: () => import("@/views/ClientDetail"),

    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: () => import("@/components/ClientDetail/MainSetting"),
      },
      {
        path: "ips",
        component: () => import("@/components/ClientDetail/Ips"),
      },
      {
        path: "addresses",
        component: () => import("@/components/ClientDetail/Addresses"),
      },
      {
        path: "offices",
        component: () => import("@/components/ClientDetail/Offices"),
      },
      {
        path: "cars",
        component: () => import("@/components/ClientDetail/Cars"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
