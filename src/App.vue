<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <h1>Питстоп</h1>
      </div>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer v-model="drawer" absolute left>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="grey--lighten-2 text--grey-4"
          >
            <v-list-item exact :to="{ name: 'Home' }">
              <v-list-item-title>
                Главная
              </v-list-item-title>
            </v-list-item>

            <v-list-item exact :to="{ name: 'Client' }">
              <v-list-item-title>
                Клиент
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
      group: null
    };
  }
};
</script>
