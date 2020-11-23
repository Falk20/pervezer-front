<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <h1>Pitstop</h1>
      </div>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer v-model="drawer" absolute left>
        <v-list nav dense>
          <v-list-item-group active-class="grey--lighten-2 text--grey-4">
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              exact
              :to="item.route"
            >
              <v-list-item-title>
                {{ item.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false,

      menuItems: [
        {
          route: { name: "Home" },
          label: "Главная",
        },
        {
          route: { path: "/client" },
          label: "Клиент",
        },
        {
          route: { path: "/finance" },
          label: "Финансы",
        },
        {
          route: { path: "/order" },
          label: "Заказы",
        },
        {
          route: { path: "/vendor" },
          label: "Поставщики",
        },
      ],
    };
  },

  watch: {
    $route() {
      this.drawer = false;
    },
  },
};
</script>
