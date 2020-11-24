<template>
  <v-card>
    <v-card-title> Новый бренд </v-card-title>

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
              v-model="brand"
              label="Бренд"
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
        Не удалось добавить бренд
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { ADD_BRAND } from "@/api";

export default {
  name: "add-brand-form",

  data() {
    return {
      isValid: true,
      brand: "",
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
      },
    };
  },

  methods: {
    async saveNewIp() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(ADD_BRAND, {
            vendorId: this.$route.params.vendorID,
            brand: this.brand,
          });

          if (status === 200) {
            this.$emit("create-brand");

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
      this.brand = "";
    },
  },
};
</script>