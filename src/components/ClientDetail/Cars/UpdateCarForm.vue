<template>
  <v-card>
    <v-card-title>
      Обновление данных машины
    </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="updateCar"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.name"
              label="Название"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.vin"
              label="VIN"
              :rules="[rules.required, rules.vin]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.frame"
              label="Frame"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.year"
              label="Год выпуска"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.model"
              label="Марка"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.mark"
              label="Модель"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.modify"
              label="Модификация"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.gosNumber"
              label="Гос номер"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.probeg"
              label="Пробег"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedCar.desc"
              label="Описание"
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
              Обновить
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
        Не удалось обновить машину
      </v-alert>
    </v-form>
    <v-form
      ref="form"
      @submit.prevent="deleteCar"
      class="pa-1"
    >
      <v-col>
            <v-btn
              width="100%"
              type="submit"
              color="error"
              :loading="sending"
            >
              Удалить
            </v-btn>
          </v-col>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { UPDATE_CAR } from "@/api";
import { REMOVE_CAR } from "@/api";

export default {
  name: "client-detail-car-update-form",
    props:{
        selectedCar:{}
    },
  data() {
    return {
      isValid: true,
      sending: false,
      isErr: false,
      rules: {
        required: v => !!v || "Обязательное поле",
        vin: v => v.length >= 1 || "Не менее 17 символов",
      }
    };
  },

  methods: {
    async updateCar() {
      try {

        if (this.isValid) {
          this.sending = true;

          const { status } = await Axios.post(
            UPDATE_CAR,{
                carId: this.selectedCar.id,
                name: this.selectedCar.name,
                vin: this.selectedCar.vin,
                frame: this.selectedCar.frame,
                year: this.selectedCar.year,
                model: this.selectedCar.model,
                mark: this.selectedCar.mark,
                modify: this.selectedCar.modify,
                gosNumber: this.selectedCar.gosNumber,
                probeg: this.selectedCar.probeg,
                desc: this.selectedCar.desc,
                clientId: this.$route.params.clientID,
            }
          );

          if (status === 200) {
            this.$emit("update-car");

            this.close();
          }
        }
      } catch {
        this.isErr = true;
      } finally {
        this.sending = false;
      }
    },
    async deleteCar(){
    try {
          await Axios.post(REMOVE_CAR, {
            carId: this.selectedCar.id
          });
          this.$emit("update-car");
          this.close();
      } catch {
        this.isErr = true;
      } finally {
        this.sending = false;
      }
    },
    close() {
      this.$emit("close");
    }
  },
};
</script>