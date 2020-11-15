<template>
  <v-card>
    <v-card-title>Новый реквизит</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewRequisite"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.kaccount"
              label="Клиентский счет"
              :rules="[rules.required, rules.account]"
              counter="18"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.raccount"
              label="Расчетный счет"
              :rules="[rules.required, rules.account]"
              counter="18"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.bankName"
              label="Название банка"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.bankBIC"
              label="БИК банка"
              :rules="[rules.required, rules.bic]"
              counter="9"
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
import { CREATE_REQUISITE } from "@/api";

export default {
  name: "client-detail-requisite-create-form",

  data() {
    return {
      isValid: true,

      inputs: {
        kaccount: "",
        raccount: "",
        bankName: "",
        bankBIC: "",
      },
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
        account: (value) => {
          const pattern = /^[\d]{18}$/;
          return pattern.test(value) || "Номер счета невалиден";
        },
        bic: (value) => {
          const pattern = /^[\d]{9}$/;
          return pattern.test(value) || "БИК невалиден";
        },
      },
    };
  },

  methods: {
    async saveNewRequisite() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_REQUISITE, {
            ...this.inputs,
            clientId: this.$route.params.clientID,
          });

          if (status === 200) {
            this.$emit("create-requisite");

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
};
</script>