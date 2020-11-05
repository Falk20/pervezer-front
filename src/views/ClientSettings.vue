<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "ClientSettings",

  components: {
    TabsMenu
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Общие настройки",
          to: "settings"
        },
        {
          label: "Адреса доставки",
          to: "addresses"
        },
        {
          label: "Права доступа к API",
        },
        {
          label: "Подключение к офисам",
          to: "offices"
        },
        {
          label: "Настройка сообщений",
        },
        {
          label: "Информация о наличии",
        },
        {
          label: "Корзина",
          to: "cart"
        },
        {
          label: "Опции",
        },
        {
          label: "Гараж",
          to: "garage"
        },
        {
          label: "Компании",
          to: ""
        },
        {
          label: "Реквизиты",
          to: "rekvizites"
        },
        {
          label: "Заказы",
          to: "contracts"
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
