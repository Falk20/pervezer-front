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
        :items="orders"
        :search="search"
        item-key="id"
        :loading="isLoad"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "orders-table",

  props: ["getMethod"],

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      orders: [],
      tableHeaders: [
        {
          text: "Код заказа",
          value: "id",
        },
        {
          text: "Клиент",
          value: "client",
        },
        {
          text: "Менеджер",
          value: "manager",
        },
        {
          text: "Поставщик",
          value: "vendor",
        },
        {
          text: "Код товара",
          value: "productId",
        },
        {
          text: "Описание товара",
          value: "prodDesc",
        },
        {
          text: "Доставка, дни",
          value: "deliveryDuration",
        },
        {
          text: "Кол-во товара",
          value: "count",
        },
        {
          text: "Стоимость клиента",
          value: "totalRealPrise",
        },
        {
          text: "Стоимость поставщика",
          value: "totalVendorPrise",
        },
        {
          text: "Статус",
          value: "status",
        },
      ],
    };
  },

  methods: {
    async getOrders() {
      try {
        let reqParams = {};

        if (this.$route.params.clientID) {
          reqParams.id = this.$route.params.clientID;
        }

        const { data: orders } = await Axios.get(this.getMethod, {
          params: reqParams,
        });
        this.orders = orders;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getOrders();
  },
};
</script>