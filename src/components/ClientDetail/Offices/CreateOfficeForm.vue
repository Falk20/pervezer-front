<template>
  <v-card>
    <v-card-title>
      Новый офис
    </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewIp"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="office"
              label="Офис"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              width="100%"
              type="submit"
              color="primary"
              :loading="sending"
            >
              Создать
            </v-btn>
          </v-col>
          <v-col>
            <v-btn width="100%" type="button" @click="close">Отменить</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-alert
        v-model="isErr"
        dense
        outlined
        type="error"
        dismissible
        transition="scale-transition"
      >
        Не удалось добавить офис
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_OFFICE } from "@/api";

export default {
  name: "client-detail-office-create-form",

  data() {
    return {
      isValid: true,
      office: "",
      sending: false,
      isErr: false,
      rules: {
        required: v => !!v || "Обязательное поле"
      }
    };
  },

  methods: {
    async saveNewIp() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_OFFICE, {
            client: this.$route.params.clientID,
            name: this.office
          });

          if (status === 200) {
            this.$emit("create-office");

            this.close();
          }
        }
      } catch {
        this.isErr = true;
      } finally {
        this.sending = false;
      }
    },
    close() {
      this.$emit("close");
      this.office = "";
    }
  }
};
</script>