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
        show-expand
        single-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td class="no-padding" :colspan="headers.length">
            <OrdersProductTable :products="item.products" />
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
import OrdersProductTable from "./OrdersProductTable";

export default {
  name: "orders-table",

  components: {
    OrdersProductTable,
  },

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
          width: "150px",
        },
        {
          text: "Клиент",
          value: "client",
          width: "100px",
        },
        {
          text: "Менеджер",
          value: "manager",
          width: "100px",
        },
        {
          text: "Поставщик",
          value: "vendor",
          width: "100px",
        },
        {
          text: "Код товара",
          value: "productId",
          width: "100px",
        },
        {
          text: "Описание товара",
          value: "prodDesc",
          width: "150px",
        },
        {
          text: "Доставка, дни",
          value: "deliveryDuration",
          width: "50px",
        },
        {
          text: "Кол-во товара",
          value: "count",
          width: "50px",
        },
        {
          text: "Стоимость клиента",
          value: "totalRealPrise",
          width: "50px",
        },
        {
          text: "Стоимость поставщика",
          value: "totalVendorPrise",
          width: "50px",
        },
        {
          text: "Статус",
          value: "status",
          width: "100px",
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

<style lang="scss">
.no-padding {
  padding: 0 !important;
}
</style>