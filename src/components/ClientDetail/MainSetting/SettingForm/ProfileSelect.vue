<template>
  <v-select
    v-model="selected"
    :items="profiles"
    item-text="name"
    item-value="id"
    :label="label"
  ></v-select>
</template>

<script>
import Axios from "axios";
import { GET_PROFILES } from "@/api";

export default {
  name: "profile-select",

  props: ["value", "label"],

  data() {
    return {
      profiles: []
    };
  },

  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },

  methods: {
    async getProfiles() {
      const { data: profiles } = await Axios.get(GET_PROFILES);

      this.profiles = profiles;
    }
  },

  created() {
    this.getProfiles();
  }
};
</script>