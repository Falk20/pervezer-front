<template>
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
      v-model="selected"
      :headers="tableHeaders"
      :items="vendors"
      :search="search"
      :single-select="false"
      item-key="id"
      show-select
      class="elevation-1"
      :loading="isLoad"
    >
      <template v-slot:item.email="{ item }">
        <a :href="`mailto:${item.email}`">{{ item.email }}</a>
      </template>

      <template v-slot:item.mobile="{ item }">
        <a :href="`tel:+${item.mobile}`">{{ item.mobile }}</a>
      </template>

      <template v-slot:item.vendorEdit="{ item }">
        <v-btn icon :to="`/vendor-detail/${item.id}`">
          <v-icon> mdi-account-edit </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <div class="text-center pt-2">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Добавить поставщика
          </v-btn>
        </div>
      </template>
      <CreateVendorForm @create-vendor="updateTable" @close="dialog = false" />
    </v-dialog>
  </v-card>
</template>

<script>
import Axios from "axios";
import { GET_VENDORS } from "@/api";

import CreateVendorForm from "./CreateVendorForm";

export default {
  name: "vendor-table",

  components: { CreateVendorForm },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      vendors: [],
      dialog: false,
      selected: [],
      tableHeaders: [
        {
          text: "Код",
          value: "id",
          width: 200,
        },
        {
          text: "Юр. имя",
          value: "uRname",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Номер телефона",
          value: "phone",
        },
        {
          text: "Город",
          value: "city",
        },
        {
          text: "Юр. адрес",
          value: "uRaddress",
        },
        {
          text: "ИНН",
          value: "inn",
        },
        {
          text: "КПП",
          value: "kpp",
        },
        {
          text: "Кол-во товаров",
          value: "productCount",
        },
        {
          text: "Кол-во складов",
          value: "warehouseCount",
        },
        {
          text: "Ред.",
          value: "vendorEdit",
          align: "center",
          sortable: false,
          width: 40,
        },
      ],
    };
  },

  methods: {
    async getVendors() {
      try {
        const { data: vendors } = await Axios.get(GET_VENDORS);

        this.vendors = vendors;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
    updateTable() {
      this.getVendors();
    },
  },

  created() {
    this.getVendors();
  },
};
</script>