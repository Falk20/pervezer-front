<template>
  <div class="d-flex flex-column fill-height align-center">
    <h1>Клиенты</h1>
  </div>
</template>

<script>
export default {
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
