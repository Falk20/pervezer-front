<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "finance",

  components: {
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Финансы",
          to: "/finance",
        },
      ],
    };
  },
};
</script>
