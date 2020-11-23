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
      <!-- <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ openedItem.fio }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template> -->

      <template v-slot:item.organization> - </template>

      <template v-slot:item.email="{ item }">
        <a :href="`mailto:${item.email}`">{{ item.email }}</a>
      </template>
      <template v-slot:item.mobile="{ item }">
        <a :href="`tel:+${item.mobile}`">{{ item.mobile }}</a>
      </template>
      <template v-slot:item.birthDate="{ item }">
        {{ getCurrentDate(item.birthDate) }}
      </template>
      <!-- <template v-slot:item.vendorCard="{ item }">
          <v-btn icon @click="openVendorInfo(item)">
            <v-icon> mdi-account-details </v-icon>
          </v-btn>
        </template> -->
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
            Добавить клиента
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
      // openedItem: {},
      // openedIndex: -1,
      selected: [],
      tableHeaders: [
        {
          text: "Код клиента",
          value: "id",
          width: 200,
        },
        {
          text: "Профиль",
          value: "profile.name",
        },
        {
          text: "Организация",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Наценка, %",
          value: "profile.surCharge",
        },
        {
          text: "Сальдо, руб",
          value: "saldo.value",
        },
        {
          text: "ФИО",
          value: "fio",
        },
        {
          text: "Город",
          value: "city",
        },
        {
          text: "Контакты",
          value: "mobile",
        },
        {
          text: "Регистрация",
          value: "birthDate",
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
    // openVendorInfo(vendor) {
    //   this.openedIndex = this.vendors.indexOf(vendor);
    //   this.openedItem = Object.assign({}, vendor);
    //   this.dialog = true;
    // },
    // closeVendorInfo() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.openedItem = {};
    //     this.openedIndex = -1;
    //   });
    // },
    getCurrentDate(date) {
      return new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    },
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

  // watch: {
  //   dialog(val) {
  //     val || this.closeVendorInfo();
  //   },
  // },
};
</script>