<template>
  <v-card>
    <v-card-title> Новый склад </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewWarehouse"
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
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.deliveryDuration"
              label="Срок доставки, дни"
              type="number"
              :rules="[rules.required]"
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
        Не удалось создать склад
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_WAREHOUSE } from "@/api";

export default {
  name: "vendor-detail-warehouse-create-form",

  data() {
    return {
      isValid: true,

      inputs: {
        name: "",
        deliveryDuration: "",
      },

      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
      },
    };
  },

  methods: {
    async saveNewWarehouse() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_WAREHOUSE, {
            vendorId: this.$route.params.vendorID,
            ...this.inputs,
          });

          if (status === 200) {
            this.$emit("create-warehouse");

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
      this.inputs = {
        name: "",
        deliveryDuration: "",
      };
      this.$refs.form.resetValidation();
    },
  },
};
</script>