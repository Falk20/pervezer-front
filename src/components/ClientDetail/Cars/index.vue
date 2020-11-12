<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" @click="openCarCreate()">
                Добавить машину
                <template>
                  <v-dialog v-model="dialog2" max-width="500px">
                    <CreateCarForm
                    @create-car="updateCars"
                    @close="dialog2 = false"
                    />
                  </v-dialog>
                </template>
              </v-btn>
            </div>
      <v-data-table
        v-model="selected"
        :headers="tableHeaders"
        :items="cars"
        :single-select="false"
        item-key="id"
        show-select
        class="elevation-1"
      >
      <template v-slot:item.carUpdateCard="{ item }">
          <v-btn icon @click="openCarInfo(item)">
            <v-icon>
              mdi-car
            </v-icon>
          </v-btn>
        </template>

        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <UpdateCarForm
            @update-car="updateCars"
            @close="dialog = false"
            :selectedCar="openedItem"
            />
          </v-dialog>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_CLIENT_CARS } from "@/api";
import CreateCarForm from "./CreateCarForm";
import UpdateCarForm from "./UpdateCarForm";

export default {
  name: "CarsTable",

  data() {
    return {
      isLoad: true,
      isErr: false,
      cars: null,
      dialog: false,
      dialog2: false,
      openedItem: {},
      openedIndex: -1,
      selected: [],
      tableHeaders: [
        {
          text: "Код",
          value: "id"
        },
        {
          text: "Название",
          value: "name"
        },
        {
          text: "VIN",
          value: "vin"
        },
        {
          text: "Frame",
          value: "frame"
        },
        {
          text: "Год производства",
          value: "year"
        },
        {
          text: "Марка",
          value: "mark"
        },
        {
          text: "Модель",
          value: "model"
        },
        {
          text: "Модификация",
          value: "modify"
        },
        {
          text: "Гос номер",
          value: "gosNumber"
        },
        {
          text: "Пробег",
          value: "probeg"
        },
        {
          text: "Описание",
          value: "desc"
        },
        {
          text: "Изменить",
          value: "carUpdateCard",
          align: "center"
        }
      ]
    };
  },
  components:{
    UpdateCarForm,
    CreateCarForm
  },
  methods: {
    openCarInfo(car) {
      this.openedIndex = this.cars.indexOf(car);
      this.openedItem = car;
      this.dialog = true;
    },
    closeCarInfo() {
      this.dialog = false;
      this.$nextTick(() => {
        this.openedItem = {};
        this.openedIndex = -1;
      });
    },
    openCarCreate() {
      this.dialog2 = true;
    },
    closeCarCreate() {
      this.dialog2 = false;
    },
    async getCars() {
      try {
        const { data: cars } = await Axios.get(GET_CLIENT_CARS, {
          params: {
            id: this.$route.params.clientID
          }
        });
        this.cars = cars;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
    updateCars() {
      this.getCars();
    },
  },
    created() {
      this.getCars();
  },

  watch: {
    dialog(val) {
      val || this.closeCarInfo();
    },
    dialog2(val) {
      val || this.closeCarCreate();
    },
    
  }
};
</script>