<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isLoad">Load...</p>
    <v-card v-else class="mb-4">
      <v-card-title>{{ vendorSettings.uRname }}</v-card-title>
      <SettingForm
        :vendorSettings="vendorSettings"
        @update-name="vendorSettings.uRname = $event"
      />
    </v-card>
    <v-alert
      v-model="isErr"
      dense
      outlined
      type="error"
      dismissible
      transition="scale-transition"
    >
      {{ "Не удалось загрузить данные настроек поставщика" }}
    </v-alert>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_VENDOR_DETAILS } from "@/api";
import SettingForm from "./SettingForm";

export default {
  name: "vendor-details-setting",

  components: {
    SettingForm,
  },

  data() {
    return {
      isLoad: true,
      isErr: false,
      isSuccess: false,
      vendorSettings: {},
    };
  },

  computed: {
    vendorID() {
      return this.$route.params.vendorID;
    },
  },

  methods: {
    async getVendorSettings() {
      try {
        const { data: vendorSettings } = await Axios.get(GET_VENDOR_DETAILS, {
          params: {
            id: this.vendorID,
          },
        });

        this.vendorSettings = vendorSettings;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getVendorSettings();
  },
};
</script>