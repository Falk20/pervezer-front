<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
      <v-data-table
        v-model="selected"
        :headers="tableHeaders"
        :items="cars"
        :single-select="false"
        item-key="id"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ openedItem.VIN }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template>

        <!-- <template v-slot:item.email="{ item }">
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
        </template>
        <template v-slot:item.mobile="{ item }">
          <a :href="`tel:+${item.mobile}`">{{ item.mobile }}</a>
        </template>
        <template v-slot:item.birthDate="{ item }">
          {{ getCurrentDate(item.birthDate) }}
        </template> -->
        <template v-slot:item.carCard="{ item }">
          <v-btn icon @click="openCarInfo(item)">
            <v-icon>
              mdi-account-details
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_CLIENT_CARS } from "@/api";

export default {
  name: "CarsTable",

  data() {
    return {
      isLoad: true,
      isErr: false,
      cars: null,
      dialog: false,
      openedItem: {},
      openedIndex: -1,
      selected: [],
      tableHeaders: [
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
          value: "carCard",
          align: "center"
        },
        {
          text: "Удалить",
          value: "carEdit",
          align: "center"
        },
      ]
    };
  },

  methods: {
    openCarInfo(car) {
      this.openedIndex = this.cars.indexOf(car);
      this.openedItem = Object.assign({}, car);
      this.dialog = true;
    },
    closeCarInfo() {
      this.dialog = false;
      this.$nextTick(() => {
        this.openedItem = {};
        this.openedIndex = -1;
      });
    },
    getCurrentDate(date) {
      return new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
    },
    async getCars() {
      try {
          console.log(this.$route.params.clientID);
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
    }
  },

  created() {
    this.getCars();
  },

  watch: {
    dialog(val) {
      val || this.closeCarInfo();
    }
  }
};
</script>