<template>
  <v-app>
    <v-main>
      <div class="d-flex flex-column fill-height align-center">
        <h1>Клиенты</h1>
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  name: "Home"
=======
  name: "Client",

  components: {
    TabsMenu
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Клиенты",
          to: "/client"
        },
        {
          label: "Профили",
          to: "/client/profiles"
        },
        {
          label: "Гость",
          to: "/client/guest"
        },
        {
          label: "Скидки на заказ",
          to: "/client/discounts"
        },
        {
          label: "Статусы",
          to: "/client/status"
        },
        {
          label: "Франчайзи",
          to: "/client/franchisee"
        },
        {
          label: "SMS-рассылка",
          to: "/client/sms"
        }
      ]
    };
  },

  computed: {
    tabsLabels() {
      return this.tabs.map(tab => tab.label);
    }
  }
>>>>>>> Stashed changes
};
</script>
=======
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
>>>>>>> Stashed changes
