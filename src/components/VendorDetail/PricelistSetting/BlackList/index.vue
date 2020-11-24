<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <v-card v-else width="400">
      <h2 class="h2 text-center mt-4">Бренды-исключения</h2>
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
        :items="brands"
        item-key="id"
        :search="search"
        hide-default-footer
      >
        <template v-slot:no-data>Нет брендов в черном списке</template>
        <template v-slot:no-results>Нет таких брендов в черном списке</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeBrand(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить бренд
              </v-btn>
            </div>
          </template>
          <AddBrandForm @create-brand="addNewBrand" @close="dialog = false" />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_BRANDS, REMOVE_BRAND } from "@/api";
import Axios from "axios";

import AddBrandForm from "./AddBrandForm";

export default {
  name: "brands-blacklist",

  components: {
    AddBrandForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      brands: null,
      tableHeaders: [
        {
          text: "Бренд",
          value: "brand",
          width: "100%",
        },
        {
          text: "",
          value: "id",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    async getBrands() {
      try {
        const { data: brands } = await Axios.get(GET_BRANDS, {
          params: {
            id: this.$route.params.vendorID,
          },
        });

        this.brands = brands;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async removeBrand(item) {
      try {
        const { status } = await Axios.post(REMOVE_BRAND, {
          rejectBrandId: item.id,
        });

        if (status === 200) {
          const itemIndex = this.brands.indexOf(item);

          this.brands.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewBrand() {
      this.getBrands();
    },
  },

  created() {
    this.getBrands();
  },
};
</script>
