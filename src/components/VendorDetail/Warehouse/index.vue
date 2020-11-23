<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else width="100%">
      <v-data-table
        :headers="tableHeaders"
        :items="warehouses"
        item-key="id"
        :loading="isLoad"
      >
        <template v-slot:no-data>Нет складов</template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить склад
              </v-btn>
            </div>
          </template>
          <CreateWarehouseForm
            @create-warehouse="addNewWareHouse"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_WAREHOUSES } from "@/api";
import Axios from "axios";

import CreateWarehouseForm from "./CreateWarehouseForm";

export default {
  name: "vendor-details-warehouses",

  components: {
    CreateWarehouseForm,
  },

  data() {
    return {
      isLoad: true,
      isErr: false,
      dialog: false,
      warehouses: [],
      tableHeaders: [
        {
          text: "Код склада",
          value: "id",
        },
        {
          text: "Название",
          value: "name",
        },
        {
          text: "Срок доставки, дни",
          value: "deliveryDuration",
        },
        {
          text: "Кол-во товаров",
          value: "productsCount",
        },
      ],
    };
  },

  methods: {
    async getWareHouses() {
      try {
        const { data: warehouses } = await Axios.get(GET_WAREHOUSES, {
          params: {
            id: this.$route.params.vendorID,
          },
        });

        this.warehouses = warehouses;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    addNewWareHouse() {
      this.getWareHouses();
    },
  },

  created() {
    this.getWareHouses();
  },
};
</script>