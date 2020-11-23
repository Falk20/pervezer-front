<template>
  <v-card>
    <v-card-title>Новый клиент</v-card-title>

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
            <v-select
              v-model="inputs.officeId"
              :items="offices"
              item-text="office"
              item-value="id"
              label="Офис"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-switch
              v-model="inputs.urfacetype"
              true-value="Юридическое лицо"
              false-value="Физическое лицо"
              :label="inputs.urfacetype"
              color="info"
            ></v-switch>
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
import {
  CREATE_VENDOR,
  GET_PROFILES_TO_UPDATE,
  GET_MANAGERS,
  GET_OFFICES,
} from "@/api";

export default {
  name: "vendor-detail-requisite-create-form",

  data() {
    return {
      isValid: true,

      profiles: [],
      managers: [],
      offices: [],

      inputs: {
        name: "",
        city: "",
        email: "",
        phone: "",
        currentProfileId: "",
        managerId: "",
        officeId: "",
        urfacetype: "Физическое лицо",
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

    async getOffices() {
      try {
        const { data: offices } = await Axios.get(GET_OFFICES);

        this.offices = offices;
      } catch {
        this.isNotOffices = true;
      }
    },

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

  created() {
    this.getProfiles();
    this.getManagers();
    this.getOffices();
  },
};
</script>