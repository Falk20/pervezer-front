<template>
  <v-row>
    <v-col>
      <v-select
        v-model="selected"
        :items="profiles"
        item-text="name"
        item-value="id"
        :label="label"
      ></v-select>
    </v-col>
    <v-col>
      <v-text-field
        :value="selectedProfile ? selectedProfile.surchrage : '0'"
        type="number"
        label="Наценка, %"
        disabled
      />
    </v-col>
  </v-row>
</template>

<script>
import Axios from "axios";
import { GET_PROFILES_TO_UPDATE } from "@/api";

export default {
  name: "profile-select",

  props: ["value", "label"],

  data() {
    return {
      profiles: [],
    };
  },

  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
    selectedProfile() {
      const vm = this;
      return this.profiles.find((profile) => (profile.id = vm.value));
    },
  },

  methods: {
    async getProfiles() {
      const { data: profiles } = await Axios.get(GET_PROFILES_TO_UPDATE);

      this.profiles = profiles;
    },
  },

  created() {
    this.getProfiles();
  },
};
</script>