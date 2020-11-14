<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isLoad">Load...</p>
    <v-card v-else class="mb-4">
      <v-card-title>{{ clientSettings.fio }}</v-card-title>
      <SettingForm
        :clientSettings="clientSettings"
        @update-name="clientSettings.fio = $event"
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
      {{ "Не удалось загрузить данные настроек клиента" }}
    </v-alert>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_CLIENT_DETAILS } from "@/api";
import SettingForm from "./SettingForm";

export default {
  name: "client-details-setting",

  components: {
    SettingForm,
  },

  data() {
    return {
      isLoad: true,
      isErr: false,
      isSuccess: false,
      clientSettings: {},
    };
  },

  computed: {
    clientID() {
      return this.$route.params.clientID;
    },
  },

  methods: {
    async getClientSettings() {
      try {
        const { data: clientSettings } = await Axios.get(GET_CLIENT_DETAILS, {
          params: {
            id: this.clientID,
          },
        });

        this.clientSettings = clientSettings;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getClientSettings();
  },
};
</script>