<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />
    <router-view 
    :clientId="clientId"/>
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "ClientDetails",
  components: {
    TabsMenu
  },
  // clientId: this.$route.params.userId,
  data() {
    return {
      tab: null,
      clientId: this.$route.params.clientId,
      tabs: [
        {
          label: "Общие настройки",
          to: "/clientdetails"
        },
        {
          label: "Адреса доставки",
          to: "/clientdetails/addresses"
        },
        {
          label: "Права доступа к API",
        },
        {
          label: "Подключение к офисам",
          to: "/clientdetails/offices"
        },
        {
          label: "Настройка сообщений",
        },
        {
          label: "Информация о наличии",
        },
        {
          label: "Корзина",
          to: "/clientdetails/cart"
        },
        {
          label: "Опции",
        },
        {
          label: "Гараж",
          to: "/clientdetails//garage"
        },
        {
          label: "Компании"
        },
        {
          label: "Реквизиты",
          to: "/clientdetails/rekvizites"
        },
        {
          label: "Заказы",
          to: "/clientdetails/contracts"
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
