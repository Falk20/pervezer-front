<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "vendor-detail",

  components: {
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Общие настройки",
          to: `/vendor-detail/${this.$route.params.vendorID}`,
        },
        {
          label: "Прайслист",
          to: `/vendor-detail/${this.$route.params.vendorID}/pricelist`,
        },
        {
          label: "Склады",
          to: `/vendor-detail/${this.$route.params.vendorID}/warehouse`,
        },
        {
          label: "Настройки прайслиста",
          to: `/vendor-detail/${this.$route.params.vendorID}/pricelist-setting`,
        },
      ],
    };
  },
};
</script>
