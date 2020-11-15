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
            <YearPicker
              v-model="inputs.year"
              label="Год выпуска"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-switch
              v-model="isVin"
              :label="isVin ? 'ВИН номер' : 'Фрейм кузова'"
              color="info"
              hide-details
            ></v-switch>
          </v-col>
          <v-col>
            <v-text-field
              v-if="isVin"
              v-model="inputs.vin"
              :label="'ВИН номер'"
              :rules="[rules.required, rules.vin]"
              counter="17"
            />
            <v-text-field
              v-else
              v-model="inputs.frame"
              :label="'Фрейм кузова'"
              :rules="[rules.required, rules.vin]"
              counter="17"
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
              :rules="[rules.required, rules.gosNumber]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="inputs.probeg"
              label="Пробег"
              :rules="[rules.required, rules.probeg]"
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
              {{ isNewCar ? "Добавить" : "Обновить" }}
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
        Не удалось
        {{ isNewCar ? "добавить" : "обновить" }} автомобиль
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_CAR, UPDATE_CAR } from "@/api";

import YearPicker from "./YearPicker";

export default {
  name: "client-detail-car-create-form",

  components: {
    YearPicker,
  },

  props: ["editingCar", "editingCarIndex"],

  data() {
    return {
      isValid: true,

      isVin: true,

      inputs: {
        name: "",
        year: "",
        vin: "",
        frame: "",
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
        gosNumber: (value) => {
          const pattern = /^[a-zA-Z]{1}[\d]{3}[a-zA-Z]{2}[\d]{3}$/;
          return pattern.test(value) || "Гос номер невалиден";
        },
        vin: (value) => {
          const pattern = /^[a-zA-Z0-9]{17}$/;
          return pattern.test(value) || "ВИН невалиден";
        },
        probeg: (value) => {
          const pattern = /^[0-9]+$/;
          return pattern.test(value) || "Пробег невалиден";
        },
      },
    };
  },

  computed: {
    isNewCar() {
      return this.editingCarIndex === -1;
    },
  },

  methods: {
    async saveNewCar() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.sending = true;

          let link = this.isNewCar ? CREATE_CAR : UPDATE_CAR;
          let postBody = {
            ...this.inputs,
            clientId: this.$route.params.clientID,
          };

          if (!this.isNewCar) {
            postBody.carId = this.inputs.id;
          }

          const { status } = await Axios.post(link, postBody);

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
      this.$refs.form.resetValidation();
    },
  },

  watch: {
    isVin(v) {
      if (v) {
        this.inputs.frame = "";
      } else {
        this.inputs.vin = "";
      }
    },
    editingCar: {
      handler: function setDefault(v) {
        this.inputs = Object.assign({}, v);
      },
      immediate: true,
    },
  },
};
</script>