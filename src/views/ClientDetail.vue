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
    TabsMenu
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Общие настройки",
          to: `/client-detail/${this.$route.params.clientID}`
        },
        {
          label: "IP-адреса",
          to: `/client-detail/${this.$route.params.clientID}/ips`
        },
        {
          label: "Адреса",
          to: `/client-detail/${this.$route.params.clientID}/addresses`
        },
        {
          label: "Офисы",
          to: `/client-detail/${this.$route.params.clientID}/offices`
        },
        {
          label: "Гараж",
          to: `/client-detail/${this.$route.params.clientID}/cars`
        },
        {
          label: "Реквизиты",
          to: `/client-detail/${this.$route.params.clientID}/rekvizits`
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
