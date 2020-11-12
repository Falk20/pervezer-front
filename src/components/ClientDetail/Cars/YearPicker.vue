<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDate"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :disabled="disabled"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1970-01-01"
      first-day-of-week="1"
      locale="ru"
      reactive
      no-title
      @update:picker-date="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "form-date-picker",

  props: ["value", "label", "disabled", "rules"],

  data: () => ({
    menu: false,
  }),

  computed: {
    date: {
      get() {
        return this.value.substr(0, 10);
      },
      set(v) {
        this.$emit("input", `${v.split("-")[0]}-01-01`);
      },
    },
    formattedDate() {
      return this.formatDate(this.date);
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    formatDate(date) {
      if (!date) return null;

      return new Date(date).toLocaleDateString("ru", {
        year: "numeric",
      });
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<style>
</style>