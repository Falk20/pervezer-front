<template>
  <v-card>
    <v-card-title> Новый профиль </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewCar"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.name"
              label="Название"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="inputs.surcharge"
              label="Наценка, %"
              type="number"
              :rules="[rules.required, rules.surcharge]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-color-picker v-model="inputs.color" hide-canvas></v-color-picker>
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
            <v-btn width="100%" type="button" @click.prevent="close"
              >Отменить</v-btn
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
        Не удалось добавить профиль
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_PROFILE } from "@/api";

export default {
  name: "client-detail-car-create-form",

  components: {},

  props: ["editingCar", "editingCarIndex"],

  data() {
    return {
      isValid: true,

      inputs: {
        name: "",
        surcharge: "",
        color: "#FF0000",
      },
      default: {
        name: "",
        surcharge: "",
        color: "#FF0000",
      },
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
        surcharge: (v) => (v >= 0 && v <= 100) || "От 0 до 100",
      },
    };
  },

  methods: {
    async saveNewCar() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_PROFILE, this.inputs);

          if (status === 200) {
            this.$emit("create-profile");

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
      this.inputs = Object.assign({}, this.default);
      this.$refs.form.resetValidation();
    },
  },
};
</script>