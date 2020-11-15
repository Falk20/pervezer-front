<template>
  <v-card>
    <v-card-title>Новый работник</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewEmployees"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.fio"
              label="ФИО"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.rank"
              label="Должность"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.email"
              label="Email"
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.phone"
              label="Телефон"
              :rules="[rules.required, rules.phone]"
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
        Не удалось добавить работника
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_EMPLOYEE } from "@/api";

export default {
  name: "client-detail-employees-create-form",

  data() {
    return {
      isValid: true,

      inputs: {
        fio: "",
        rank: "",
        email: "",
        phone: "",
      },
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "email невалиден";
        },
        phone: (value) => {
          const pattern = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{5,10}$/;
          return pattern.test(value) || "Телефон невалиден";
        },
      },
    };
  },

  methods: {
    async saveNewEmployees() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_EMPLOYEE, {
            ...this.inputs,
            clientId: this.$route.params.clientID,
          });

          if (status === 200) {
            this.$emit("create-employee");

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
    },
  },
};
</script>