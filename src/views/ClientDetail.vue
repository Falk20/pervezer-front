<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "client-detail",

  components: {
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Общие настройки",
          to: `/client-detail/${this.$route.params.clientID}`,
        },
        {
          label: "IP-адреса",
          to: `/client-detail/${this.$route.params.clientID}/ips`,
        },
        {
          label: "Адреса",
          to: `/client-detail/${this.$route.params.clientID}/addresses`,
        },
        // {
        //   label: "Офисы",
        //   to: `/client-detail/${this.$route.params.clientID}/offices`,
        // },
        {
          label: "Ревизиты",
          to: `/client-detail/${this.$route.params.clientID}/requisites`,
        },
        {
          label: "Гараж",
          to: `/client-detail/${this.$route.params.clientID}/garage`,
        },
        {
          label: "Сотрудники",
          to: `/client-detail/${this.$route.params.clientID}/employees`,
        },
        {
          label: "Корзина",
          to: `/client-detail/${this.$route.params.clientID}/cart`,
        },
        {
          label: "Заказы",
          to: `/client-detail/${this.$route.params.clientID}/orders`,
        },
      ],
    };
  },
};
</script>
