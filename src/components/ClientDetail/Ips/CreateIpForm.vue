<template>
  <v-card>
    <v-card-title>
      Новый IP
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
              v-model="ip"
              label="IP"
              :rules="[rules.required, rules.ip]"
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
        Не удалось создать ip
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_IP } from "@/api";

export default {
  name: "client-detail-ip-create-form",

  data() {
    return {
      isValid: true,
      ip: "",
      sending: false,
      isErr: false,
      rules: {
        required: v => !!v || "Обязательное поле",
        ip: value => {
          const pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
          return pattern.test(value) || "ip невалиден";
        }
      }
    };
  },

  methods: {
    async saveNewIp() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_IP, {
            clientId: this.$route.params.clientID,
            ip: this.ip
          });

          if (status === 200) {
            this.$emit("create-ip");

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
      this.ip = "";
    }
  }
};
</script>