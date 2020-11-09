<template>
  <v-card>
    <v-card-title>
      Новый адрес
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
              v-model="address"
              label="Адрес"
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
        Не удалось добавить адрес
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_ADDRESS } from "@/api";

export default {
  name: "client-detail-address-create-form",

  data() {
    return {
      isValid: true,
      address: "",
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

          const { status } = await Axios.post(CREATE_ADDRESS, {
            clientId: this.$route.params.clientID,
            address: this.address
          });

          if (status === 200) {
            this.$emit("create-address");

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
      this.address = "";
    }
  }
};
</script>