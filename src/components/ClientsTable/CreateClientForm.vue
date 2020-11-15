<template>
  <v-card>
    <v-card-title>Новый клиент</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewClient"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.name"
              :rules="[rules.required]"
              label="ФИО"
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
            <v-select
              v-model="inputs.currentProfileId"
              :items="profiles"
              item-text="name"
              item-value="profileId"
              label="Профиль"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="inputs.managerId"
              :items="managers"
              item-text="fio"
              item-value="id"
              label="Менеджер"
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
        Не удалось добавить клиента
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_CLIENT, GET_PROFILES_TO_UPDATE, GET_MANAGERS } from "@/api";

export default {
  name: "client-detail-requisite-create-form",

  data() {
    return {
      isValid: true,

      profiles: [],
      managers: [],

      inputs: {
        name: "",
        city: "",
        email: "",
        phone: "",
        currentProfileId: "",
        managerId: "",
      },

      isNotProfiles: false,
      isNotManagers: false,
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
    async getProfiles() {
      try {
        const { data: profiles } = await Axios.get(GET_PROFILES_TO_UPDATE);

        this.profiles = profiles;
      } catch {
        this.isNotProfiles = true;
      }
    },

    async getManagers() {
      try {
        const { data: managers } = await Axios.get(GET_MANAGERS);

        this.managers = managers;
      } catch {
        this.isNotManagers = true;
      }
    },

    async saveNewClient() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_CLIENT, this.inputs);

          if (status === 200) {
            this.$emit("create-client");

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
    this.getProfiles();
    this.getManagers();
  },
};
</script>