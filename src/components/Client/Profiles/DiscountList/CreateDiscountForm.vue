<template>
  <v-card>
    <v-card-title> Новая скидка </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewDiscount"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="inputs.discountStarts"
              label="Минимальная цена для скидки"
              type="number"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="inputs.discountPersent"
              label="Скидка, %"
              type="number"
              :rules="[rules.required, rules.discount]"
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
        Не удалось добавить скидку
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_DISCOUNT } from "@/api";

export default {
  name: "client-discount-create-form",

  components: {},

  props: ["profileId"],

  data() {
    return {
      isValid: true,

      inputs: {
        discountStarts: "",
        discountPersent: "",
      },
      default: {
        discountStarts: "",
        discountPersent: "",
      },
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
        discount: (v) => (v >= 0 && v <= 100) || "От 0 до 100",
      },
    };
  },

  methods: {
    async saveNewDiscount() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_DISCOUNT, {
            ...this.inputs,
            profileId: this.profileId,
          });

          if (status === 200) {
            this.$emit("create-discount");

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