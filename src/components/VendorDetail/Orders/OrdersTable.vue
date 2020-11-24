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
        :loading="isLoad"
      >
      <template v-slot:item.changeStatus="{ item }">
        <v-row v-if="item.status === 'Обрабатывается'">
          <v-btn color="primary" dark class="mb-1 mt-1" @click="acceptOrder(item.id)">
              <span>Принять</span>
            </v-btn>
          <v-btn color="red" dark class="mb-1 mt-1" @click="rejectOrder(item.id)">
            <span>Отменить</span>
          </v-btn>
        </v-row>
        
        <v-row v-if="item.status === 'Ожидает оплаты'">
          <v-btn color="primary" class="mb-1 mt-1" disabled>
          <span>Отправить</span>
        </v-btn>
        </v-row>
        <v-row v-if="item.status === 'Оплачен'">
          <v-btn color="primary"  dark class="mb-1 mt-1" @click="sendOrder(item.id)">
          <span>Отправить</span>
        </v-btn>
        </v-row>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
import { REJECT_ORDER, SEND_ORDER, ACCEPT_ORDER } from "@/api";
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
          value: "orderId",
          width: "150px",
        },
        {
          text: "Код товара",
          value: "prodId",
          width: "100px",
        },
        {
          text: "Описание товара",
          value: "prodDesc",
          width: "100px",
        },
        {
          text: "Количество",
          value: "count",
          width: "100px",
        },
        {
          text: "Срок доставки, дни",
          value: "deliveryDuration",
          width: "100px",
        },
        {
          text: "Стоисомть, руб",
          value: "totalVendorCost",
          width: "150px",
        },
        {
          text: "Статус",
          value: "status",
          width: "100px",
        },
        {
          text: "Изменить статус",
          value: "changeStatus",
          width: "100px",
        },
      ],
    };
  },

  methods: {
    async getOrders() {
      try {
        let reqParams = {};

        if (this.$route.params.vendorID) {
          reqParams.id = this.$route.params.vendorID;
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
    async acceptOrder(item) {
          const {status} = await Axios.post(ACCEPT_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.getOrders();
          }
    },
    async rejectOrder(item) {
          const {status} = await Axios.post(REJECT_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.getOrders();
          }
    },
    async sendOrder(item) {
          const {status} = await Axios.post(SEND_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.getOrders();
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