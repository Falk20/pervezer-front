<template>
  <v-card>
    <v-card-title>Новый поставщик</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewVendor"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.uRname"
              :rules="[rules.required]"
              label="Юр. имя"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.city"
              :rules="[rules.required]"
              label="Город"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.phone"
              :rules="[rules.required, rules.phone]"
              label="Телефон"
              append-icon="mdi-phone"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.email"
              :rules="[rules.required, rules.email]"
              label="Email"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.uRaddress"
              :rules="[rules.required]"
              label="Юр. адрес"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.inn"
              :rules="[rules.required, rules.inn]"
              label="ИНН"
              required
              counter
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.kpp"
              :rules="[rules.required]"
              label="КПП"
              required
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
              Добавить
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
        Не удалось добавить поставщика
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_VENDOR } from "@/api";

export default {
  name: "vendor-create-form",

  data() {
    return {
      isValid: true,

      profiles: [],
      managers: [],
      offices: [],

      inputs: {
        uRname: "",
        city: "",
        email: "",
        phone: "",
        uRaddress: "",
        inn: "",
        kpp: "",
      },

      isNotProfiles: false,
      isNotManagers: false,
      isNotOffices: false,
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
        inn: (value) => {
          const pattern = /^[\d+]{10,12}$/;
          return pattern.test(value) || "от 10 до 12 цифр";
        },
      },
    };
  },

  methods: {
    async saveNewVendor() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_VENDOR, this.inputs);

          if (status === 200) {
            this.$emit("create-vendor");

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