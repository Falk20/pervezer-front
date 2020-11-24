<template>
  <v-tabs v-model="tab" fixed-tabs background-color="#d60600" dark>
    <v-tabs-slider color="#404040"></v-tabs-slider>

    <v-tab v-for="(item, i) in tabs" :key="i" exact :to="item.to">
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "tabs-menu",

  model: {
    prop: "value",
    event: "change",
  },

  props: { value: {}, tabs: Array },

  computed: {
    tab: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("change", v);
      },
    },
  },
};
</script>