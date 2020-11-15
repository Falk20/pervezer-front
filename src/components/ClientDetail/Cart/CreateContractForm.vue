<template>
  <v-card>
    <v-card-title>Создать заказ</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="createContract"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="inputs.clientRekvizitId"
              :items="requisites"
              item-text="kaccount"
              item-value="id"
              :label="'Реквизит'"
              :rules="[rules.required]"
            ></v-select>
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
        Не удалось оформить заказ
      </v-alert>
      <v-alert
        v-model="isNotRequisites"
        dense
        outlined
        type="error"
        dismissible
        transition="scale-transition"
      >
        Не удалось загрузить список реквизитов
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { GET_CLIENT_REQUISITES, CREATE_CONTRACT } from "@/api";

export default {
  name: "client-detail-create-contract-form",

  data() {
    return {
      isValid: true,

      requisites: [],

      inputs: {
        clientRekvizitId: "",
      },
      sending: false,
      isErr: false,
      isNotRequisites: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
      },
    };
  },

  methods: {
    async getRequisites() {
      try {
        const { data: requisites } = await Axios.get(GET_CLIENT_REQUISITES, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.requisites = requisites;
      } catch {
        this.isNotRequisites = true;
      }
    },

    async createContract() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_CONTRACT, {
            ...this.inputs,
            clientId: this.$route.params.clientID,
          });

          if (status === 200) {
            this.$emit("create-contract");

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
      for (let key in this.inputs) {
        this.inputs[key] = "";
      }
      this.$refs.form.resetValidation();
    },
  },

  created() {
    this.getRequisites();
  },
};
</script>