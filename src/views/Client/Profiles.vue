<template>
  <v-app>
    <v-main>
      <div class="d-flex flex-column fill-height align-center">
        <h1>Профили</h1>
        <v-btn-toggle>
          <v-btn
            v-for="(item, i) in menuItems"
                  :key="i"
                  exact
                  :to="{ name: item.routeName }"
          >
          {{item.label }}
          </v-btn>
        </v-btn-toggle>
      </div>
      <router-view />
      </v-main>
  </v-app>
</template>
<script>
export default {
  name: "Client",
  data() {
    return {
      menuItems: [
        {
          routeName: "Clients",
          label: "Клиенты"
        },
        {
          routeName: "Profiles",
          label: "Профили"
        },
      ]
    }
  },
  
}
</script>