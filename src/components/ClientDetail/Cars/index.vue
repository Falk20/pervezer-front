<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
          clearable
        />
      </v-card-title>

      <v-data-table
        :headers="tableHeaders"
        :items="cars"
        item-key="id"
        :search="search"
        :loading="isLoad"
        show-expand
        single-expand
      >
        <template v-slot:no-data>Нет автомобилей</template>
        <template v-slot:no-results>Нет таких автомобилей</template>

        <template v-slot:item.year="{ item }">
          {{ formatDate(item.year) }}
        </template>

        <template v-slot:item.update="{ item }">
          <v-btn color="primary" dark @click="editCar(item)">
            <v-icon dark> mdi-pencil </v-icon>
          </v-btn>
        </template>

        <template v-slot:item.remove="{ item }">
          <v-btn color="red" dark @click="removeCar(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">Описание: {{ item.desc }}</td>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить автомобиль
              </v-btn>
            </div>
          </template>
          <CreateCarForm
            :editingCar="editingCar"
            :editingCarIndex="selectedCarIndex"
            @create-car="addNewCar"
            @close="close"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_CARS, REMOVE_CAR } from "@/api";
import Axios from "axios";

import CreateCarForm from "./CreateCarForm";

export default {
  name: "client-details-cars",

  components: {
    CreateCarForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      cars: [],
      editingCar: {
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
      selectedCarIndex: -1,
      tableHeaders: [
        {
          text: "Название",
          value: "name",
        },
        {
          text: "ВИН номер",
          value: "vin",
        },
        {
          text: "Фрейм кузов",
          value: "frame",
        },
        {
          text: "Год производства",
          value: "year",
        },
        {
          text: "Модель",
          value: "model",
        },
        {
          text: "Марка",
          value: "mark",
        },
        {
          text: "Модификация",
          value: "modify",
        },
        {
          text: "Гос номер",
          value: "gosNumber",
        },
        {
          text: "Пробег",
          value: "probeg",
        },

        {
          text: "",
          value: "update",
          sortable: false,
        },
        {
          text: "",
          value: "remove",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    editCar(item) {
      this.editingCar = Object.assign({}, item);
      this.selectedCarIndex = this.cars.indexOf(item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editingCar = {
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
        };
        this.selectedCarIndex = -1;
      });
    },

    formatDate(date) {
      if (!date) return null;

      return new Date(date).toLocaleDateString("ru", {
        year: "numeric",
      });
    },

    async getCars() {
      try {
        const { data: cars } = await Axios.get(GET_CLIENT_CARS, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.cars = cars;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async removeCar(item) {
      try {
        const { status } = await Axios.post(REMOVE_CAR, {
          carId: item.id,
        });

        if (status === 200) {
          const itemIndex = this.cars.indexOf(item);

          this.cars.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewCar() {
      this.getCars();
    },
  },

  created() {
    this.getCars();
  },
};
</script>
