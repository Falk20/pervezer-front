<template>
  <v-card>
    <v-card-title> Новый автомобиль </v-card-title>

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
          <v-col>
            <v-text-field
              v-model="inputs.vin"
              label="ВИН номер"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.frame"
              label="Фрейм кузова"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <YearPicker
              v-model="inputs.year"
              label="Год выпуска"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.model"
              label="Модель"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.mark"
              label="Марка"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.modify"
              label="Модификация"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.gosNumber"
              label="Гос номер"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inputs.probeg"
              label="Пробег"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputs.desc"
              label="Описание"
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
        Не удалось добавить адрес
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_CAR } from "@/api";

import YearPicker from "./YearPicker";

export default {
  name: "client-detail-car-create-form",

  components: {
    YearPicker,
  },

  data() {
    return {
      isValid: true,

      inputs: {
        name: "",
        vin: "",
        frame: "",
        year: "",
        model: "",
        mark: "",
        modify: "",
        gosNumber: "",
        probeg: "",
        desc: "",
      },
      sending: false,
      isErr: false,
      rules: {
        required: (v) => !!v || "Обязательное поле",
      },
    };
  },

  methods: {
    async saveNewCar() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(CREATE_CAR, {
            ...this.inputs,
            clientId: this.$route.params.clientID,
          });

          if (status === 200) {
            this.$emit("create-car");

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