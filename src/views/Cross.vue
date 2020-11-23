<template>
  <div class="fill-height">
    <TabsMenu v-model="tab" :tabs="tabs" />

    <router-view />
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";

export default {
  name: "cross-page",

  components: {
    TabsMenu,
  },

  data() {
    return {
      tab: null,
      tabs: [
        {
          label: "Кросс",
          to: "/cross",
        },
      ],
    };
  },
};
</script>
