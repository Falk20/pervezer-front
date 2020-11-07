<template>
  <v-form
    ref="form"
    @submit.prevent="updateClientSetting"
    class="pa-1"
    v-model="isValid"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.fio"
            :rules="[rules.required]"
            label="ФИО"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.clientId"
            label="Код клиента"
            disabled
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.password"
            :rules="[rules.required, rules.minLength]"
            label="Пароль"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Наценка" disabled />
        </v-col>
        <v-col>
          <v-text-field label="Профиль" disabled />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DatePicker v-model="editedSetting.birthday" />
        </v-col>
        <v-col>
          <v-text-field
            v-model="editedSetting.mobile"
            :rules="[rules.required, rules.phone]"
            label="Телефон"
            append-icon="mdi-phone"
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
            :disabled="saveDisabled"
          >
            Сохранить
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            width="100%"
            type="button"
            @click="resetForm"
            :disabled="!haveChanges"
            >Отменить изменения</v-btn
          >
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
      Не удалось сохранить изменения
    </v-alert>
    <v-alert
      v-model="isSuccess"
      dense
      text
      type="success"
      dismissible
      transition="scale-transition"
    >
      Изменения успешно сохранены
    </v-alert>
  </v-form>
</template>

<script>
import Axios from "axios";
import { UPDATE_CLIENT_SETTING } from "@/api";

import DatePicker from "./DatePicker";

export default {
  name: "client-setting-form",

  components: {
    DatePicker
  },

  props: ["clientSettings"],

  data() {
    return {
      isValid: true,
      isSuccess: false,
      isErr: false,
      editedSetting: Object.assign({}, this.clientSettings),

      showPass: false,

      rules: {
        required: v => !!v || "Обязательное поле",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "email невалиден";
        },
        minLength: v => v.length >= 8 || "Не менее 8 символов",
        phone: value => {
          const pattern = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{5,10}$/;
          return pattern.test(value) || "Телефон невалиден";
        }
      }
    };
  },

  computed: {
    haveChanges() {
      const oldValue = JSON.stringify(this.clientSettings);
      const newValue = JSON.stringify(this.editedSetting);

      return newValue !== oldValue;
    },
    saveDisabled() {
      return !this.haveChanges;
    }
  },

  methods: {
    async updateClientSetting() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          const { status } = await Axios.post(
            UPDATE_CLIENT_SETTING,
            this.editedSetting
          );

          if (status === 200) {
            this.isSuccess = true;
            this.$emit("update-name", this.editedSetting.fio);
          }
        }
      } catch {
        this.isErr = true;
      }
    },
    resetForm() {
      this.editedSetting = Object.assign({}, this.clientSettings);
    }
  }
};
</script>