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
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Клиенты",
          to: "/client",
        },
        {
          label: "Профили",
          to: "/client/profile",
        },
        {
          label: "Гости",
          to: "/client/guest",
        },
      ],
    };
  },
};
</script>
