<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else width="100%">
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
        :items="pricelist"
        :search="search"
        item-key="id"
        :loading="isLoad"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { GET_PRICELIST } from "@/api";
import Axios from "axios";

export default {
  name: "pricelist-table",

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      pricelist: [],
      tableHeaders: [
        {
          text: "Код товара",
          value: "id",
        },
        {
          text: "Модель",
          value: "model",
        },
        {
          text: "Бренд",
          value: "brand",
        },
        {
          text: "Цена, руб",
          value: "vendorPrice",
        },
        {
          text: "Кол-во",
          value: "count",
        },
      ],
    };
  },

  methods: {
    async getPricelist() {
      try {
        const { data: pricelist } = await Axios.get(GET_PRICELIST, {
          params: {
            id: this.$route.params.vendorID,
          },
        });
        this.pricelist = pricelist;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getPricelist();
  },
};
</script>