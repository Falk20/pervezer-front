<template>
  <v-form
    ref="form"
    @submit.prevent="updateVendorSetting"
    class="pa-1"
    v-model="isValid"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.vendorId"
            label="Системный код поставщика"
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
        <v-col>
          <v-text-field
            v-model="editedSetting.phone"
            :rules="[rules.required, rules.phone]"
            label="Телефон"
            append-icon="mdi-phone"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.uRname"
            :rules="[rules.required]"
            label="Юр. имя"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.city"
            :rules="[rules.required]"
            label="Город"
            required
          />
        </v-col>
        <v-col>
          <DatePicker
            v-model="editedSetting.registerDate"
            label="Регистрация"
            disabled
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.uRaddress"
            :rules="[rules.required]"
            label="Юр. адрес"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="editedSetting.inn"
            label="ИНН"
            :rules="[rules.required, rules.inn]"
            required
            counter
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="editedSetting.kpp"
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
import { UPDATE_VENDOR_SETTING } from "@/api";

import DatePicker from "./DatePicker";

export default {
  name: "vendor-setting-form",

  components: {
    DatePicker,
  },

  props: ["vendorSettings"],

  data() {
    return {
      isValid: true,
      isSuccess: false,
      isErr: false,
      editedSetting: Object.assign({}, this.vendorSettings),

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

  computed: {
    haveChanges() {
      const oldValue = JSON.stringify(this.vendorSettings);
      const newValue = JSON.stringify(this.editedSetting);

      return newValue !== oldValue;
    },
    saveDisabled() {
      return !this.haveChanges;
    },
  },

  methods: {
    async updateVendorSetting() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          const { status } = await Axios.post(
            UPDATE_VENDOR_SETTING,
            this.editedSetting
          );

          if (status === 200) {
            this.isSuccess = true;
            this.$emit("update-name", this.editedSetting.uRname);
          }
        }
      } catch {
        this.isErr = true;
      }
    },
    resetForm() {
      this.editedSetting = Object.assign({}, this.vendorSettings);
    },
  },
};
</script>