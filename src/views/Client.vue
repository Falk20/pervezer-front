<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "client",

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
          to: "/client/sale"
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
};
</script>
