<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "order",

  components: {
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Заказы",
          to: "/order",
        },
      ],
    };
  },
};
</script>
